// Todo Model
    var TodoModel = new Class({
        Extends: Model
        todos: [],
        initialize: function(data, options) {
            this.todos = this.loadTodos();
        },
        loadTodos: function() {
            // Works for now but should be extracted
            if ( !localStorage.getItem( 'todos-mootools' ) ) {
                localStorage.setItem( 'todos-mootools', JSON.stringify( this.todos ) );
            }
            return JSON.parse( localStorage.getItem( 'todos-mootools' ) );
        },
        saveTodos: function( data ) {
            localStorage.setItem( 'todos-mootools', JSON.stringify( data ) );
        },
        getTodo: function( id ) {
            this.todos.each( function( item, index ) {
                if ( id === item.id ) return item;
            });
        },
        create: function( obj ) {
            this.todos.push( obj );
            this.saveTodos( this.todos );
        },
        update: function( obj ) {
            // update stub
            this.todos.each( function( item, index ) {
                if ( item.id === obj.id ) {
                    item.title = obj.title;
                    item.completed = obj.completed;
                }
            });
            this.saveTodos( this.todos );
        },
        destroy: function( obj ) {
            // destroy stub
            this.todos.each( function( item, index ) {
                if ( item.id === obj.id ) {
                    this.todos.erase( item );
                }
            }.bind( this ));
            this.todos.clean();
            this.saveTodos( this.todos );
        }
    });