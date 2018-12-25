$(l=>{
  $( document ).ready(function() {
    disableButtons(1);
    $(".stage2").childer().hide();
  });

  let stage = 1;
  $("#submit").click(function() {
    $(".container").fadeOut(250).fadeIn(250);
    setTimeout(() => {
      if(stage < 3) {
        stage++;
        for (let i = 1; i <= 3; i++) {
          $(`.number${i}`).html(parseInt($(`.number${i}`).html()) + 3);
        }
        $("#stage").html(`Stage ${stage}`);
        disableButtons(1);
        currentRedWires = 0;
        currentBlueWires = 0;
        currentBlackWires = 0;
      } else if (stage == 3) {
        stage++;
        for (let i = 1; i <= 3; i++) {
          $(`.number${i}`).html(parseInt($(`.number${i}`).html()) + 3);
        }
        $("#submit").html("Reset")
        $("#stage").html(`Stage ${stage}`);
        disableButtons(1);
        currentRedWires = 0;
        currentBlueWires = 0;
        currentBlackWires = 0;
      } else {
        stage = 1;
        $(".number1").html(1);
        $(".number2").html(2);
        $(".number3").html(3);
        $("#submit").html("Next Stage")
        $("#stage").html(`Stage 1`);
        wireNumRed = 0;
        wireNumBlue = 0;
        wireNumBlack = 0;
        currentRedWires = 0;
        currentBlueWires = 0;
        currentBlackWires = 0;
        lastWireRedStage = null;
        lastWireBlueStage = null;
        lastWireBlackStage = null;
        disableButtons(1);
      }
      $("#output1, #output2, #output3").val("");
      $(".radioElse").prop("checked", false);
      $(".radioNone").prop("checked", true);
    }, 250);
  });

  let color1, color2, color3, letter1, letter2, letter3, wireNumRed = 0, wireNumBlue = 0, wireNumBlack = 0, lastWireRedStage, lastWireBlueStage, lastWireBlackStage, buttonStage = 1;

  function disableButtons(setStage) {
    buttonStage = setStage;
    if(buttonStage == 2) {
      $("input[name=color1]").prop('disabled', false);
      $("input[name=letter1]").prop('disabled', false);
      $("input[name=color2]").prop('disabled', false);
      $("input[name=letter2]").prop('disabled', false);
      $("input[name=color3]").prop('disabled', true);
      $("input[name=letter3]").prop('disabled', true);
      $("#submit").prop('disabled', true);
    } else if(buttonStage == 3) {
      $("input[name=color1]").prop('disabled', true);
      $("input[name=letter1]").prop('disabled', true);
      $("input[name=color2]").prop('disabled', false);
      $("input[name=letter2]").prop('disabled', false);
      $("input[name=color3]").prop('disabled', true);
      $("input[name=letter3]").prop('disabled', true);
      $("#submit").prop('disabled', true);
    } else if(buttonStage == 4) {
      $("input[name=color1]").prop('disabled', true);
      $("input[name=letter1]").prop('disabled', true);
      $("input[name=color2]").prop('disabled', false);
      $("input[name=letter2]").prop('disabled', false);
      $("input[name=color3]").prop('disabled', false);
      $("input[name=letter3]").prop('disabled', false);
      $("#submit").prop('disabled', true);
    } else if(buttonStage == 5) {
      $("input[name=color1]").prop('disabled', true);
      $("input[name=letter1]").prop('disabled', true);
      $("input[name=color2]").prop('disabled', true);
      $("input[name=letter2]").prop('disabled', true);
      $("input[name=color3]").prop('disabled', false);
      $("input[name=letter3]").prop('disabled', false);
      $("#submit").prop('disabled', false);
    } else {
      $("input[name=color1]").prop('disabled', false);
      $("input[name=letter1]").prop('disabled', false);
      $("input[name=color2]").prop('disabled', true);
      $("input[name=letter2]").prop('disabled', true);
      $("input[name=color3]").prop('disabled', true);
      $("input[name=letter3]").prop('disabled', true);
      $("#submit").prop('disabled', true);
    }
  }

  $("#tr1 td input").on('change', function() {
    if($('input[name=color1]:checked').hasClass("radioElse") && $('input[name=letter1]:checked').hasClass("radioElse")) {
      color1 = $('input[name=color1]:checked').parent().find("span").html().toLowerCase();
      letter1 = $('input[name=letter1]:checked').parent().find("span").html().toLowerCase();
      if(color1 == "red") {
        if(shouldAddOneRed(1)) {
          wireNumRed++;
          currentRedWires++;
        }
        if(cutRedWire(letter1)) {
          $("#output1").val("Cut");
        } else {
          $("#output1").val("Don't cut");
        }
      } else if (color1 == "blue") {
        if(shouldAddOneBlue(1)) {
          wireNumBlue++;
          currentBlueWires++;
        }
        if(cutBlueWire(letter1)) {
          $("#output1").val("Cut");
        } else {
          $("#output1").val("Don't cut");
        }
      } else if (color1 == "black") {
        if(shouldAddOneBlack(1)) {
          wireNumBlack++;
          currentBlackWires++;
        }
        if(cutBlackWire(letter1)) {
          $("#output1").val("Cut");
        } else {
          $("#output1").val("Don't cut");
        }
      }
      disableButtons(2);
    }
  });

  $("#tr2 td input").on('change', function() {
    if($('input[name=color2]:checked').hasClass("radioElse") && $('input[name=letter2]:checked').hasClass("radioElse")) {
      if(buttonStage <= 2) {
        disableButtons(3);
      }
      color2 = $('input[name=color2]:checked').parent().find("span").html().toLowerCase();
      letter2 = $('input[name=letter2]:checked').parent().find("span").html().toLowerCase();
      if(color2 == "red") {
        if(shouldAddOneRed(2)) {
          wireNumRed++;
          currentRedWires++;
        }
        if(cutRedWire(letter2)) {
          $("#output2").val("Cut");
        } else {
          $("#output2").val("Don't cut");
        }
      } else if (color2 == "blue") {
        if(shouldAddOneBlue(2)) {
          wireNumBlue++;
          currentBlueWires++;
        }
        if(cutBlueWire(letter2)) {
          $("#output2").val("Cut");
        } else {
          $("#output2").val("Don't cut");
        }
      } else if (color2 == "black") {
        if(shouldAddOneBlack(2)) {
          wireNumBlack++;
          currentBlackWires++;
        }
        if(cutBlackWire(letter2)) {
          $("#output2").val("Cut");
        } else {
          $("#output2").val("Don't cut");
        }
      }
      disableButtons(4);
    }
  });

  $("#tr3 td input").on('change', function() {
    if($('input[name=color3]:checked').hasClass("radioElse") && $('input[name=letter3]:checked').hasClass("radioElse")) {
      if(buttonStage <= 4) {
        disableButtons(5);
      }
      color3 = $('input[name=color3]:checked').parent().find("span").html().toLowerCase();
      letter3 = $('input[name=letter3]:checked').parent().find("span").html().toLowerCase();
      if(color3 == "red") {
        if(shouldAddOneRed(3)) {
          wireNumRed++;
          currentRedWires++;
        }
        if(cutRedWire(letter3)) {
          $("#output3").val("Cut");
        } else {
          $("#output3").val("Don't cut");
        }
      } else if (color3 == "blue") {
        if(shouldAddOneBlue(3)) {
          wireNumBlue++;
          currentBlueWires++;
        }
        if(cutBlueWire(letter3)) {
          $("#output3").val("Cut");
        } else {
          $("#output3").val("Don't cut");
        }
      } else if (color3 == "black") {
        if(shouldAddOneBlack(3)) {
          wireNumBlack++;
          currentBlackWires++;
        }
        if(cutBlackWire(letter3)) {
          $("#output3").val("Cut");
        } else {
          $("#output3").val("Don't cut");
        }
      }
      disableButtons(5);
    }
  });

  let currentRedWires = 0, currentBlueWires = 0, currentBlackWires = 0;

  function cutRedWire(letter) {
    switch (wireNumRed) {
      case 1:
        if(letter == "c") {
          return true;
        } else {
          return false;
        }
      case 2:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
      case 3:
        if(letter == "a") {
          return true;
        } else {
          return false;
        }
      case 4:
        if(letter == "a" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 5:
        if(letter == "b") {
         return true;
       } else {
         return false;
       }
      case 6:
        if(letter == "a" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 7:
        return true;
      case 8:
        if(letter == "a" || letter == "b") {
          return true;
        } else {
          return false;
        }
      case 9:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
    }
  }

  function cutBlueWire(letter) {
    switch (wireNumBlue) {
      case 1:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
      case 2:
        if(letter == "a" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 3:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
      case 4:
        if(letter == "a") {
          return true;
        } else {
          return false;
        }
      case 5:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
      case 6:
        if(letter == "b" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 7:
        if(letter == "a") {
          return true;
        } else {
          return false;
        }
      case 8:
        if(letter == "a" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 9:
        if(letter == "a") {
          return true;
        } else {
          return false;
        }
    }
  }

  function cutBlackWire(letter) {
    switch (wireNumBlack) {
      case 1:
        return true;
      case 2:
        if(letter == "a" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 3:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
      case 4:
        if(letter == "a" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 5:
        if(letter == "b") {
          return true;
        } else {
          return false;
        }
      case 6:
        if(letter == "b" || letter == "c") {
          return true;
        } else {
          return false;
        }
      case 7:
        if(letter == "a" || letter == "b") {
          return true;
        } else {
          return false;
        }
      case 8:
        if(letter == "c") {
          return true;
        } else {
          return false;
        }
      case 9:
        if(letter == "c") {
          return true;
        } else {
          return false;
        }
    }
  }

  function shouldAddOneRed(num) {
    currentWireRedStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
    if(currentWireRedStage != lastWireRedStage) {
      lastWireRedStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
      return true;
    } else {
      lastWireRedStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
      return false
    }
  }

  function shouldAddOneBlue(num) {
    currentWireBlueStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
    if(currentWireBlueStage != lastWireBlueStage) {
      lastWireBlueStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
      return true;
    } else {
      lastWireBlueStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
      return false
    }
  }

  function shouldAddOneBlack(num) {
    currentWireBlackStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
    if(currentWireBlackStage != lastWireBlackStage) {
      lastWireBlackStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
      return true;
    } else {
      lastWireBlackStage = $(`input[name=color${num}]:checked`).parent().parent().parent().find("td h4").html();
      return false
    }
  }

  $("#noWire1").click(function() {
    disableButtons(2);
  });

  $("#noWire2").click(function() {
    disableButtons(4);
  });

  $("#noWire3").click(function() {
    disableButtons(5);
  });

  $("#reset").click(function() {
    wireNumRed = 0;
    wireNumBlue = 0;
    wireNumBlack = 0;
    // wireNumRed -= currentRedWires; currentRedWires = 0;
    // wireNumBlue -= currentBlueWires; currentBlueWires = 0;
    // wireNumBlack -= currentBlackWires; currentBlackWires = 0;
    disableButtons(1);
    $("#output1, #output2, #output3").val("");
    $(".radioElse").prop("checked", false);
    $(".radioNone").prop("checked", true);
  });
});
