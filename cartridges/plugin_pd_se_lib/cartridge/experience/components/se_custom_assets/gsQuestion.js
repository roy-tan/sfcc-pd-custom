'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component.gsQuestion.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'gsQuestion-' + context.component.getID();

    model.text_gsQuestion = content.text_gsQuestion;

    return new Template('experience/components/se_custom_assets/gsQuestion').render(model).text;
};
