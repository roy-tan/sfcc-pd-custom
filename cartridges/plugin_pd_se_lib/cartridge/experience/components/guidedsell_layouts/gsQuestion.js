'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.1columnFullWidth.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;


    if (content.question_text) {
        model.question_text = content.question_text;
        model.question_number = content.question_number;
        model.preference_name = content.preference_name;
    }


    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/guidedsell_layouts/gsQuestion').render(model).text;
};
