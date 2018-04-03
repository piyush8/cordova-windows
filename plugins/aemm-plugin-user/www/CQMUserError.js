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

/**
 *  CQMUserError.
 *  An error code assigned by an implementation when an error has occurred
 * @constructor
 */
var CQMUserError = function(err) {
    this.code = (err !== undefined ? err : null);
};
// This needs to be synchronized with native implementations if there are changes
CQMUserError.UNKNOWN_ERROR = 0;
CQMUserError.INVALID_ARGUMENT_ERROR = 10;
CQMUserError.AUTHENTICATION_SUPPORT_ERROR = 11;
CQMUserError.INVALID_AUTHENTICATION_STATE = 12;
CQMUserError.NETWORK_ERROR = 41;
CQMUserError.NETWORK_RATE_LIMIT_EXCEEDED_ERROR = 42;
CQMUserError.UNAUTHORIZED = 43;

module.exports = CQMUserError;

