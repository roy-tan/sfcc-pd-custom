'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the component.endscene.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'endscene-' + context.component.getID();

    // The rich text editor will output p tags and lists (ol>li or ul>li) that contain only inline elements
    // We want to wrap all those inline elements in a span to style only the text background blue
    // Matching group 1 will be the opening tag
    // Matching group 2 will be the tag name
    // Matching group 3 will be (inline) content
    // Matching group 4 will be the closing tag (which we know to be correct, because the RTE does not nest p and li tags)
    var expression = /(<(p|li).*?>)(.+?)(<\/\2>)/g;
    var replacement = '<strong>$3</strong>';

    model.button_name = content.button_name;
    model.text_headline = content.text_headline.replace(expression, replacement);
    
    if (content.image) {
        var mobileImageTransformation = ImageTransformation.scale(content.image.metaData, 'mobile');
        var desktopImageTransformation = ImageTransformation.scale(content.image.metaData, 'desktop');

        model.image = {
            src: {
                mobile  : ImageTransformation.url(content.image.file, mobileImageTransformation),
                desktop : ImageTransformation.url(content.image.file, desktopImageTransformation)
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.image.focalPoint.x * 100 + '%',
            focalPointY : content.image.focalPoint.y * 100 + '%'
        };
    }

    // Fallback to button name if no name is explicitly given
    if (!content.button_name) {
        content.button_name = 'Shop Now';
    }

    // Fallback to home page if no shopping link is explicitly given
    if (!content.shop_now_target) {
        content.shop_now_target = URLUtils.url('Home-Show');
    }

    model.button_name = content.button_name;
    model.url = content.shop_now_target;

    return new Template('experience/components/story/endscene').render(model).text;
};
