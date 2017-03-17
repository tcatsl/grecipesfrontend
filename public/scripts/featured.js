$(document).ready(function(){

  $.get('https://vast-temple-27669.herokuapp.com/recipe')
  .then(function(data){
    console.log(data)
    console.log('got')
    data.forEach(function(el){
      console.log(el.id)
      $.get('https://vast-temple-27669.herokuapp.com/review?recipeId='+ el.id)
      .then(function(data){
        console.log(data)
        $('.reviews').text('Reviews: ' + data.length)
        var tot = data.reduce(function(acc, val){
          return acc += val.rating
        }, 0)
        var avg = tot/(data.length)
        $('.rating').text('Average rating: '+ avg.toFixed(1))
      console.log(el)
      var $recipeli = $('<li id="'+el.id+'">')
      $recipeli.append('<a href="./recipe.html?id='+el.id+'">'+el.name+'</a><br>submitted by'+el.user_id+'</a><p>Average Rating: '+(avg || 0)+'</p><a href="./reviews.html?id='+el.id+'">'+data.length+' Reviews</a><button class="edit">Edit</edit><button class="delete">Delete</button>')
      $('.homerecipes').append($recipeli)
    })
  })
  })
})
$(document).on('click', '.edit', function(e){
  window.location = './editrecipe.html?id='+ $(e.target).parent().attr('id')
})

$(document).on('click', '.delete', function(e){
  $.ajax({
    method: 'DELETE',
    url: 'https://vast-temple-27669.herokuapp.com/recipe/'+$(e.target).parent().attr('id')
  })
  .done(function(data){
    console.log(data)
    window.location.reload()
  })
})
