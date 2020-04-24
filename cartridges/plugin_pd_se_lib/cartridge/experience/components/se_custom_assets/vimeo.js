'use strict';

// Initialize constants
const Template = require('dw/util/Template');
const URLUtils = require('dw/web/URLUtils');
const HashMap = require('dw/util/HashMap');

// Initialize local libraries
const ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * @function renderVimeoVideo
 * @description Helper function used to render a Vimeo video leveraging the configured component context
 *
 * @param {Object} videoContext Represents the configured context used to render the video component
 * @return {String} Returns a string representing the rendered mark-up for the video component
 */
function renderVimeoVideo(videoContext) {

    // Initialize local variables
    let model,
        content;

    // Initialize the model
    model = new HashMap();

    // Capture the configured video-content
    content = videoContext.content;

    // Attach the videoId and specified title
    model.video_id = content.vimeo_id;
    model.autoplay = "0";
    model.controls = "0";
    model.link_1 = content.link_1 ? content.link_1 : '#';
    model.linkText_1 = content.linkText_1 ? content.linkText_1 : null;
    model.link_2 = content.link_2 ? content.link_2 : '#';
    model.linkText_2 = content.linkText_2 ? content.linkText_2 : null;
    model.link_3 = content.link_3 ? content.link_3 : '#';
    model.linkText_3 = content.linkText_3 ? content.linkText_3 : null;
    model.textColor = content.textColor;
    model.overlayAlign = content.overlayAlign ? content.overlayAlign : null;
    model.buttonTiming = content.buttonTiming;
    model.muted = "0";
    if (content.video_autoplay == true)
        model.autoplay = "1";
    if (content.video_controls == true)
        model.controls = "1";
    if (content.video_muted == true)
        model.muted = "1";

    // Return the string representing the rendered mark-up for the configured video
    return new Template('experience/components/se_custom_assets/vimeo').render(model).text;

}

// Export the video render function
module.exports.render = renderVimeoVideo;
