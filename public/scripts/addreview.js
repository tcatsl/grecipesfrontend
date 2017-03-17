var url = window.location.toString()
var re = /\d+$/g
num = url.match(re)[0]
$(document).ready(function(){
  $.get('https://vast-temple-27669.herokuapp.com/recipe/'+num)
  .then(function(data){
    console.log('got')
    $('.page-header').text(data[0].name)
  })
  $('#send').click(function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'https://vast-temple-27669.herokuapp.com/review?recipeId='+num,
      data: {
        user_id: $('#user').val(),
        rating: $('#rating').val(),
        reviewBody: $('#text').val(),
        recipe_id: num
      }
    })
    .done(
      window.location = './reviews.html?id='+num
    )
  })
})
