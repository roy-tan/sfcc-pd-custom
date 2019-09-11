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
        model.image = ImageTransformation.getScaledImage(content.image);
    }

    var product = content.product;
    if (product) {
        model.productName = product.name;
        model.productUrl = URLUtils.url('Product-Show', 'pid', product.ID);
        model.productId = product.ID;
        model.viewType = content.viewType;
        model.overlayAlign = content.overlayAlign;
        model.addToCart = content.addToCart;
        model.addToCartUrl = URLUtils.url('Cart-AddProduct');
        var images = product.getImages(model.viewType);
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
