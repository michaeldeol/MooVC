(function( win, doc ) {

  var todo1 = new Todo();
  var todos = new todoService();
  var view = new Todo.View();

  todo2 = new Todo;
  todo3 = new Todo;

  console.log('--------- Model Test ---------');
  todo1.set( 'title', 'wowmom' );
  todo1.set( 'title', 'fooBar' );
  todo1.set({
    'title': 'fooBaz',
    'completed': true
  });
  todo3.set( 'title', 'footest' );
  todo3.set( 'completed', true );
  // todo1.set( { 'faker': 'fooled' } ); // This should throw an error
  // console.log( todo1.get('completed') );
  // console.log( todo1 );

  console.log('--------- Service Test: Find Todos ---------');
  todos.add( todo1 );
  todos.add( [todo2, todo3] );
  var completed = todos.getCompleted();
  var foundByTitle = todos.getByTitle( 'wowmom' );
  console.log( completed );
  console.log( foundByTitle );

  console.log('--------- Service Test: Create Todo ---------');
  todos.create( 'Created by the Service Model' );
  todos.create();
  console.log('--------- Service Test: Return All Models ---------');
  console.log( todos.get() );
  console.log('--------- Service Test: Erase a Model ---------');
  todos.destroy( todo2 );
  console.log( todos.get() );

  console.log('--------- View Test: Load Basic View ---------');
  view.render();

  // TODO: Include an App View and a Todo View.
  // NOTE: Look into developing the Controller to handle the passing between
  //       views and service model.

}( window, document ));