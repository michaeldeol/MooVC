(function( window, document ) {

    // Todo Object
    var Todo = new Class({
        Implements: Options,
        options: {
            id: null,
            title: 'title',
            completed: false
        },
        initialize: function( options ) {
            options.id = this.getUID();
            this.setOptions( options );
        },
        getUID: function() {
            // https://gist.github.com/1308368
            for ( b = a = ''; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-' );
            return b
        },
        getOptions: function() {
            return this.options;
        }
    });

    // Todo Model
    var TodoModel = new Class({
        todos: [],
        initialize: function() {
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

    // Todo Controller
    var TodoController = new Class({
        Implements: [Options, Events, TodoModel],
        options: {
            ENTER_KEY: 13,
            newTodo: $('new-todo')
        },
        initialize: function( option ) {
            //this.setOptions(options);
            this.addEvents();
            this.renderView();
        },
        addEvents: function() {
            this.options.newTodo.addEvent( 'keyup', function( event ) {
                if ( event.code === this.options.ENTER_KEY ) {
                    var todo = new Todo({ title: this.options.newTodo.get( 'value' ) });
                    this.options.newTodo.set( 'value', '' );
                    this.create( todo.getOptions() );
                    this.renderView();
                }
            }.bind( this ));
            window.addEvents({
                update: function( item ) { console.log( 'change:', item ) },
                delete: function( item ) {
                    this.destroy( item );
                    this.renderView();
                }.bind( this ),
                save: function( item ) {
                    this.update( item );
                    this.renderView();
                }.bind( this )
            });
        },
        renderView: function() {
            return new TodoView( this.loadTodos() );
        },
    });

    // Todo View
    var TodoView = new Class({
        Implements: [Options, Events],
        options: {
            ENTER_KEY: 13,
            todoList: $('todo-list')
        },
        todos: [],
        initialize: function( todos ) {
            this.todos = todos;
            this.addEvents();
            this.buildTemplate();
        },
        buildTemplate: function() {
            this.options.todoList.set( 'html', '' );
            this.todos.each( function( item, index ) {
                checkbox = new Element( 'input', {
                    'class': 'toggle',
                    type: 'checkbox',
                    'data-todo-id': item.id,
                    checked: ( item.completed ) ? true : false,
                    events: {
                        change: function() {
                            window.fireEvent( 'update', item );
                        }
                    }
                });
                label = new Element( 'label', {
                    'data-todo-id': item.id,
                    text: item.title
                });
                del = new Element( 'button', {
                    'class': 'destroy',
                    'data-todo-id': item.id,
                    events: {
                        click: function() {
                            window.fireEvent( 'delete', item );
                        }
                    }
                });
                div = new Element( 'div', {
                    'class': 'view',
                    'data-todo-id': item.id,
                    events: {
                        dblclick: function() {
                            $( 'li_' + item.id ).addClass( 'editing' );
                            $( 'input_' + item.id ).select();
                        }
                    }
                });
                edit = new Element( 'input', {
                    id: 'input_' + item.id,
                    'data-todo-id': item.id,
                    'class': 'edit',
                    value: item.title,
                    events: {
                        keypress: function( event ) {
                            if ( event.code === this.options.ENTER_KEY ) {
                                var val = event.target.value.trim();
                                item.title = val;
                                window.fireEvent( 'save', item );
                            }
                        }.bind( this ),
                        blur: function() {
                            var val = event.target.value.trim();
                            item.title = val;
                            window.fireEvent( 'save', item );
                        }
                    }
                });
                li = new Element( "li", {
                    id: 'li_' + item.id,
                    'class': ( item.completed ) ? 'completed' : 'incomplete'
                });
                div.adopt( checkbox, label, del );
                li.adopt( div, edit );
                this.options.todoList.adopt( li );
            }.bind( this ));
        }
    });

    // TEST DATA
    var todo1 = new Todo({title: 'foo', completed: false});
    var todo2 = new Todo({title: 'bar', completed: false});

    // var todos = [].concat(todo1.getOptions(), todo2.getOptions());

    // localStorage.setItem( 'todos-mootools', JSON.stringify( todos ) );

    var todoController = new TodoController();

}( window, document ));