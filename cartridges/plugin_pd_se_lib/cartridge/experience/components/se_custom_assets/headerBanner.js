'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

/**
 * Render logic for dynamicBanner component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function(context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;
    model.image = content.image ? ImageTransformation.getScaledImage(content.image) : null;
    model.heading = content.heading ? content.heading : null;
    return new Template('experience/components/se_custom_assets/headerBanner').render(model).text;
};