(function (win, doc){
  var Controller = new Class({
    Implements: [Options, Events],
    options: {},
    initialize: function (options) {
      this.setOptions(options);
    }
  });

  win.Controller = Controller;
}(window, document));