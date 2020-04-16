'use strict';

/**
 * Set search configuration values
 *
 * @param {dw.catalog.ProductSearchModel} apiProductSearch - API search instance
 * @param {Object} params - Provided HTTP query parameters
 * @return {dw.catalog.ProductSearchModel} - API search instance
 */
function setupSearch(apiProductSearch, params) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var searchModelHelper = require('*/cartridge/scripts/search/search');

    var sortingRule = params.srule ? CatalogMgr.getSortingRule(params.srule) : null;
    var selectedCategory = CatalogMgr.getCategory(params.cgid);
    selectedCategory = selectedCategory && selectedCategory.online ? selectedCategory : null;

    searchModelHelper.setProductProperties(apiProductSearch, params, selectedCategory, sortingRule);

    if (params.preferences) {
        searchModelHelper.addRefinementValues(apiProductSearch, params.preferences);
    }

    return apiProductSearch;
}

/**
 * Retrieve a category's template filepath if available
 *
 * @param {dw.catalog.ProductSearchModel} apiProductSearch - API search instance
 * @return {string} - Category's template filepath
 */
function getCategoryTemplate(apiProductSearch) {
    return apiProductSearch.category ? apiProductSearch.category.template : '';
}

/**
 * Set content search configuration values
 *
 * @param {Object} params - Provided HTTP query parameters
 * @return {Object} - content search instance
 */
function setupContentSearch(params) {
    var ContentSearchModel = require('dw/content/ContentSearchModel');
    var ContentSearch = require('*/cartridge/models/search/contentSearch');
    var apiContentSearchModel = new ContentSearchModel();

    apiContentSearchModel.setRecursiveFolderSearch(true);
    apiContentSearchModel.setSearchPhrase(params.q);    
    apiContentSearchModel.setFilteredByFolder(false);
    apiContentSearchModel.search();
    var contentSearchResult = apiContentSearchModel.getContent();
    var count = Number(apiContentSearchModel.getCount());
    var contentSearch = new ContentSearch(contentSearchResult, count, params.q, params.startingPage, null);

    return contentSearch;
}

/**
 * Set the cache values
 *
 * @param {Object} res - The response object
 */
function applyCache(res) {
    res.cachePeriod = 1; // eslint-disable-line no-param-reassign
    res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
    res.personalized = true; // eslint-disable-line no-param-reassign
}

/**
 * performs a search
 *
 * @param {Object} req - Provided HTTP query parameters
 * @param {Object} res - Provided HTTP query parameters
 * @return {Object} - an object with relevant search information
 */
function search(req, res) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var URLUtils = require('dw/web/URLUtils');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');

    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
    var ProductSearch = require('*/cartridge/models/search/productSearch');
    var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
    var schemaHelper = require('*/cartridge/scripts/helpers/structuredDataHelper');

    var apiProductSearch = new ProductSearchModel();
    var categoryTemplate = '';
    var maxSlots = 4;
    var productSearch;
    var reportingURLs;

    var searchRedirect = req.querystring.q ? apiProductSearch.getSearchRedirect(req.querystring.q) : null;

    if (searchRedirect) {
        return { searchRedirect: searchRedirect.getLocation() };
    }

    apiProductSearch = setupSearch(apiProductSearch, req.querystring);
    apiProductSearch.search();

    if (!apiProductSearch.personalizedSort) {
        applyCache(res);
    }
    categoryTemplate = getCategoryTemplate(apiProductSearch);
    productSearch = new ProductSearch(
        apiProductSearch,
        req.querystring,
        req.querystring.srule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );

    pageMetaHelper.setPageMetaTags(req.pageMetaData, productSearch);

    var canonicalUrl = URLUtils.url('Search-Show', 'cgid', req.querystring.cgid);
    var refineurl = URLUtils.url('Search-Refinebar');
    var whitelistedParams = ['q', 'cgid', 'pmin', 'pmax', 'srule', 'pmid'];
    var isRefinedSearch = false;

    Object.keys(req.querystring).forEach(function (element) {
        if (whitelistedParams.indexOf(element) > -1) {
            refineurl.append(element, req.querystring[element]);
        }

        if (['pmin', 'pmax'].indexOf(element) > -1) {
            isRefinedSearch = true;
        }

        if (element === 'preferences') {
            var i = 1;
            isRefinedSearch = true;
            Object.keys(req.querystring[element]).forEach(function (preference) {
                refineurl.append('prefn' + i, preference);
                refineurl.append('prefv' + i, req.querystring[element][preference]);
                i++;
            });
        }
    });

    if (productSearch.searchKeywords !== null && !isRefinedSearch) {
        reportingURLs = reportingUrlsHelper.getProductSearchReportingURLs(productSearch);
    }

    var result = {
        productSearch: productSearch,
        maxSlots: maxSlots,
        reportingURLs: reportingURLs,
        refineurl: refineurl,
        canonicalUrl: canonicalUrl
    };

    if (productSearch.isCategorySearch && !productSearch.isRefinedCategorySearch && categoryTemplate && apiProductSearch.category.parent.ID === 'root') {
        pageMetaHelper.setPageMetaData(req.pageMetaData, productSearch.category);
        result.category = apiProductSearch.category;
        result.categoryTemplate = categoryTemplate;
    }

    if (!categoryTemplate || categoryTemplate === 'rendering/category/categoryproducthits') {
        result.schemaData = schemaHelper.getListingPageSchema(productSearch.productIds);
    }

    return result;
}

 /**
 * check to see if we are coming back from a pdp, if yes, use the old qs to set up the grid refinements and number of tiles
 *
 * @param {Object} clickStream - object with an array of request to the server in the current session
 * @return {string} - url to redirect to
 */
