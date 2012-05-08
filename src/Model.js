(function (win, doc){
  var Model = new Class({
    Implements: [Options, Events],
    options: {},
    initialize: function (options) {
      this.setOptions(options);
    }
  });

  win.Model = Model;
}(window, document));