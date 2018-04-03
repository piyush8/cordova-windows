cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "aemm-plugin-user.cq.mobile.userError",
        "file": "plugins/aemm-plugin-user/www/CQMUserError.js",
        "pluginId": "aemm-plugin-user",
        "clobbers": [
            "cq.mobile.userError"
        ]
    },
    {
        "id": "aemm-plugin-user.cq.mobile.user",
        "file": "plugins/aemm-plugin-user/www/CQMUser.js",
        "pluginId": "aemm-plugin-user",
        "clobbers": [
            "cq.mobile.user"
        ]
    },
    {
        "id": "aemm-plugin-user.CQMUserProxy",
        "file": "plugins/aemm-plugin-user/src/windows/CQMUserProxy.js",
        "pluginId": "aemm-plugin-user",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "aemm-plugin-user": "1.3.0"
};
// BOTTOM OF METADATA
});