'use strict';

var URLUtils = require('dw/web/URLUtils');

var styles = [];
var scripts = [];

/**
 * If the resource to add is not already in the resource array then add it to the array
 * @param {Array} resourceArray - Either the scripts or styles array to which you want to add the resource src to.
 * @param {string} src - URI of the resource to add
 * @param {string} integrity - cryptographic hash of a resource
 */
function addResource(resourceArray, src, integrity) {
    var result = {};
    var exists = resourceArray.some(function (element) {
        return element.src === src;
    });

    if (!exists) {
        result.src = src;
        if (integrity) {
            result.integrity = integrity;
        }

        resourceArray.push(result);
    }
}

module.exports = {
    addCss: function (src, integrity) {
        if (/((http(s)?:)?\/\/).*.css/.test(src)) {
            addResource(styles, src, integrity);
        } else {
            addResource(styles, URLUtils.staticURL(src).toString(), integrity);
        }
    },
    addJs: function (src, integrity) {
        if (/((http(s)?:)?\/\/).*.js/.test(src)) {
            addResource(scripts, src, integrity);
        } else {
            addResource(scripts, URLUtils.staticURL(src).toString(), integrity);
        }
    },
    scripts: scripts,
    styles: styles
};
