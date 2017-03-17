var steps
var ingredients
var url = window.location.toString()
var re = /\d+$/g
var num = url.match(re)[0]
$(document).ready(function(){
  console.log(num)
  $.get('https://vast-temple-27669.herokuapp.com/recipe/'+num)
  .then(function(data){
    var recipedata = data[0]
    console.log(recipedata)
    $('#rname').text(recipedata.name)
    $('#rname').append('<button id="editrname">Edit</button>')
    $('.author').text(recipedata.user_id)
    // $('.description').text(recipedata.description)
  })

getIngredients()
getTheSteps()
$(document).on('click', '.editstep', function(e){
  var clicked = $(e.target).parent()
  var stepid= $(this).parent().attr('id')
  console.log(stepid)
  $(this).parent().empty()
  $.get('https://vast-temple-27669.herokuapp.com/step/'+stepid)
  .then(function(data){
    console.log(data)
    var stepdata = data[0]
    clicked.append('<p id="'+stepdata.id+'">Name: <input class="test" id="step'+stepdata.id+'"></input><button class="doneeditstep">Done</button></p>')
    $('#step'+stepdata.id).val(stepdata.stepBody)
  })
})
$(document).on('click', '.doneeditstep', function(e){
  var stepnum = $(e.target).parent().attr('id')
  console.log($(e.target).parent().attr('id'))
  $.ajax({
    method: 'PATCH',
    url:'https://vast-temple-27669.herokuapp.com/step/' +stepnum,
    data: {
      stepBody: $('#step'+stepnum).val(),
      orderNumber: $(e.target).parent().parent().index()+1
    }
  })
  .done(function(data){
    $(e.target).parent().parent().parent().parent().empty()
      getTheSteps()

    }
    )
  })
})
$('#addstep').click(function(e){
  $('.steps').append('<li><p><input id="newstepid"></input><button id="addnewstep">Done</button></p></li>')
})
$(document).on('click', '#addnewstep', function(e){
  $.ajax({
    method: 'POST',
    url:'https://vast-temple-27669.herokuapp.com/step/',
    data: {
      stepBody: $('#newstepid').val(),
      orderNumber: $(e.target).parent().parent().index()+1,
      recipe_id: num
    }
  })
  .done(function(data){
    $(e.target).parent().parent().parent().empty()
      getTheSteps()

    }
    )
  })

  function getTheSteps(){
  $.get('https://vast-temple-27669.herokuapp.com/step?recipeId='+num)
  .then(function(data){
    console.log(data)
    var stepdata = data
    stepdata.sort(function(a,b){
      return a.orderNumber > b.orderNumber
    })
    $('.steps').append('<p>Steps:</p>')
    stepdata.forEach(function(el){
      $('.steps').append('<li><p id="'+el.id+'">'+el.stepBody+'<button class="editstep">Edit</button><button class="removestep">Remove</button></p></li>')
    })
  })
}

$('#newing').click(function(e){
  $('.ingredients').append('<li><p>Quaquantity: <input id="newquantityid"></input>Ingredient: <input id="newingid"></input><button id="addnewing">Done</button></p></li>')
})

