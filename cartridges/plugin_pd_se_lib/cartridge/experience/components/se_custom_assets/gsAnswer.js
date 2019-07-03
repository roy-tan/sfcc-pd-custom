'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component.gsQuestion.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'gsAnswer-' + context.component.getID();

    model.text_gsAnswerText = content.text_gsAnswerText;
    model.text_gsAnswerValue = content.text_gsAnswerValue;
    

    return new Template('experience/components/se_custom_assets/gsAnswer').render(model).text;
};
