'use strict';

var RegionModelRegistry = require('~/cartridge/experience/utilities/RegionModelRegistry.js');

function parseRenderParameters(renderParametersJson) {
    var renderParameters = {};
    if (renderParametersJson) {
        try {
            renderParameters = JSON.parse(renderParametersJson);
        } catch (e) {
            require('dw/system/Logger').error('Unable to parse renderParameters: ' + renderParametersJson);
        }
    }
    return renderParameters;
}


module.exports = {
    /**
     * Assembles the page meta data.
     *
     * @param context {Object} The context of the page
     *
     * @returns {string} ISML path to decorator template
     */
    determineDecorator: function determineDecorator(context) {
        var renderParameters = parseRenderParameters(context.renderParameters);
        var decorator;
        var cartridgeDecorator;


        try {
            cartridgeDecorator = require('*/cartridge/experience/defaultdecorator');
        } catch (e) {
            dw.system.Logger.warn('Unable to determine frontend decorator ' + e);
        }
        // determine decorator
        if (renderParameters.decorator) {
            // overridden on runtime
            decorator = renderParameters.decorator;
        } else if (cartridgeDecorator) {
            // provided by frontend
            decorator = cartridgeDecorator;
        } else {
            // provided by pagedesigner
            decorator = 'decoration/decorator';
        }
        return decorator;
    },

    /**
     * Assembles the page meta data.
     *
     * @param page {dw.experience.Page} The page object
     *
     * @returns {dw.web.PageMetaData} The page meta data
     */
    getPageMetaData: function getPageMetaData(page) {
        var pageMetaData = request.pageMetaData;

        pageMetaData.title = page.pageTitle;
        pageMetaData.description = page.pageDescription;
        pageMetaData.keywords = page.pageKeywords;

        return pageMetaData;
    },

    /**
     * Returns the RegionModel registry for a given container (Page or Component).
     *
     * @param {dw.experience.Page|dw.experience.Component} container a component or page object
     * @param {String} containerType components or pages
     *
     * @returns {experience.utilities.RegionModelRegistry} The container regions
     */
    getRegionModelRegistry: function getRegionModelRegistry(container) {
        var containerType;
        if (container && container instanceof dw.experience.Page) {
            containerType = 'pages';
        } else if (container && container instanceof dw.experience.Component) {
            containerType = 'components';
        } else {
            return null;
        }
        var metaDefinition = require('~/cartridge/experience/' + containerType + '/' + container.typeID.replace(/\./g, '/') + '.json');

        return new RegionModelRegistry(container, metaDefinition);
    },

    /**
     * Returns true if page is rendered via editor UI and false in the storefront
     * @returns {boolean} The container regions
     */
    isInEditMode: function isInEditMode() {
        return request.httpPath.indexOf('__SYSTEM__Page-Show') > 0;
    }

};
