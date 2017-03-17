$(document).ready(function(){
  $.get('https://vast-temple-27669.herokuapp.com/ingredient')
  .then(function(data){
    console.log('got')
    data.forEach(function(el){
      console.log(el)
      var $recipeli = $('<li>')
      $recipeli.append('<a href="./ingredient.html?id='+el.id+'">'+el.name+'</a>')
      $('.homeingredients').append($recipeli)
    })
  })
})
