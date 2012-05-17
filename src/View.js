(function ( win, doc ){

  var View = new Class({

    Implements: [Options, Events],

    options: {},

    type: 'div',

    /**
     * initialize:
     * This may not be needed at the moment,
     * we can look into removing or implementing in the extending class
     */
    initialize: function() {},

    /**
     * render:
     * This should be overloaded in the extending class
     */
    render: function() {
      return this;
    },

    /**
     * remove:
     * Lets destroy the item from the DOM for good!
     */
    remove: function() {
      this.element.destroy();
    },

    /**
     * build:
     * Since we are not using a templating engine,
     * lets build out our own items to be used...
     */
    build: function( type, options, content ) {
      if ( !options ) options = {};
      var element = new Element( type, options );
      if ( content ) element.set( 'html', content );
      return element;
    }

  });

  win.View = View;

}( window, document ));