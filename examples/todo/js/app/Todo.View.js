(function ( win, doc ){

  var todos = new Todo.Service();

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

    template: function() {

      console.log(this);

      var checkbox = this.build( 'input', {
        'class': 'toggle',
        'type': 'checkbox',
        'data-todo-id': this.options.model.__cid
      });

      var label = this.build( 'label', {
        'data-todo-id': this.options.model.__cid,
        'text': this.options.model.get( 'title' )
      });

      var del = this.build( 'button', {
        'class': 'destroy',
        'data-todo-id': this.options.model.__cid
      });

      var div = this.build( 'div', {
        'class': 'view',
        'data-todo-id': this.options.model.__cid
      });

      var edit = this.build( 'input', {
        'id': 'fooID',
        'data-todo-id': this.options.model.__cid,
        'class': 'edit',
        'value': this.options.model.get( 'title' )
      });

      var li = this.build( this.type, {
        'id': this.options.model.__cid,
        'class': 'incomplete'
      });

      div.adopt( checkbox, label, del );
      li.adopt( div, edit );

      return li;

    },

    /**
     * render:
     *
     */
    render: function() {
      return this.template();
    }

  });

  Todo.App = new Class({

    Extends: View,

    element: $('todoapp'),

    initialize: function( options ) {
      this.setOptions( options );
      this.setup();
      // this.render();
    },

    setup: function() {
      $('new-todo').addEvent( 'keyup', this.createOnEnter.bind( this ) );
      todos.addEvent( 'add', this.addTodo );
    },

    createOnEnter: function( event ) {
      if ( event.code !== 13 ) return;
      todos.create( event.target.value );
      event.target.value = '';
    },

    addTodo: function( todo ) {
      var view = new Todo.View( {model: todo} );
      $('todo-list').adopt( view.render() );
    },

    template: function( data ) {
      $('todo-count').set( 'html', '<strong>' + data.count + '</strong> ' + this.pluralize( data.count, 'item' ) + ' left' );
      $('clear-completed').set( 'text', 'Clear completed (' + data.count + ')' );
    },

    render: function() {
      var view = new Todo.View();
      $('todo-list').adopt( view.render() );
    },

    pluralize: function( count, word ) {
      return count === 1 ? word : word + 's';
    }

  });

  win.Todo.View = Todo.View;
  win.Todo.App = Todo.App;

}( window, document ));