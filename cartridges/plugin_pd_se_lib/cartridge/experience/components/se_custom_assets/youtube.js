'use strict';

// Initialize constants
const Template = require('dw/util/Template');
const URLUtils = require('dw/web/URLUtils');
const HashMap = require('dw/util/HashMap');

// Initialize local libraries
const ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * @function renderYouTubeVideo
 * @description Helper function used to render a youTube video leveraging the configured component context
 *
 * @param {Object} videoContext Represents the configured context used to render the video component
 * @return {String} Returns a string representing the rendered mark-up for the video component
 */
function renderYouTubeVideo(videoContext) {

    // Initialize local variables
    let model,
        content;

    // Initialize the model
    model = new HashMap();

    // Capture the configured video-content
    content = videoContext.content;

    // Attach the videoId and specified title
    model.video_id = content.video_id;
   
    // Return the string representing the rendered mark-up for the configured video
    return new Template('experience/components/se_custom_assets/youtube').render(model).text;

}

// Export the video render function
module.exports.render = renderYouTubeVideo;
