(function( win, doc ) {

  // private real setter functions, not on prototype, see note on .set
  var _set = function( key, value ) {

    // needs to be bound the the instance.
    if ( !key || typeof value === undefined ) return this;

    if ( this.__data[key] === undefined ) throw new Error( 'Model does not contain the key: ' + key );

    // no change? don't waste our time.
    if ( this.__data[key] && this.__data[key] === value ) return this;

    if ( value === null ) {
      this.__data.delete( key ); // delete = null.
    } else {
      this.__data[ key ] = value;
    }
    // fire an event for (change:key) passing back the value
    return this.fireEvent( 'change:' + key, value );
  }.overloadSetter();


  /**
   * Model: Class
   * This is our base model for all future created models
   */
  var Model = new Class({

    __cid: false,

    __data: {},

    Implements: [Options, Events],

    initialize: function( data, options ) {
      this.setOptions( options );
      this.__cid = this.getUID();
      data && typeOf( data ) === 'object' && this.set( data );
      this.init();
    },

    /**
     * Override me if needed
     */
    init: function() {},

    /**
     *  Model#set
     *  model.set('key', value), model.set({key: value})
     *  if one key is provided, it will return just that value.
     *  otherwise, if more than one key is provided, it will return a hashmap.
     */
    set: function() {
      _set.apply( this, arguments );
      this.fireEvent( 'change' ); // TODO: Verify whether this is needed
    },

    /**
     *  Model#get
     *  model.get('key'), model.get('key', 'other'), model.get(['key','otherkey'])
     *  if one key is provided, it will return just that value.
     *  otherwise, if more than one key is provided, it will return a hashmap.
     */
    get: function( key ) {
      return ( key && typeof this.__data[key] !== undefined ) ? this.__data[key] : null;
    }.overloadGetter(),

    /**
     *  Model#getData
     *  returns the full data set
     */
    getData: function() {
      // return a copy.  Don't let the bastards
      // taint our data pool!
      return Object.extend( {}, this.__data ); // returns a function
      //return this.__data; // returns F > object data
    },

    getUID: function() {
        // https://gist.github.com/1308368
        for ( b = a = ''; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-' );
        return b
    }

  });

  win.Model = Model;

}( window, document ));