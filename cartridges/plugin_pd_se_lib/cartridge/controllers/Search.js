'use strict';

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.get('UpdateGrid', function (req, res, next) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');

    var apiProductSearch = new ProductSearchModel();
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, req.querystring, req.httpParameterMap);
    apiProductSearch.search();

    if (!apiProductSearch.personalizedSort) {
        searchHelper.applyCache(res);
    }
    var productSearch = new ProductSearch(
        apiProductSearch,
        req.querystring,
        req.querystring.srule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );

    res.render('/search/productGrid', {
        productSearch: productSearch
    });

    next();
});

server.get('Refinebar', cache.applyDefaultCache, function (req, res, next) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var ProductSearch = require('*/cartridge/models/search/productSearch');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var apiProductSearch = new ProductSearchModel();
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, req.querystring, req.httpParameterMap);
    apiProductSearch.search();
    var productSearch = new ProductSearch(
        apiProductSearch,
        req.querystring,
        req.querystring.srule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );
    res.render('/search/searchRefineBar', {
        productSearch: productSearch,
        querystring: req.querystring
    });

    next();
}, pageMetaData.computedPageMetaData);

server.get('ShowAjax', cache.applyShortPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var result = searchHelper.search(req, res);

    if (result.searchRedirect) {
        res.redirect(result.searchRedirect);
        return next();
    }

    res.render('search/searchResultsNoDecorator', {
        productSearch: result.productSearch,
        maxSlots: result.maxSlots,
        reportingURLs: result.reportingURLs,
        refineurl: result.refineurl
    });

    return next();
}, pageMetaData.computedPageMetaData);

server.get('Show', cache.applyShortPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var template = 'search/searchResults';

    var result = searchHelper.search(req, res);

    if (result.searchRedirect) {
        res.redirect(result.searchRedirect);
        return next();
    }

    const pageDesigner = require('*/cartridge/scripts/utils/pageDesigner');
    const PageMgr = require('dw/experience/PageMgr');
    if (req.querystring.cgid)
    {
        const categoryId = req.querystring.cgid.toLowerCase();
        const page = PageMgr.getPage('clp-' + categoryId);
        let productSearch = result.productSearch;
        const isPDPage = page && page.isVisible() && productSearch.category;

        if (isPDPage && productSearch.isCategorySearch) {
            // hook to get calculated meta tags
            res.setViewData({
                clp: true,
                pageDesignerProductSearch: productSearch
            });
            this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
                const viewData = res.getViewData();

                pageDesigner.renderPage(page, res, {
                    category: productSearch.category,                
                    pageMetaData: viewData.CurrentPageMetaData
                });
            });
            return next();
        }
    }
    
    if (result.category && result.categoryTemplate) {
        template = result.categoryTemplate;
    }

    var redirectGridUrl = searchHelper.backButtonDetection(req.session.clickStream);
    if (redirectGridUrl) {
        res.redirect(redirectGridUrl);
    }

    res.render(template, {
        productSearch: result.productSearch,
        maxSlots: result.maxSlots,
        reportingURLs: result.reportingURLs,
        refineurl: result.refineurl,
        category: result.category ? result.category : null,
        canonicalUrl: result.canonicalUrl,
        schemaData: result.schemaData,
        apiProductSearch: result.apiProductSearch
    });

    return next();
}, pageMetaData.computedPageMetaData);

server.get('Content', cache.applyDefaultCache, consentTracking.consent, function (req, res, next) {
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var contentSearch = searchHelper.setupContentSearch(req.querystring);
    res.render('/search/contentGrid', {
        contentSearch: contentSearch
    });
    next();
});

module.exports = server.exports();