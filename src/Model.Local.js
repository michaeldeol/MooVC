(function( win, doc ) {

  Model.Local = new Class({

    timeouts: [],

    localKey: '',

    /**
     * init:
     * Override Model.init to instiate the data
     */
    initialize: function ( localKey ) {
      this.localKey = localKey;
      var localData = localStorage.getItem( this.localKey ) || {};
    },

    /**
     * set:
     * Currently this overrides the set method from the extended Model
     * TODO: Do we need to override this or can we find a way to implement to work together.
     */
    set: function () {
      clearTimeout( this.timeouts[ this.localKey ] );
      this.timeouts[ this.localKey ] = setTimeout( this.save.bind( this ), 100 );
    },

    /**
     * save:
     * Save our items to localStorage
     */
    save: function ( data ) {
      localStorage.setItem( this.localKey, JSON.stringify( data ) );
    }

  });

  win.Model.Local = Model.Local;

}( window, document ));