$(document).on('click', '#addnewing', function(e){
  var ingredientid
  $.get('https://vast-temple-27669.herokuapp.com/ingredient?recipeId='+num)
  .then(function(data){
    for (var i in data){
      console.log(data[i].name)
      console.log($('#newingid').val())
      console.log(data[i].name == $('#newingid').val())
      if (data[i].name == $('#newingid').val()){
        ingredientid = data[i].id
        $.ajax({
          method: 'POST',
          url: 'https://vast-temple-27669.herokuapp.com/recipe/'+num+'/associateIngredient/'+data[i]+'/',
          data: {
            quantity: $('#newquantityid').val(),
            name: $('#newingid').val(),
            recipe_id: num
          }
        })
        .done(function(data){
          $(e.target).parent().parent().parent().empty()
          getIngredients()
        })
        return
      }
    }
    $.ajax({
      method: 'POST',
      url:'https://vast-temple-27669.herokuapp.com/ingredient/',
      data: {name: $('#newingid').val()}
    })
    .done(function(data){
      console.log(data)
      $.ajax({
        method: 'POST',
        url: 'https://vast-temple-27669.herokuapp.com/recipe/'+num+'/associateIngredient/'+data[0]+'/',
        data: {
          quantity: $('#newquantityid').val(),
          name: $('#newingid').val(),
          recipe_id: num
        }
      })
      .done(function(data){
        $(e.target).parent().parent().parent().empty()
        getIngredients()
      })
    })
  })
})
  function getIngredients(){
  $.get('https://vast-temple-27669.herokuapp.com/ingredient?recipeId='+num)
  .then(function(data){
    console.log(data)
    var ingredientsdata = data
    ingredientsdata.forEach(function(el){
      $('.ingredients').append('<li><p id ="'+el.id+'">'+el.quantity+' - '+el.name+'<button class="editing">Edit</button><button class="removeing">Remove</button></p></li>')
    })
  })
}
$(document).on('click', '.removestep', function(e){
  var clicked = $(e.target).parent()
  var stepid= $(this).parent().attr('id')
  console.log(stepid)
  $(this).parent().parent().parent().empty()
  $.ajax({
    method: 'DELETE',
    url: 'https://vast-temple-27669.herokuapp.com/step/'+stepid
  })
  .done(function(data){
    getTheSteps()
  })
  })
  $(document).on('click', '.editing', function(e){
    var clicked = $(e.target).parent()
    var ingid= $(this).parent().attr('id')
    console.log(ingid)
    var quan = $(this).prev().text()
    $(this).parent().empty()
    console.log(quan)
    $.get('https://vast-temple-27669.herokuapp.com/ingredient?recipeId='+num)
    .then(function(data){
      console.log(data)
      var ingdata = data
      for (var x=0; x< ingdata.length; x++) {
        console.log(ingdata[x])
        if (ingdata[x].id == ingid){
          ingdata = ingdata[x]
        }
      }
      console.log(ingdata)
      clicked.append('<p id="'+ingdata.id+'">Quantity: <input id="ingq'+ingdata.id+'"></input> Name: <p class="test" id="ingname'+ingdata.id+'"></p><button class="doneediting">Done</button></p>')
      $('#ingq'+ingdata.id).val(ingdata.quantity)
      $('#ingname'+ingdata.id).text(ingdata.name)
    })
  })
  $(document).on('click', '.doneediting', function(e){
    var ingnum = $(e.target).parent().attr('id')
    console.log($(e.target).parent().attr('id'))
    $.ajax({
      method: 'PATCH',
      url:'https://vast-temple-27669.herokuapp.com/recipe/2/associateIngredient/' +ingnum,
      data: {
        quantity: $('#ingq'+ingnum).val()
      }
    })
    .done(function(data){
      $(e.target).parent().parent().parent().empty()
        getIngredients()

      }
      )
    })

    $(document).on('click', '.removeing', function(e){
      var ingnum = $(e.target).parent().attr('id')
      console.log($(e.target).parent().attr('id'))
      $.ajax({
        method: 'DELETE',
        url:'https://vast-temple-27669.herokuapp.com/recipe/2/associateIngredient/' +ingnum,
      })
      .done(function(data){
        $(e.target).parent().parent().parent().empty()
          getIngredients()

        }
        )
      })
  $(document).on('click', '#editrname', function(e){
    var rname = $('#rname').text()
    $('#rname').empty()
    $('#rname').append('<input id="editr"></input><button id="doneeditrname">Done</button>')
    $('#editr').val(rname)
  })
  $(document).on('click', '#doneeditrname', function(e){
    console.log('test')
    var newname = $('#editr').val()
    console.log(newname)
    $.ajax({
      method: 'PATCH',
      url: 'https://vast-temple-27669.herokuapp.com/recipe/'+num,
      data: {
        name: newname
      }
    })
    .done(function(data){
      console.log(data)
      $('#rname').empty()
      $('#rname').text(newname)
      $('#rname').append('<button id="editrname">Edit</button>')
    })
  })
