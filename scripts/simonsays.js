$(l=>{
  let hasVowels = false, strikes = 0, outputArray = [];

  $("#submit").click(function(){
      outputArray.push(getFinalColor($("input[name=color]:checked").val()));
      output();
  });

  $('#clear').on('click', () => {
    $('#output').empty();
    outputArray = [];
  });

  function getFinalColor(color) {
    hasVowels = $('#hasvowels').prop('checked');
    strikes = $('input[name="strikes"]:checked').val();
    if (strikes == 0) {
      if(hasVowels) {
        switch (color) {
          case "red":
            return("Blue");
          case "blue":
            return("Red");
          case "yellow":
            return("Green");
          case "green":
            return("Yellow");
        }
      } else {
        switch (color) {
          case "red":
            return("Blue");
          case "blue":
            return("Yellow");
          case "green":
            return("Green");
          case "yellow":
            return("Red");
        }
      }
    } else if (strikes == 1) {
      if(hasVowels) {
        switch (color) {
          case "red":
            return("Yellow");
          case "blue":
            return("Green");
          case "green":
            return("Blue");
          case "yellow":
            return("Red");
        }
      } else {
        switch (color) {
          case "red":
            return("Red");
          case "blue":
            return("Blue");
          case "green":
            return("Yellow");
          case "yellow":
            return("Green");
        }
      }
    } else if (strikes == 2) {
      if(hasVowels) {
        switch (color) {
          case "red":
            return("Green");
          case "blue":
            return("Red");
          case "green":
            return("Yellow");
          case "yellow":
            return("Blue");
        }
      } else {
        switch (color) {
          case "red":
            return("Yellow");
          case "blue":
            return("Green");
          case "green":
            return("Blue");
          case "yellow":
            return("Red");
        }
      }
    }
  }

  function output() {
    $('#output').empty();
    for (var i = 0; i < outputArray.length; i++) {
      $('#output').append(`<input type="text" readonly value="${i + 1}: ${outputArray[i]}">`);
    }
  }
});
