'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.1columnFullWidth.
 */
module.exports.render = function(context) {
    var model = new HashMap();
    var component = context.component;
    model.componentClasses = PageRenderHelper.getComponentClasses(context.content);
    model.componentStyles = PageRenderHelper.getComponentStyles(context.content);
    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/se_custom_layouts/1columnFullWidth').render(model).text;
};