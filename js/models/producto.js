  var app = app || {};
  // Producto Model
  app.Producto = Backbone.Model.extend({
    defaults: {
      cod: '',
      name: '',
      descripcion: '',
      descripcion2: '',
      talle: '',
      color: '',
      tamaño: '',
      medidas: '',
      tel: '',
      categoria: '',
      marca: '',
      imagen1: '',
      imagen2: '',
      imagen3: '',
      imagen4: '',
      imagen5: '',
    }

  });