var url = window.location.toString()
var re = /\d+$/g
num = url.match(re)[0]
$(document).ready(function(){
  $.get('https://vast-temple-27669.herokuapp.com/recipe/'+num)
  .then(function(data){
    $('.page-header').text(data[0].name)
  })
  $.get('https://vast-temple-27669.herokuapp.com/review?recipeId='+num)
  .then(function(data){
    console.log('got')
    data.forEach(function(el){
      console.log(el)
      var $review = $('<li>')
      $review.append('<p>Rating: '+el.rating+'</p><p>Submitted by: '+el.user_id+'</p><p>Review: '+el.reviewBody+'</p><button class=edit id="'+el.id+'">Edit</button><button class="delete" id="'+el.id+'">Delete</button>')
      $('.reviewbody').append($review)

    })
    $('.edit').click(function(e){
      var number = parseInt($(this).attr('id'))
      window.location = './editreview.html?id='+number
    })
    $('.delete').click(function(e){
      var number = parseInt($(this).attr('id'))
      $.ajax({
        method: 'DELETE',
        url: 'https://vast-temple-27669.herokuapp.com/review/'+number
      })
      .done(function(data){
        window.location.reload()
      })
    })
  })
})
