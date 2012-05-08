(function (win, doc){
  var Model.Local = new Class({
     Extends: Model
    ,initialize: function (localKey, data) {
      this.localKey = String(localKey)
      var localData = localStorage.getItem( this.localKey ) || {}

      this.parent( Object.extend(data,localData) )
    }
    ,get: function () {
      if ( ! ) {
        
      }
    }
    ,save: function () {
      
      localStorage.setItem( this.localKey, JSON.stringify( this.get('data') ) );
    }
  })
}(window, document))