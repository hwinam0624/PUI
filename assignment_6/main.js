function Item(name, image, quantity, glaze, price){
  this.name = name;
  this.image = image;
  this.quantity = quantity;
  this.glaze = glaze;
  this.price = price;
}

$(document).ready(function()
{
  $('#add-item').click(function(){
    var bunname = $('#productname').text();
    var bunimage = $('#productpic');
    var bunpic = rollimage.attr('src');
    var bunquantity = $('#countoptions').val();
    var bunglaze = $('#glazeoptions').val();
    var bunprice = parseFloat($('#price').text());
    var save = new Item (bunname, bunpic, bunquantity, bunglaze, bunprice);
    var orderList = JSON.parse(localStorage.getItem("order"));
    if(orderList!=null && orderList.constructor===Array && orderList.length != 0)
    {
      console.log("Order Here");
      orderList.push(save);
      saveOrders(orderList, save);
    }
    else if(orderList!=null && orderList.constructor===Array && orderList.length == 0)
    {
      console.log("No Order");
      orderList.push(save);
      saveOrders(orderList, save);
    }
    else
    {
      console.log("First Order");
      newOrder = [];
      newOrder.push(save);
      saveOrders(newOrder, save);
    }

  });

  function saveOrders(list, item)
  {
    localStorage.setItem("order", JSON.stringify(list));
    var listAdded = JSON.parse(localStorage.getItem("order"));
    if(JSON.stringify(listAdded[listAdded.length-1])==JSON.stringify(item))
    {
      confirmation();
    }
    else
    {
      denial();
    }
  };

  var orderItems = JSON.parse(localStorage.getItem("order"));
  if(orderItems !=null && orderItems.constructor===Array)
  {
    if(orderItems.length==0)
    {
      popMessage();
    }
    else
    {
     var totalPrice = 0;
      for(var i=0; i<orderItems.length; i++)
     {
        var order = orderItems[i];
       moveToCart(order);
       totalPrice += order.price*order.quantity;
     }
      totalPrice = getPrice(totalPrice);
     $('#totalvalue').text(totalPrice);
   }
  }
  $('.remove').click(function(){
   if(confirm('Do you want to remove the item from the cart?'))
    {
      delete(orderItems, $(this))
    };
  });
});

function delete(orderItems, ii)
{
  var deletethis = DeleteThis(ii, orderItems);
  var deletewhat = ii.parent().parent().find("div")[3].innerText;
  var deletethisitem = DeleteThisItem(deletewhat, orderItems);
  if(deletethisitem!=null)
  {
    orderItems.splice(deletethisitem, 1);
    localStorage.removeItem("order");
    localStorage.setItem("order", JSON.stringify(orderItems));
    location.reload();
  }
  else{
    console.log("Error: no order found");
  }
};
function DeleteThisItem(deletewhat, list){
  for(var i=0; i<list.length; i++)
  {
    var order = list[i];
    console.log(order.name)
    if(order.name.trim()===deletewhat.trim())
    {
      return i;
    }
  }
  return null;
}

function confirmation()
{
  $('#notify').html("Item added to Cart");
  $('#notify').css("visibility", "visible");
  $('#notify').show().delay(1000).fadeOut();
};

function denial()
{
  $('#notify').html("Item cannot be added to Cart");
  $('#notify').css("color", "#C60028");
  $('#notify').css("visibility", "visible");
  console.log("Item cannot be added to Cart")
  $('#notify').show().delay(1000).fadeOut();

};

function DeleteThis(parent, list){
  var deletethis = parent.parent().parent().parent().parent().html();
  return deletethis;
}

function moveToCart(order){
  var $itemli = $("<li>", {"class": "orderitemlist"});
  var $cart = $("<div", {"class": "ordercart"});
  var $pic = $("<div", {"class": "orderpic"});
  $cart.append([
    cartImage($pic, order["image"]),
    cartCart($("<div>",{"class": "cartpart"}),order["name"]),
    cartQuantity($("<div>",{"class": "cartpart"}), order["quantity"]),
    cartGlaze($("<div>", {"class": "cartpart"}), order["glaze"]),
    cartPrice($("<div>",{"class": "cartpart"}), order["price"], order["quantity"]),
    cartRemove($("<div>",{"class": "cartpart"}))
    ]);
  $itemli.append($cart);
  $('#orders').append($itemli);
}

function popMessage(){
  var $itemli = $("<li", {"class": "orderitemlist"});
  $itemli.append($("<div>",{"id":"no-orderitemlist"}).text("Your Cart is Empty!"));
  $('#orders').append($itemli);
  $('#totalvalue').text('$0.00');
}

function cartImage(pic, picurl){
  $imgpic = $("<img>").attr('src', picurl);
  pic.append($imgpic);
  return pic;
}

function cartCart(cartpart, name){
  var $label = $('<div>', {"class": "cartlabel"}).text(name);
  cartpart.append([$label]);
  return cartpart;
}

function cartQuantity(cartpart, quantity) {
  var $label = ('<div>', {"class":"cartlabel"}).text(quantity);
  cartpart.append([$label]);
  return cartpart;
};

function cartGlaze(cartpart, glaze) {
  var $label = ('<div>', {"class":"cartlabel"}).text(glaze);
  cartpart.append([$label]);
  return cartpart;
};

function cartPrice(cartpart, price, quantity){
  var pricevalue = getPrice(price*quantity);
  var $label = $('<div>', {"class":"cartlabel"}).text(pricevalue);
  cartpart.append([$label]);
  return cartpart;
};

function getPrice(price){
  var pricevalue;
  if((price*100)%100!=0){
    if(String(price).split(".")[1].length==1){
      pricevalue = '$'+String(price)+'0'
    }
    else{
      pricevalue = '$'+String(price);
    }
  }
  else{
    pricevalue = '$'+String(price)+'.00';
  }
  return pricevalue;
}

function cartRemove(cartpart, url){
  $button = $("<button>", {class: "removebutton"});
  cartpart.append($button);
  return cartpart;
};
