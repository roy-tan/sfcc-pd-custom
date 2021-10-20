'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for a page header, which span a single line
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function(context) {
    var model = new HashMap();
    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.color = context.content.color;
    model.headerPosition = context.content.headerPosition;
    model.underHeaderHeight = '43px';

    if (['static', 'relative', 'sticky'].indexOf(context.content.headerPosition) !== -1) {
        // remove reserved space for certain header position values
        model.underHeaderHeight = 0;
    }
    return new Template('experience/components/decorator/brandHeader').render(model).text;
};