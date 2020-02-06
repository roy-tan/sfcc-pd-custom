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

    model.id = 'titlescene-' + context.component.getID();

    if (content.question_text) {
        model.question_text = content.question_text;
        
        model.preference_name = content.preference_name;
        model.height ='height: auto;';
        model.inputType = "radio";
        if (content.question_multi) {
            model.inputType = "checkbox";
        }

        if (content.question_banner) {
            var mobileImageTransformation = ImageTransformation.scale(content.question_banner.metaData, 'mobile');
            var desktopImageTransformation = ImageTransformation.scale(content.question_banner.metaData, 'desktop');
            model.height ='height: 100vh;';
            model.question_banner = {
                src: {
                    mobile  : ImageTransformation.url(content.question_banner.file, mobileImageTransformation),
                    desktop : ImageTransformation.url(content.question_banner.file, desktopImageTransformation)
                },
                alt         : content.question_banner.file.getAlt(),
                focalPointX : content.question_banner.focalPoint.x * 100 + '%',
                focalPointY : content.question_banner.focalPoint.y * 100 + '%'
            };
        }
    }


    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/guidedsell_layouts/gsQuestion').render(model).text;
};
