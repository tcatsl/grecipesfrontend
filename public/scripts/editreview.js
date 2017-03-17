var url = window.location.href.toString()
var re = /\d+$/g
var num = url.match(re)[0]
var recipe
$(document).ready(function(){
  $.get('https://vast-temple-27669.herokuapp.com/review/'+num)
  .then(function(data){
    console.log('got')
    data.forEach(function(el){
      console.log(el)
      $('#user').text('Submitted by:' + el.user_id)
      $('#rating').val(el.rating)
      $('#text').val(el.reviewBody)
      recipe = parseInt(el.recipe_id)
    })
  })
  $('#send').click(function(e){
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: 'https://vast-temple-27669.herokuapp.com/review/'+num,
      data: {
        rating: $('#rating').val(),
        reviewBody: $('#text').val()
      }
    })
    .done(function(data){
      console.log(data)

    window.location = './reviews.html?id='+recipe
    })
  })
})