function backButtonDetection(clickStream) {
    var preferences = require('*/cartridge/config/preferences');
    if (!preferences.plpBackButtonOn) {
        return null;
    }

    var URLUtils = require('dw/web/URLUtils');
    var currentClick;
    var limit = preferences.plpBackButtonLimit || 10;
    var clicks = clickStream.clicks.reverse().slice(0, limit);
    var productClick = null;
    var searchClick = null;
    var counter = 0;
    var done = false;

    // find the last pdp click and the last search click
    var backClicks = clicks.filter(function (click) {
        if (counter === 0) {
            currentClick = click;
            counter++;
            return true;
        }

        if (click.pipelineName.indexOf('Product-Show') > -1 && productClick == null && !done) {
            productClick = click;
            counter++;
            return true;
        }

        if ((click.pipelineName.indexOf('Search-Show') > -1 && searchClick == null)
            || (click.pipelineName.indexOf('Search-UpdateGrid') > -1 && searchClick == null)
            || (click.pipelineName.indexOf('Search-ShowAjax') > -1 && searchClick == null)
        ) {
            searchClick = click;
            counter++;
            done = true;
            return true;
        }
        counter++;
        return false;
    });

    if (backClicks.length === 3) {
        var strCurrent = currentClick.queryString;
        var strCurrentArray = strCurrent.split('&');
        var paramCurrentArray = [];
        var valueCurrentArray = [];
        var cgidCurrentValue;
        var qCurrentValue;

        strCurrentArray.forEach(function (strElement) {
            var strElementSplit = strElement.split('=');
            if (strElementSplit[0] === 'cgid') { cgidCurrentValue = strElementSplit[1]; }
            if (strElementSplit[0] === 'q') { qCurrentValue = strElementSplit[1]; }
            paramCurrentArray.push(strElementSplit[0]);
            valueCurrentArray.push(strElementSplit[1]);
        });

        var str = searchClick.queryString;
        var strArray = str.split('&');
        var paramArray = [];
        var valueArray = [];
        var cgidValue;
        var qValue;
        var szPos;
        var startPos;

        strArray.forEach(function (strElement2, i) {
            var strElementSplit2 = strElement2.split('=');
            if (strElementSplit2[0] === 'cgid') { cgidValue = strElementSplit2[1]; }
            if (strElementSplit2[0] === 'q') { qValue = strElementSplit2[1]; }
            if (strElementSplit2[0] === 'sz') { szPos = i; }
            if (strElementSplit2[0] === 'start') { startPos = i; }
            paramArray.push(strElementSplit2[0]);
            valueArray.push(strElementSplit2[1]);
        });

        // alter the sz and start parameters
        if (!!szPos && !!startPos) {
            valueArray[szPos] = parseInt(valueArray[startPos], 10) + parseInt(valueArray[szPos], 10);
            valueArray[startPos] = 0;
        }

        // check that cgid or q parameter are matching and build url with old parameters
        if ((cgidCurrentValue && cgidCurrentValue === cgidValue) || (qCurrentValue && qCurrentValue === qValue)) {
            var redirectGridUrl = URLUtils.url('Search-Show');
            paramArray.forEach(function (param, i) {
                redirectGridUrl.append(paramArray[i], valueArray[i]);
            });
            return redirectGridUrl.toString();
        }
    }
    return null;
}

exports.backButtonDetection = backButtonDetection;
exports.setupSearch = setupSearch;
exports.getCategoryTemplate = getCategoryTemplate;
exports.setupContentSearch = setupContentSearch;
exports.search = search;
exports.applyCache = applyCache;
