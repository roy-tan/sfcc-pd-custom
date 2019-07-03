'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component.endscene.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'gsSubmit-' + context.component.getID();
    model.button_name = content.button_name;

    // Fallback to button name if no name is explicitly given
    if (!content.button_name) {
        content.button_name = 'Shop Now';
    }
    model.button_name = content.button_name;
    return new Template('experience/components/se_custom_assets/gsSubmit').render(model).text;
};
