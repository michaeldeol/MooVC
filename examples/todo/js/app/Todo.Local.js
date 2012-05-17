(function( win, doc ) {

  Todo.Local = new Class({

    /**
     * This works for now, but we will want to find a better implementation.
     */
    service: todos,

    localKey: 'todos-mootools'

  });

  win.Todo.Local = Todo.Local;

}( window, document ));