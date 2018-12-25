$(l=>{

  let buttonText, buttonColor, CARlit, FRKlit, batteries, stripColor;
  const release = "Press the button, and then immediately release.";

  $('#submit1').on('click', function() {
    buttonText = $('input[name="text"]:checked').val(),
    buttonColor = $('input[name="color"]:checked').val(),
    CARlit = $('input[name="CAR"]').prop("checked"),
    FRKlit = $('input[name="FRK"]').prop("checked"),
    batteries = $('input[name="batteries"]:checked').val();

    if(buttonText === "abort") {
      s();
    } else if (batteries > 1 && buttonText === "detonate") {
      s(release);
    } else if (buttonColor === "white" && CARlit) {
      s();
    } else if (batteries > 2 && FRKlit) {
      s(release);
    } else if (buttonColor === "yellow") {
      s();
    } else if (buttonColor ==="red" && buttonText === "hold") {
      s(release);
    } else {
      s();
    }
  });

  $('#submit2').on('click', function() {
    stripColor = $('input[name="strip-color"]:checked').val();
    if(stripColor == "blue") {
      s("Release the button when there is a 4 in any position.");
    } else if (stripColor == "yellow") {
      s("Release the button when there is a 5 in any position.");
    } else {
      s("Release the button when there is a 1 in any position.");
    }
  });

  $('.back').on('click', function() {
    $('.stage1, .stage2, #result').fadeOut(500);
    $('.stage1').delay(500).fadeIn(500);
  });

  function s(result = "") {
    $('.stage1, .stage2').fadeOut(500);

    if(result != "") {
      $('#result p').text(result);
      $('#result').css('display','flex').hide().delay(500).fadeIn(500);
    } else {
      $('.stage2').delay(500).fadeIn(500);
    }
  }
});
