'use strict';

// Initialize constants
const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * @function renderHtmlCode
 * @description Helper function used to render a html leveraging the configured component context
 *
 * @param {Object} htmlCode Represents the configured context used to render the html component
 * @return {String} Returns a string representing the rendered mark-up for the html component
 */
function renderProducts(context) {

    var model = new HashMap();
    var component = context.component;
    model.component = component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var content = context.content;
    model.categoryId = content.category.getID();
    
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');    
    var apiProductSearch = new ProductSearchModel();    
    var params = { cgid: model.categoryId};
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, params);
    var sortingRule = apiProductSearch.category.defaultSortingRule.ID;       
    apiProductSearch.search();

    productSearch = new ProductSearch(
        apiProductSearch,
        params,
        sortingRule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );    
    model.productSearch = productSearch;       
   
    // Return the string representing the rendered mark-up for the configured html
    model.gridCol = content.displayFormat ? content.displayFormat.value : "3";
    return new Template('experience/components/se_custom_assets/classifiedProducts').render(model).text;

}

// Export the html render function
module.exports.render = renderProducts;
