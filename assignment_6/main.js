function Item(name, image, quantity, glaze, price){
  this.name = name;
  this.image = image;
  this.quantity = quantity;
  this.glaze = glaze;
  this.price = price;
}
$(document).ready(function()
  $('#add-item').click(function(){
    var bunname = $('#blackberryheader').text();
    var bunimage = $('#blackberry');
    var bunpic = rollimage.attr('src');
    var bunquantity = $('#countoptions').val();
    var bunglaze = $('#glazeoptions').val();
    var bunprice = parseFloat($('#price').text());

  }))

var elem = document.getElementByID("countoptions");

console.log(elem);
console.log(elem.value)

countoptions.onchange=function(event){
  console.log(arguments);
  console.log(event);
  var select = event.target;
  console.log(select.value);
}

var cart = ["1", "3", "6", "9"];
  console.log(cart);
  var deleted = cart.splice(1,1);
  console.log(deleted);
