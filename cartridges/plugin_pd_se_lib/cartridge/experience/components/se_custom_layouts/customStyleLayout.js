'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront.1 Row x 1 Col (Mobile) 1 Row x 1 Col (Desktop) layout
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function(context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
    model.customCss = context.content.customCss ? context.content.customCss : "";
    model.componentClasses = PageRenderHelper.getComponentClasses(context.content);
    model.componentStyles = PageRenderHelper.getComponentStyles(context.content);
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/se_custom_layouts/customStyleLayout').render(model).text;
};