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
    model.url = content.video_url;
    
    model.autoplay = "";
    if (content.video_autoplay == true)
    	model.autoplay = "autoplay";
    

    return new Template('experience/components/assets/video').render(model).text;
};
