'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for answer component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.submit_text) {
        model.submit_text = content.submit_text;
    }

    return new Template('experience/components/guidedsell_assets/gsSubmit').render(model).text;
};
