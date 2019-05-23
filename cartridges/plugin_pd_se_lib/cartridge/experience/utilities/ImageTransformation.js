var ImageTransformation = {};

// device specific breakpoint widths
var BREAKPOINTS = {
    mobile  : 768,
    desktop : 1440
};

/**
 * Calculates the required DIS transformation object based on the given parameters. Currently
 * only downscaling is performed.
 *
 * @param {Object} metaData the image meta data containing image width and height
 * @param {String} device the device the image should be scaled for (supported values: mobile, desktop)
 */
ImageTransformation.scale = function (metaData, device) {
    var transformObj = null;
    if (metaData && device) {
        var targetWidth = BREAKPOINTS[device];
        // only downscale if image is larger than desired width
        if (targetWidth && targetWidth < metaData.width) {
            transformObj = {
                scaleWidth : targetWidth,
                format     : 'jpg',
                scaleMode  : 'fit'
            };
        }
    }
    return transformObj;
};

/**
 * Provides a url to the given media file image. DIS transformation will be applied as given.
 *
 * @param {Object} image the image for which the url should be obtained
 * @param {Object} transform the (optional) DIS transformation parameters
 */
ImageTransformation.url = function (image, transform) {
    if (transform) {
        return image.getImageURL(transform);
    }

    return image.getAbsURL();
};

module.exports = ImageTransformation;
