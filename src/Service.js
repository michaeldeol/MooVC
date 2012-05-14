(function( win, doc ) {

  var Service = new Class({

    Implements: [Options, Events],

    /**
     * model:
     * This should be overwritten in the extending class
     * TODO: This is not being used, need to figure out how to implement properly
     */
    model: Model,

    /**
     * __models: [Array]
     * Store the models we find.
     */
    __models: [],

    initialize: function( models, options ) {
      // Testing
      console.log( this.__models );
    },

    /**
     * add: method
     * Add a model to our storage
     */
    add: function( model ) {
      // TODO: Check for dupes
      this.__models.push( model );
    },

    /**
     * get: method
     * Returns the model we are looking for.
     */
    get: function( id ) {
      return this.__models[id];
    }

  });

  win.Service = Service;

}( window, document ));