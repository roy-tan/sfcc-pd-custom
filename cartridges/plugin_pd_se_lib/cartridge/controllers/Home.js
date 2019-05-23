'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var PageMgr = require('dw/experience/PageMgr');

server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var page = PageMgr.getPage('homepage');
    var params = {};

    if (page != null && page.isVisible()) {
        if (!page.hasVisibilityRules()) {
            var ONE_WEEK = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
            response.setExpires(ONE_WEEK);
        }

        if (req.querystring.view && req.querystring.view === 'ajax') {
            params.decorator = 'common/layout/ajax';
        }
        response.writer.print(PageMgr.renderPage(page.ID, JSON.stringify(params)));
    } else {
        res.render('/home/homePage');
        next();
    }

}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

module.exports = server.exports();