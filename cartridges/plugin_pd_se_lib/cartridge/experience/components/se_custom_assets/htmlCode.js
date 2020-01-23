'use strict';

// Initialize constants
const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');

/**
 * @function renderHtmlCode
 * @description Helper function used to render a html leveraging the configured component context
 *
 * @param {Object} htmlCode Represents the configured context used to render the html component
 * @return {String} Returns a string representing the rendered mark-up for the html component
 */
function renderHtmlCode(htmlCode) {

    // Initialize local variables
    let model,
        content;

    // Initialize the model
    model = new HashMap();

    // Capture the configured html-content
    content = htmlCode.content;

    // Attach the htmlId and specified title
    model.html_code = content.html_code;
   
    // Return the string representing the rendered mark-up for the configured html
    return new Template('experience/components/se_custom_assets/htmlCode').render(model).text;

}

// Export the html render function
module.exports.render = renderHtmlCode;
