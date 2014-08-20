var app = app || {};

app.ProductoView = Backbone.View.extend({

  template: _.template( $('#adminProductos').html() ),

  events: {
    'click #agregarProducto' : 'add',
    'submit #addProducto' : 'guardar',
    'click #verProducto' : 'ver',
  },
  
  
  initialize: function() {
    this.listenTo(app.Productos, 'reset', this.addAll);
    this.listenTo(app.Productos, 'change', this.addAll);
    app.Productos.fetch();
    this.render();
  },  
  render: function() {
    $(this.el).html(this.template());
    $('input[type="checkbox"]').checkbox();
    this.$form = this.$('#addProducto');
    this.$cod  = this.$('#new-producto-cod');
    this.$name  = this.$('#new-producto-name');
    this.$descripcion  = this.$('#new-producto-descripcion');
    this.$descripcion2   = this.$('#new-producto-descripcion2');
    this.$categoria  = this.$('#new-producto-categoria');
    this.$marca = this.$('#new-producto-marca');
    for(x = 1 ; x<6 ; x++){this.imagenes(x);}
    $(this.el).find('#addproducto').hide();
    return this;
  },
  newAttributes: function() {
    return { 
      //armo el producto con lo proveniente del formulario
      name: this.$name.val().trim(),
      producto: this.$producto.val().trim(),
      mail: this.$mail.val().trim(),
      tel:  this.$tel.val().trim(),
      pass: this.$pass.val().trim(),
    };
  },
  guardar : function (event) {
    event.preventDefault();
    this.imagePhp();
    console.log($('#addProducto').serialize());
/*    app.Productos.create( this.newAttributes() ); 
    this.$name.val('');
    this.$producto.val('');
    this.$pass.val('');
    this.$mail.val('');
    this.$tel.val('');*/

    $(this.el).find('#addproducto').hide();
  },
  add: function () {
    $(this.el).find('#producto-list').hide();
    $(this.el).find('#addproducto').show();
  },
  ver: function () {
    this.addAll();
    $(this.el).find('#addproducto').hide();
    $(this.el).find('#producto-list').show();
    //cargo el formulario de vista + edicion para modificar el usuario
  },
  addOne: function( producto ) {
    var view = new app.ProductoListView({ model: producto });
    $('#producto-list').append( view.render().el );
  },
  addAll: function() {
    this.$('#producto-list').html('');
    app.Productos.each(this.addOne, this);
  },
  imagenes : function (x){
    require(["dojo/dom", "dojo/domReady!"], function(dom){
    var MAX_HEIGHT = 200;
    var target = dom.byId("preview"+x),
      preview = dom.byId("preview"+x),
      canvas = dom.byId("canvas"+x);

    var render = function(src){
      var img = new Image();
      img.onload = function(){
        if(img.height > MAX_HEIGHT) {
          img.width *= MAX_HEIGHT / img.height;
          img.height = MAX_HEIGHT;
        }
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        preview.style.width = img.width + "px";
        preview.style.height = img.height + "px";
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = src;

    };

    var readImage = function(imgFile){
      if(!imgFile.type.match(/image.*/)){
        console.log("The dropped file is not an image: ", imgFile.type);
        return;
      }

      var reader = new FileReader();
      reader.onload = function(e){
        render(e.target.result);
      };
      reader.readAsDataURL(imgFile);
    };
    //  DOMReady setup
    target.addEventListener("dragover", function(e) {e.preventDefault();}, true);
    target.addEventListener("drop", function(e){
      e.preventDefault(); 
      readImage(e.dataTransfer.files[0]);
    }, true);
    });
  },
  imagePhp:function () {
    var x = 1;
    for(x=1;x<6;x++){
      var canvas = document.getElementById("canvas"+x);
      if(canvas.width < 300 ){
    /*  require(["dojo/request"], function(request){
          request.post("../php/saveImage.php", {
            data: {
              imageName: "myImage.png",
              imageData: encodeURIComponent(document.getElementById("canvas").toDataURL("image/png"))
            }
          }).then(function(text){
              console.log("The server returned: ", text);
          });
        });*/
        console.log("ajax para canvas"+x);
        console.log(canvas.toDataURL("image/png"));
      }   
    } 
  },
  chargeCategorias:function(){

    this.$('#categoria-lista').html('');
    app.Categorias.each(this.addOne, this);
    var view = new app.CategoriaListView({ model: categoria });
    $('#categoria-lista').append( view.render().el );
  },
 

  
  
});