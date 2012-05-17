(function( win, doc ) {

  // Todo Model
  var Todo = new Class({

    /**
     * Extends:
     * Extends base model
     */
    Extends: Model,

    /**
     * __data:
     * Initial data structore for specific model
     */
    __data: {
      'title': 'Default Todo',
      'completed': false
    },

    /**
     * options:
     * Properties passed in that start with 'on' ex: onChange will be treated
     * as an object event. These can be passed in as 'options' when creating the
     * new object as well.
     */
    options: {
      'onChange:title': function( value ) {
        console.log( 'New title is now, ', value );
      },
      'onChange:completed': function( value ) {
        console.log( 'Completed: ', value );
      },
      onChange: function( value ) {
        console.log( 'data updated' );
      }
    }
  });

  win.Todo = Todo;

}( window, document ));