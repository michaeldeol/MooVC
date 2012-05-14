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
     */
    model: Todo,

    /**
     * getCompleted:
     * Find all model objects that have been marked as completed.
     */
    getCompleted: function() {
      var completed = [];
      this.__models.each(function( item, index ) {
        if ( item.__data.completed ) completed.push( item );
      });
      return completed;
    },

    /**
     * getByTitle:
     * Find a model by it's title.
     */
    getByTitle: function( title ) {
      var found = [];
      this.__models.each(function( item, index ) {
        if ( item.__data.title === title ) found.push( item );
      });
      if ( found.length === 0 ) return 'Unable to find title: ' + title;
      return found;
    }

  });

  win.todoService = todoService;

}( window, document ));