'use strict';

/**
 * @module object
 */

/**
 * Deep copies all all object properties from source to target
 *
 * @param {Object} target The target object which should be extended
 * @param {Object} source The object for extension
 * @param {Boolean} deep Flag indicates if properties should be copied recursivly from deepest possible level. Defualt is true.
 * @return {Object}
 */
exports.extend = function (target, source, deep) {
  var src;

  var deepCopy = typeof deep === 'undefined' ? true : deep;

  if (!target) {
    return source;
  }

  for (var i = 1; i < arguments.length; i++) {
    src = arguments[i];
    /* eslint-disable-next-line */
    for (var prop in src) {
      // recurse for non-API objects
      if (src[prop] && typeof src[prop] === 'object' && !src[prop].class && deepCopy) {
        target[prop] = this.extend(target[prop], src[prop]);
      } else {
        target[prop] = src[prop];
      }
    }
  }

  return target;
};

/**
 * Access given properties of an object recursively
 *
 * @param {Object} object The object
 * @param {String} propertyString The property string, i.e. 'data.myValue.prop1'
 * @return {Object} The value of the given property or undefined
 * @example
 * var prop1 = require('~/object').safeAssign(obj, 'data.myValue.prop1')
 */
exports.safeAssign = function (object, properties, defaultValue) {
  let safeAssignedValue;

  if (properties && typeof properties === 'string') {
    /* eslint-disable-next-line */
    const propertiesListRegExp = /(?:([\w\s\-]+)\s?)/g; // match all values beetwen . or ' or " or []

    try {
      safeAssignedValue = properties.match(propertiesListRegExp).reduce(function (item, initValue) {
        if (Object.prototype.hasOwnProperty.call(item, initValue) && !empty(item[initValue])) {
          return item[initValue];
        } else { // eslint-disable-line
          throw { // eslint-disable-line
            error: 'Reference error! Properties is not defined'
          };
        }
      }, object);
    } catch (e) {
      safeAssignedValue = defaultValue;
    }
  }
  return safeAssignedValue !== undefined ? safeAssignedValue : null;
};

/**
 * Set object value pased on key path
 * @param {Object} object Source object
 * @param {String} path   Path to the field
 * @param {Object} value  Updated object
 * @example
 * var prop1 = require('~/object').set(obj, 'data.myValue.prop1', 'somevalue')
 */
exports.set = function (object, path, value) {
  let currentValue = object;

  if (path && typeof path === 'string' && !empty(object)) {
    /* eslint-disable-next-line */
    const propertiesListRegExp = /(?:([\w\s\-]+)\s?)/g; // match all values beetwen . or ' or " or []
    const propertiesSet = path.match(propertiesListRegExp);

    let property = propertiesSet[0];

    while (propertiesSet.length) {
      property = propertiesSet.shift();
      if (!(property in currentValue)) {
        currentValue[property] = {};
      }

      if (!propertiesSet.length) {
        currentValue[property] = value;
      } else {
        currentValue = currentValue[property];
      }
    }
  }
  return object;
}

/**
 * Returns an array containing all object values
 *
 * @param {Object} object
 * @return {Array}
 */
exports.values = function (object) {
  return !object ? [] : Object.keys(object).map(function (key) {
    return object[key];
  });
};


/**
 * A shortcut for native static method "keys" of "Object" class
 *
 * @param {Object} object
 * @return {Array}
 */
exports.keys = function (object) {
  return object ? Object.keys(object) : [];
};

/**
 * Convert the given object to a HashMap object
 *
 * @param object {Object}
 * @return {dw.util.HashMap} all the data which will be used in mail template.
 */
exports.toHashMap = function (object) {
  var HashMap = require('dw/util/HashMap');
  var hashmap = new HashMap();

  /* eslint-disable-next-line */
  for (var key in object) {
    /* eslint-disable-next-line */
    if (object.hasOwnProperty(key)) {
      hashmap.put(key, object[key]);
    }
  }

  return hashmap;
};

/**
 * Convert the given Map to a plain object
 *
 * @param object {dw.util.Map}
 * @return {Object} all the data which will be used in mail template.
 */
exports.fromHashMap = function (map) {
  var object = {};

  /* eslint-disable-next-line */
  for (var entry in map.entrySet()) {
    object[entry.key] = entry.value;
  }

  return object;
};
