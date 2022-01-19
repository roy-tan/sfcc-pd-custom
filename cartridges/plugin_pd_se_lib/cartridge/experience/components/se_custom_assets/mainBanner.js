'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function(context) {
    var model = new HashMap();
    var content = context.content;
    model.overlayAlign = content.overlayAlign;
    model.textColor = content.textColor;
    model.heading = content.heading;
    model.terms = content.terms ? content.terms : null;
    model.image = content.image ? ImageTransformation.getScaledImage(content.image) : null;
    model.bannerLink = content.bannerLink ? content.bannerLink : '#';
    model.bannerLinkText = content.bannerLinkText ? content.bannerLinkText : null;
    model.bannerLinkColor = content.bannerLinkColor;
    return new Template('experience/components/se_custom_assets/mainBanner').render(model).text;
};