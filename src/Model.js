(function (win, doc){
  var slice = Array.prototype.slice
  // private real setter functions, not on prototype, see note on .set
  var _set = function(key, value) {
      var self = this
      // needs to be bound the the instance.
      if (!key || typeof value === undefined) return self

      // no change? don't waste our time.
      if (self.__data[key] && self.__data[key] === value) return self

      if (value === null) {
          self.__data.delete(key) // delete = null.
      } else {
          self.__data[key] = value
      }
      // fire an event for data-binders.
      self.fireEvent("data.changed",[key, value])
      return self
  }.overloadSetter()

  var Model = new Class({
    Implements: [Options, Events],
    ,__data: {}
    ,options: {

    }
    ,initialize: function (data, options) {
      data && this.set(data)
      this.setOptions(options);
    }

    /**
     *  Model#get
     *  model.get('key'), model.get('key', 'other'), model.get(['key','otherkey'])
     *  if one key is provided, it will return just that value.  
     *  otherwise, if more than one key is provided, it will return a hashmap. 
     */
    ,get: function (args){
      args = Array.isArray(args)? args: slice.call(arguments, 0)
      var self = this
      return (args.length == 1)? self.__data[args[0]]
        :(function() {
          var got = {}
          args.forEach(function(key){
            got[key] = self.__data[key]
          })
          return got
        )())
    }

    /**
     *  Model#set
     *  model.set('key', value), model.set({key: value})
     *  if one key is provided, it will return just that value.  
     *  otherwise, if more than one key is provided, it will return a hashmap. 
     */
    ,set: function () {
      var method = this['get'+arguments[0].capitalize()]
      if (typeof arguments[0] === 'string' && method) {
        return method.apply(this, arguments)
      } 
      return _set.apply(this, arguments)
    }
  })
  win.Model = Model;

}(window, document));