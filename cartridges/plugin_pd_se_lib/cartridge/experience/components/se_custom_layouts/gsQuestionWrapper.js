'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.gsQuestionWrapper.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'gsQuestionWrapper-' + context.component.getID();

    model.text_gsQuestionWrapper = content.text_gsQuestion;

    return new Template('experience/components/se_custom_assets/gsQuestionWrapper').render(model).text;
};

