/*
*  Copyright 2016 Adobe Systems Incorporated. All rights reserved.
*  This file is licensed to you under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License. You may obtain a copy
*  of the License at http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software distributed under
*  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
*  OF ANY KIND, either express or implied. See the License for the specific language
*  governing permissions and limitations under the License.
*
*/

var channel = require('cordova/channel'),
    exec = require('cordova/exec'),
    utils = require('cordova/utils'),
    cordova = require('cordova'),
    CQMUserError = require('./userError');

channel.createSticky('onCordovaUserInfoReady');
channel.waitForInitialization('onCordovaUserInfoReady');

/**
 * This represents the current user, and provides properties for inspecting if they are authenticated and what the authToken is
 * @constructor
 */
function CQMUser() {

    //define channels for dynamic properties. Specific events will be dispatched for property update
    this.channels = {
        isauthenticatedchanged: cordova.addDocumentEventHandler("isauthenticatedchanged"),
        authtokenchanged: cordova.addDocumentEventHandler("authtokenchanged")
    };

    //define dynamic properties
    Object.defineProperty(this, '$properties', {
        'configurable': true,
        'value': {}
    });
    utils.defineGetterSetter(this, 'isAuthenticated', function() {
            return this.$properties['isAuthenticated'];
        },
        function(isAuthenticated) {
            this.$properties['isAuthenticated'] = isAuthenticated;
            this.channels.isauthenticatedchanged.fire();
        });
    utils.defineGetterSetter(this, 'authToken', function() {
            return this.$properties['authToken'];
        },
        function(authToken) {
            this.$properties['authToken'] = authToken;
            this.channels.authtokenchanged.fire();
        });
    this.isAuthenticated = false;
    this.authToken = null;

    //initialize with data from native
    this.getUserInfo(this._initialize.bind(this), this._error);

}

CQMUser.prototype._initialize = function(info) {
    this.isAuthenticated = info.isAuthenticated;
    this.authToken = info.authToken;

    cordova.exec(this._updateProperties.bind(this), this._error, "CQMUser", "watchUserInfo", []);
    channel.onCordovaUserInfoReady.fire();
};

/**
 * Get user info
 *
 * @param {Function} successCallback The function to call when the user data is available
 * @param {Function} errorCallback The function to call when there is an error getting the user data (OPTIONAL)
 */
CQMUser.prototype.getUserInfo = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "CQMUser", "getUserInfo", []);
};

CQMUser.prototype._updateProperties = function(properties) {
    for (prop in properties) {
        this[prop] = properties[prop];
    }
};

CQMUser.prototype._error = function(e) {
    console.log("Error updating CQMUser properties: " + e);
};

/**
 * Launch Sign In UX
 *
 * @param {Function} errorCallback The function to call when there was an error opening the auth dialog (OPTIONAL)
 */
CQMUser.prototype.launchSignInUX = function(errorCallback) {
    if (this.isAuthenticated == true) {
        errorCallback && errorCallback(new CQMUserError(CQMUserError.INVALID_AUTHENTICATION_STATE));
        return;
    }
    var fail = errorCallback && function(code) {
        var ce = new CQMUserError(code);
        errorCallback(ce);
    };
    exec(null, fail, "CQMUser", "launchSignInUX", []);
};

/**
 * Sign out from authentication service
 *
 * @param {Function} errorCallback The function to call when there was an error signing out (OPTIONAL)
 */
CQMUser.prototype.signOut = function(errorCallback) {
    if (this.isAuthenticated == false) {
        errorCallback && errorCallback(new CQMUserError(CQMUserError.INVALID_AUTHENTICATION_STATE));
        return;
    }
    var fail = errorCallback && function(code) {
        var ce = new CQMUserError(code);
        errorCallback(ce);
    };
    exec(null, fail, "CQMUser", "signOut", []);
};

/**
 * Refresh Sign In
 *
 * @param {Function} successCallback The function to call when refresh is complete
 * @param {Function} errorCallback The function to call when there was an error refreshing signin info (OPTIONAL)
 */
CQMUser.prototype.refreshSignIn = function(successCallback, errorCallback) {
    if (this.isAuthenticated == false) {
        errorCallback && errorCallback(new CQMUserError(CQMUserError.INVALID_AUTHENTICATION_STATE));
        return;
    }
    var fail = errorCallback && function(code) {
        var ce = new CQMUserError(code);
        errorCallback(ce);
    };
    exec(successCallback, fail, "CQMUser", "refreshSignIn", []);
};

/**
 * Set Authentication Token
 *
 * @param {Function} the authentication token
 * @param {Function} successCallback The function to call when refresh is complete
 * @param {Function} errorCallback The function to call when there was an error refreshing signin info (OPTIONAL)
 */
CQMUser.prototype.setAuthToken = function(authToken, successCallback, errorCallback) {
    if (typeof authToken === "undefined") {
        errorCallback && errorCallback(new CQMUserError(CQMUserError.INVALID_ARGUMENT_ERROR));
        return;
    }
    var fail = errorCallback && function(code) {
        var ce = new CQMUserError(code);
        errorCallback(ce);
    };
    exec(successCallback, fail, "CQMUser", "setAuthToken", [authToken]);
};

module.exports = new CQMUser();