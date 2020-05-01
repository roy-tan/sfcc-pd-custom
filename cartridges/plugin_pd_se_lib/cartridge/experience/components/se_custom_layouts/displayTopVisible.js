'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the Display Top Visible layout component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);    
    var numVisibleComponents = model.regions.topVisible.region.visibleComponents.length;
    if (numVisibleComponents > 1)
    {
        for (var i = 1; i <= numVisibleComponents; i++) {
            model.regions.topVisible.setComponentAttribute('style', 'display:none', { position: i });
        }
    }
    return new Template('experience/components/se_custom_layouts/displayTopVisible').render(model).text;
};
