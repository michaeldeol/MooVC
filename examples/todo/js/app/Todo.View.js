(function ( win, doc ){

  Todo.View = new Class({

    Extends: View,

    type: 'li',

    /**
     * initialize:
     * This may not be needed at the moment,
     * we can look into removing or implementing in the extending class
     */
    initialize: function( options ) {
      this.setOptions( options );
    },

    /**
     * render:
     *
     */
    render: function() {
      var checkbox = this.build( 'input', {
        'class': 'toggle',
        'type': 'checkbox',
        'data-todo-id': 0
      });
      var label = this.build( 'label', {
        'data-todo-id': 0,
        'text': 'fooster'
      });
      var del = this.build( 'button', {
        'class': 'destroy',
        'data-todo-id': 0
      });
      var div = this.build( 'div', {
        'class': 'view',
        'data-todo-id': 0
      });
      var edit = this.build( 'input', {
        'id': 'fooID',
        'data-todo-id': 0,
        'class': 'edit',
        'value': 'model.title'
      });
      var li = this.build( this.type, {
        'id': 0,
        'class': 'incomplete'
      });
      div.adopt( checkbox, label, del );
      li.adopt( div, edit );
      $('todo-list').adopt( li );
    }

  });

  win.Todo.View = Todo.View;

}( window, document ));