var url = window.location.href.toString()
var re = /\d+$/g
var num = url.match(re)[0]
$(document).ready(function(){
  $.get('https://vast-temple-27669.herokuapp.com/ingredient/'+num)
  .then(function(data){
    $('.page-header').text('Recipies with '+data[0].name)
  })
  $.get('https://vast-temple-27669.herokuapp.com/recipe?ingredientId='+num)
  .then(function(data){
    console.log('got')
    data.forEach(function(el){
      console.log(el)
      var $recipeli = $('<li>')
      $recipeli.append('<a href="./recipe.html?id='+el.id+'">'+el.name+'</a><br>submitted by'+el.user_id+'</a>')
      $('.homerecipes').append($recipeli)
    })
  })
})
