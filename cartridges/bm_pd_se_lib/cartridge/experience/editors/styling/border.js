/**
 * Init for the border widget custom editor
 *
 * Initialises the custom attribute editor with server side information such as URLs
 * or in this case the  client ID the Business Manager uses, so the client can request all recommenders
 *
 * @param {dw.experience.CustomEditor} editor The custom editor object
 */

var URLUtils = require('dw/web/URLUtils');

module.exports.init = function (editor) {
    editor.configuration.assets = URLUtils.staticURL('assets/icons').toString();
};
