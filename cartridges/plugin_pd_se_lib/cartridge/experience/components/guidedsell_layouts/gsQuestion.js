'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the layouts.1columnFullWidth.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;


    if (content.question_text) {
        model.question_text = content.question_text;
        
        model.preference_name = content.preference_name;
        /*model.question_banner = {
            src: {
                mobile  : ImageTransformation.url(content.question_banner.file, mobileImageTransformation),
                desktop : ImageTransformation.url(content.question_banner.file, desktopImageTransformation)
            },
            alt         : content.question_banner.file.getAlt()
        }*/
    }


    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/guidedsell_layouts/gsQuestion').render(model).text;
};
