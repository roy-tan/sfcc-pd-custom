'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storylayout.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var page = context.page;
    model.page = page;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);

    // determine seo meta data
    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);

    // determine decorator
    model.decorator = PageRenderHelper.determineDecorator(context);

    if (PageRenderHelper.isInEditMode()) {
        dw.system.HookMgr.callHook('app.experience.editmode', 'editmode');
    }

    // render the page
    var expiryTime = new Date(Date.now());
    expiryTime.setMinutes(expiryTime.getMinutes() + 60);
    response.setExpires(expiryTime);
    return new Template('experience/pages/fullwidthlayout').render(model).text;
};