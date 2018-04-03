# aemm-plugin-user

This plugin defines a global `user` object, which describes the authentication state of the user.
Although the object is in the global scope, it is not available until after the `deviceready` event.

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	console.log(cq.mobile.user.isAuthenticated);
}

## Installation

cordova plugin add aemm-plugin-user

## Methods

## launchSignInUX

Call this method to open the authentication dialog for this account

### Example
cq.mobile.user.launchSignInUX()

### Supported Platforms

- Android
- iOS
- Windows

## Methods
- user.launchSignInUX()
- user.signOut()
- user.refreshSignIn()

## Properties

- user.isAuthenticated
- user.authToken

## Document Events
- isauthenticatedchanged
- authtokenchanged

## user.launchSignInUX()

Parameters: errorCallback

Call this to display the authentication dialog. Will return CQMUserError.INVALID_AUTHENTICATION_STATE if user.isAuthenticated is true

## user.signOut()

Parameters: errorCallback

Call this to sign out of authentication. Will return CQMUserError.INVALID_AUTHENTICATION_STATE if user.isAuthenticated is false

## user.refreshSignIn()
Parameters: successCallback, errorCallback

Call this to ensure the device has the latest known signIn state from the entitlement server.
Clients are limited to calling this 10x per minute before an error is returned.

## user.isAuthenticated

Return the authentication status of user

var bool = user.isAuthenticated

### Supported Platforms

- Android
- iOS
- Windows

## user.authToken

Return the authentication token for the user

var string = user.authToken

### Supported Platforms

- Android
- iOS
- Windows

## isauthenticatedchanged

Event will be fired when the user has changed authentication state. 
Clients should query the user object for the latest state.

### Example

document.addEventListener("isauthenticatedchanged", updateIsAuthenticated, false);

### Supported Platforms

- Android
- iOS
- Windows

## authtokenchanged

Event will be fired when the user authentication token has changed. 
Clients should query the user object for the latest state.

### Example
document.addEventListener("authtokenchanged", updateAuthToken, false);

### Supported Platforms

- Android
- iOS
- Windows

