
var app = app || {};

app.CategoriaMenuView = Backbone.View.extend({

  tagName: 'li',
  
  template: _.template( $('#categoriaMenu').html() ),
  
  events: {
  },
  
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  },  
});