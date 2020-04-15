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
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    model.overlayAlign = content.overlayAlign;
    model.textColor = content.textColor;
    model.heading = content.heading;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.link_1 = content.link_1 ? content.link_1 : '#';
    model.linkText_1 = content.linkText_1 ? content.linkText_1 : null;
    model.link_2 = content.link_2 ? content.link_2 : '#';
    model.linkText_2 = content.linkText_2 ? content.linkText_2 : null;
    model.link_3 = content.link_3 ? content.link_3 : '#';
    model.linkText_3 = content.linkText_3 ? content.linkText_3 : null;

    return new Template('experience/components/se_custom_assets/mainBannerLinks').render(model).text;
};
