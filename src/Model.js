(function (win, doc){
  var slice = Array.prototype.slice
  // private real setter functions, not on prototype, see note on .set
  var _set = function(key, value) {
      var self = this
        , method = this['get'+arguments[0].capitalize()]

      // needs to be bound the the instance.
      if (!key || typeof value === undefined) return self

      // no change? don't waste our time.
      if (self.__data[key] && self.__data[key] === value) return self

      if (value === null) {
          self.__data.delete(key) // delete = null.
      } else {
          if (method) {
            method.apply(this, slice.call(arguments, 1))
          }
          self.__data[key] = value
      }
      // fire an event for data-binders.
      self.observer && self.observer.fireEvent("data.changed",[key, value])
      return self
  }.overloadSetter()

  var Model = new Class({
    Implements: Events,
    ,__data: {}
    ,initialize: function (data, options) {
      // See if this creates a stack overflow...
      self.observer = options.observer || self
      data && this.set(data)
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
        , method = self['get'+String(arguments[0]).capitalize()]
      
      // If we: 
      //  - only got one argument
      //  - it's a string
      //  - and it's capitalized value appended to 'get' is a method
      if ( args.length === 1 && typeof args[0] === 'string' ) {
        return method? method.apply(self, args) : self.__data[args[0]]
      }

      return (function(got) {
        args.forEach(function(key){
          got[key] = self.get(key)
        })
        return got
      )({}))
    }

    /**
     *  Model#set
     *  model.set('key', value), model.set({key: value})
     *  if one key is provided, it will return just that value.  
     *  otherwise, if more than one key is provided, it will return a hashmap. 
     */
    ,set: function () {
      return _set.apply(this, arguments)
    }

    /** 
     *  Model#getData
     *  returns the full data set
     */
    ,getData: function () {
      // return a copy.  Don't let the bastards
      // taint our data pool!
      return Object.extend({},this.__data)
    }
  })
  win.Model = Model;

}(window, document));