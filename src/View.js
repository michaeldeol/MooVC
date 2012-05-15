(function (win, doc){

  var View = new Class({

    Implements: [Options, Events],

    options: {},

    initialize: function (options) {
      this.setOptions(options);
    }

  });

  win.View = View;

}(window, document));