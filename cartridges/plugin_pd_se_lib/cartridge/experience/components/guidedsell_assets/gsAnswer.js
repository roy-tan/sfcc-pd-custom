'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for answer component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.answer_text) {
        model.answer_text = content.answer_text;
        model.answer_value = content.answer_value;
        
        var mobileImageTransformation = ImageTransformation.scale(content.answer_icon.metaData, 'mobile');
        var desktopImageTransformation = ImageTransformation.scale(content.answer_icon.metaData, 'desktop');
        model.answer_icon = {
            src: {
                mobile  : ImageTransformation.url(content.answer_icon.file, mobileImageTransformation),
                desktop : ImageTransformation.url(content.answer_icon.file, desktopImageTransformation)
            },
            alt         : content.answer_icon.file.getAlt()
        };
    }

    return new Template('experience/components/guidedsell_assets/gsAnswer').render(model).text;
};
