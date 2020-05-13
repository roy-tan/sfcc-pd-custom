'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the guidedsell_layouts.gsForm.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    if (content.category) {
        model.category = content.category;
    }
    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/guidedsell_layouts/gsForm').render(model).text;
};
