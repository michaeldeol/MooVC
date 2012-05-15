(function( win, doc ) {

  /**
   * Private Models
   * We only want the class to get/set these items
   */
  var __models = [];

  var Service = new Class({

    Implements: [Options, Events],

    /**
     * model:
     * This should be overwritten in the extending class
     * TODO: This is not being used, need to figure out how to implement properly
     */
    model: Model,

    /**
     * add: method
     * Add a model to our storage
     */
    add: function( model ) {
      // TODO: Check for dupes
      __models.push( model );
    },

    /**
     * get: method
     * Returns all modules
     * TODO: This may need to be renamed 'get' feels to specific
     */
    get: function() {
      if ( __models.length === 0 ) return 'Unable to locate any Modules...';
      return __models;
    }

  });

  win.Service = Service;

}( window, document ));