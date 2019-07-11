'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for answer component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.answer_text) {
        model.answer_text = content.answer_text;
        model.answer_value = content.answer_value;
    }

    return new Template('experience/components/guidedsell_assets/gsAnswer').render(model).text;
};
