'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function(context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    if (content.heading) {
        model.heading = content.heading.content;
        model.componentClasses = PageRenderHelper.getComponentClasses(model.heading);
        model.componentStyles = PageRenderHelper.getComponentStyles(model.heading);
    }
    model.headingTop = content.headingTop ? content.headingTop : '30%';
    model.headingLeft = content.headingLeft ? content.headingLeft : '10%';
    model.ITCText = content.ITCText ? content.ITCText : null;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.link = content.ITCLink ? content.ITCLink : '#';
    model.alt = content.alt ? content.alt : null;

    return new Template('experience/components/se_custom_assets/imageAndText').render(model).text;
};