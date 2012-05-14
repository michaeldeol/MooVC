(function( win, doc ) {

  Model.Local = new Class({
    Extends: Model,
    timeouts: [],
    localKey: '',
    initialize: function ( data ) {
      // this.localKey = String( localKey );
      var localData = localStorage.getItem( this.localKey ) || {};
      this.parent( Object.extend( data, localData ) );
    },
    set: function () {
      this.parent( arguments );
      clearTimeout( this.timeouts[ this.localKey ] );
      this.timeouts[ this.localKey ] = setTimeout( this.save.bind( this ), 100 );
    },
    save: function () {
      localStorage.setItem( this.localKey, JSON.stringify( this.get('data') ) );
    }
  });

  win.Model.Local = Model.Local;

}( window, document ));