/**
 * @description
 * Element which allow control volume
 */
var $ = require('jquery');

/**
 * Application record
 * Business logic of our application
 * @type {{volume: number}}
 */
global.VolumeModel = {
    data: {
        volume: 10
    },

    // Make model observable
    // Trigger event if model data changed
    set: function (propName, value) {
        var currentValue = this.data[propName];
        if (currentValue !== value) {
            this.data[propName] = value;
            $(this).trigger('change:' + propName);
        }
    },
    on: function (eventName, listener) {
        $(this).on(eventName, listener);
    },
    off: function (eventName, listener) {
        $(this).off(eventName, listener);
    }
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
    return model.data[property];
};

/**
 * Screen records/components
 */
var InputControl = function (rootNode) {
    var $rootNode = $(rootNode);

    var modelData = $rootNode.attr('data-model').split('.');
    var modelName = modelData[0];
    var modelFieldName = modelData[1];

    var model = getModel(modelName);

    //----------------------------------------------------

    /**
     * View
     *
     * Data flow:
     * Model ---> View
     */
    var updateViewRecord = function () {
        var modelValue = getValueFromModel(model, modelFieldName); // Get data from model
        $rootNode.val(modelValue); // Render model data on the screen
    };
    updateViewRecord();

    // View `subscribe` on model's change
    // one way data binding. View listen Model
    model.on('change:' + modelFieldName, updateViewRecord);

    //----------------------------------------------------

    /**
     * Controller
     *
     * Data flow:
     * View ---> Model
     */
    $(document).on('change', function (event) {

        // Controller handle all events on the screen
        // in classic MVC
        if (event.type !== 'change') {
            return;
        }

        if (event.target !== $rootNode.get(0)) {
            return;
        }

        // Controller has hidden connection with View
        var inputValue = parseInt($rootNode.val());

        // Controller send command/message to model to update her
        // value
        model.set(modelFieldName, inputValue);
    });
};

console.log(new InputControl($('.input-control').get(0)));
