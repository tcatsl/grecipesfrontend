$(document).ready(function(){
  var url = window.location.toString()
  var re = /\d+$/g
  num = url.match(re)[0]
  console.log(num)
$.get('https://vast-temple-27669.herokuapp.com/recipe/'+num)
.then(function(data){
  console.log(data)
  $('.recipeName').text(data[0].name)
  // $('.description').text(data.description)
  $('.author').text('submitted by: ' +data[0].user_id)
  $.get('https://vast-temple-27669.herokuapp.com/ingredient?recipeId='+ num )
  .then(function(data){
    console.log(data)
    data.forEach(function(el){
      $('.ingredients').append('<li>'+el.quantity+' '+ el.name+'</li>')
    })
  })
  $.get('https://vast-temple-27669.herokuapp.com/step?recipeId='+ num )
  .then(function(data){
    console.log(data)
    data.sort(function(a,b){
      return a > b
    })
    data.forEach(function(el){
      $('.steps').append('<li>'+el.orderNumber +'. '+el.stepBody)
    })
  })
  $.get('https://vast-temple-27669.herokuapp.com/review?recipeId='+ num)
  .then(function(data){
    console.log(data)
    $('.reviews').text('Reviews: ' + data.length)
    var tot = data.reduce(function(acc, val){
      return acc += val.rating
    }, 0)
    var avg = tot/(data.length)
    $('.rating').text('Average rating: '+ avg.toFixed(1))
  })
})
})
$('.reviews').click(function(){
  window.location = './reviews.html?id='+num
})
$('.addreview').click(function(){
  window.location = './addreview.html?id='+num
})
