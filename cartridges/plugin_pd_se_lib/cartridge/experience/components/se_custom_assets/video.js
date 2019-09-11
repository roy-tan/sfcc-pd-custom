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

    model.id = 'video-' + context.component.getID();
    model.videoUrl = content.video_url;
    model.targetUrl = content.shop_now_target;
    model.buttonName = content.button_name;
    model.autoplay = "";
    if (content.video_autoplay == true)
    	model.autoplay = "autoplay";

    if (content.image) {
        model.image = ImageTransformation.getScaledImage(content.image);
    }

    return new Template('experience/components/se_custom_assets/video').render(model).text;
};
