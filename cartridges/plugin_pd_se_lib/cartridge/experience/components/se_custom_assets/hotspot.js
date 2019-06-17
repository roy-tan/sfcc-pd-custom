'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for hotspot
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.image) {
        var mobileImageTransformation = ImageTransformation.scale(content.image.metaData, 'mobile');
        var desktopImageTransformation = ImageTransformation.scale(content.image.metaData, 'desktop');

        model.image = {
            src: {
                mobile  : ImageTransformation.url(content.image.file, mobileImageTransformation),
                desktop : ImageTransformation.url(content.image.file, desktopImageTransformation)
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.image.focalPoint.x * 100 + '%',
            focalPointY : content.image.focalPoint.y * 100 + '%'
        };
    }

    var product = content.product;
    if (product) {
        model.productName = product.name;
        model.productUrl = URLUtils.url('Product-Show', 'pid', product.ID);
        var images = product.getImages('small'); // make the product image type configurable by the component?
        var productImage = images.iterator().next();
        if (productImage) {
            model.productImage = {
                src : productImage.getAbsURL(),
                alt : productImage.getAlt()
            };
        }
        var priceModel = product.getPriceModel();
        model.productPrice = priceModel.price;
    }

    if (content.htmlCode) {
        model.htmlCode = content.htmlCode;
    }

    return new Template('experience/components/se_custom_assets/hotspot').render(model).text;
};