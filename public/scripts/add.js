$('.submit').click(function(e){
$.ajax({
  method: 'POST',
  url: 'https://vast-temple-27669.herokuapp.com/recipe',
  data:{
    user_id: $('#user').val(),
    name: $('#rname').val(),
  }
})
.done(function(data){
$.get('https://vast-temple-27669.herokuapp.com/recipe')
.then(function(data1){
  for (var t=0; t < data1.length; t++){
    console.log(data1)
    if (data1[t].name == $('#rname').val()){
      var num = data1[t].id
    }
  }
  console.log(data)
  sendingsteps = []
  var info = $('.newstepid').map(function () { return $(this).val(); })
  for (var e = 0; e < info.length; e++){
  console.log(info[e])
    sendingsteps.push({
      orderNumber: e+1,
      stepBody: info[e],
      recipe_id: num
    })
  }
  sendingingr = []
  var info2 = $('.newingid').map(function () { return $(this).val(); })
  var info3 = $('.newquantityid').map(function () { return $(this).val(); })
  for (var s = 0; s < info2.length; s++){
    console.log(info2[s])
    sendingingr.push({
      name: info2[s],
      quantity: info3[s],
      recipe_id: num
    })
  }
  console.log(sendingsteps)
  console.log(sendingingr)
for (var z=0; z < sendingsteps.length; z++){
$.post('https://vast-temple-27669.herokuapp.com/step', sendingsteps[z])
.then(function(data3){
  console.log(data3)
})
}
$.get('https://vast-temple-27669.herokuapp.com/ingredient')
.then(function(data4){
for (var d=0; d < sendingingr.length; d++){
  var ingredientid
  console.log('i am trying')
    for (var i=0; i< data4.length;i++){
      console.log(data4[i].name)
      if (data4[i].name == sendingingr[d].name){
        ingredientid = data4[i].id
        $.post( 'https://vast-temple-27669.herokuapp.com/recipe/'+num+'/associateIngredient/'+ingredientid+'/', {
            quantity: sendingingr[d].quantity,
            name: sendingingr[d].name,
            recipe_id: num
          })
        .then(function(data5){
          console.log('found ingredient')
        })
        return
      }
    }
    function closure (sendinging){
      $.ajax({
      method: 'POST',
      url:'https://vast-temple-27669.herokuapp.com/ingredient/',
      data: {name: sendinging.name}
    })
    .done(function(data6){
      console.log(data6)
      $.ajax({
        method: 'POST',
        url: 'https://vast-temple-27669.herokuapp.com/recipe/'+num+'/associateIngredient/'+data6[0]+'/',
        data: {
          quantity: sendinging.quantity,
          name: sendinging.name,
          recipe_id: num
        }
      })
      .done(function(data){
      })
    })
  }
  closure(sendingingr[d])
}
})
})
})
})
$('#newing').click(function(e){
  $('.ingredients').append('<li><p>Quantity: <input class="newquantityid"></input>Ingredient: <input class="newingid"></input><button class="removeing">Remove</li>')
})
$('#addstep').click(function(e){
  $('.steps').append('<li><p><input class="newstepid"></input><button class="removestep">Remove</button></li>')
})
$(document).on('click','.removeing', function(e){
  $(e.target).parent().parent().remove()
})
$(document).on('click','.removestep', function(e){
  $(e.target).parent().parent().remove()
})
