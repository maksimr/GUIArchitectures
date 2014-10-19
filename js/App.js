/**
 * @description
 * Element which allow control volume
 */

/**
 * Application record
 * Business logic of our application
 * @type {{volume: number}}
 */
global.VolumeModel = {
    volume: 10
};

/**
 * Get model object
 * @param modelName
 * @returns {*}
 */
var getModel = function (modelName) {
    return global[modelName];
};

/**
 * Get field from model
 * @param model
 * @param property
 * @returns {*}
 */
var getValueFromModel = function (model, property) {
    property = [].concat(property);
    return property.reduce(function (value, propName) {
        return value[propName]
    }, model);
};

/**
 * Screen records/components
 */
var $ = require('jquery');

var InputControl = function (rootNode) {
    var $rootNode = $(rootNode);
    var modelData = $rootNode.attr('data-model').split('.');
    var modelName = modelData.shift();

    var model = getModel(modelName);

    /**
     * View
     */
    var modelValue = getValueFromModel(model, modelData);
    $rootNode.val(modelValue); // Render model value on the screen
};

console.log(new InputControl($('.input-control').get(0)));
