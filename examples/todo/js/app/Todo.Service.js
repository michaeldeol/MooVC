(function( win, doc ) {

  // Todo Service Model
  var todoService = new Class({

    /**
     * Extend our Service object
     */
    Extends: Service,

    /**
     * Save a copy of the model we are using
     * TODO: This is currently not being used... need to use this rather than __models if possible.
     * UPDATE: This will be used in the Service Model to create new TODO's
     */
    model: Todo,

    /**
     * storage:
     * Lets hide this data in localStorage
     */
    // storage: new Model.Local( 'todos-mootools' ),

    /**
     * create:
     * Create a new Todo to be used
     */
    create: function( title ) {
      var todo = new this.model();
      // Only set the title if available, else we will use the default model title
      // TODO: Look into removing this and requiring a title
      if ( title ) todo.set( 'title', title );
      this.add( todo );
    },

    /**
     * destroy:
     * Delete the model from our records
     */
    destroy: function( model ) {
      this.get().erase( model );
    },

    /**
     * getCompleted:
     * Find all model objects that have been marked as completed.
     */
    getCompleted: function() {
      var completed = [];
      this.get().each( function( model, index ) {
        if ( model.get( 'completed' ) ) completed.push( model );
      });
      return completed;
    },

    /**
     * getByTitle:
     * Find a model by it's title.
     */
    getByTitle: function( title ) {
      var found = [];
      this.get().each( function( model, index ) {
        if ( model.get( 'title' ) === title ) found.push( model );
      });
      if ( found.length === 0 ) return 'Unable to find title: ' + title;
      return found;
    },

    cleanTodo: function( model ) {
      console.log( model );
    }

  });

  win.todoService = todoService;

}( window, document ));