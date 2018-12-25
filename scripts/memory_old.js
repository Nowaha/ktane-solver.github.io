$(l=>{
  $( document ).ready(function() {
    setDisabled(1);
    $("#input2text, #input2input, #input2confirm, #input3text, #input3input, #input3confirm, #input4text, #input4input, #input4confirm, #input5text, #input5input, #input5confirm, #input6text, #input6input, #input6confirm").hide();
  });

  $("#input2input, #input3input, #input4input, #input5input, #input6text, #input6input, #input6conrirm").on('input', function() {
    if(parseInt($(this).val()) < 1) {
      $(this).val(1);
    } else if(parseInt($(this).val()) > 4) {
      $(this).val(4);
    }
  });

  let disabledInt;
  function setDisabled(stage) {
    disabledInt = stage;
    $(".stage1").prop('disabled', bool1(stage));
    $(".stage2").prop('disabled', bool2(stage));
    $(".stage3").prop('disabled', bool3(stage));
    $(".stage4").prop('disabled', bool4(stage));
    $(".stage5").prop('disabled', bool5(stage));
  }

  function bool1(stage) {
    if(stage == 1 || stage == 2) { return false; } else { return true; }
  }

  function bool2(stage) {
    if(stage == 2 || stage == 3 || stage == 4) { return false;} else { return true;}
  }

  function bool3(stage) {
    if(stage == 4 || stage == 5 || stage == 6) { return false; } else { return true; }
  }

  function bool4(stage) {
    if(stage == 6 || stage == 7 || stage == 8) { return false; } else { return true; }
  }

  function bool5(stage) {
    if(stage < 1 || stage >= 8) { return false; } else { return true;}
  }

  let outcome1num, outcome2num, outcome3num, outcome4num, outcome1pos, outcome2pos;

  $("#input3confirm").click(function() {
    outcome1num = parseInt($("#input3input").val());
    setDisabled(disabledInt + 2);
  });

  $('input[name=number1]').on('change', function() {
    setDisabled(1);
    if($('input[name=number1]:checked').val() == "1" || $('input[name=number1]:checked').val() == "2") {
      outcome(1, "Press the second button", true);
      outcome1pos = "second";
    } else if($('input[name=number1]:checked').val() == "3") {
      outcome(1, "Press the third button", true);
      outcome1pos = "third";
    } else if($('input[name=number1]:checked').val() == "4") {
      outcome(1, "Press the fourth button", true);
      outcome1pos = "fourth";
    }
    $("#input3text, #input3input").fadeIn(250);
    $("#input3confirm").delay(150).show();
  });

  $("#input2").on('input', function() {
    if(parseInt($("#input2").val()) < 1) {
      $("#input2").val(1);
    } else if(parseInt($("#input2").val()) > 4) {
      $("#input2").val(4)
    }
    if(parseInt($("#input2").val()) >= 1 || parseInt($("#input2").val()) <= 4) {
      if(needsInput2) {
        outcome2pos = input2Int;
      }
    }
  });

  function intToTxt(value) {
    switch (value) {
      case 1: return "first"; break;
      case 2: return "second"; break;
      case 3: return "third"; break;
      case 4: return "fourth"; break;
    }
  }

  $("#input2confirm").click(function() {
    if($("#input2input").val() == null || $("#input2input").val() == "") {
      return;
    }
    outcome2pos = (intToTxt(parseInt($("#input2input").val())));
    $("#input2text, #input2input, #input2confirm").fadeOut(250);
    outcome2num = 4;
    setDisabled(disabledInt + 2);
  });

  $("#input6confirm").click(function() {
    outcome2num = parseInt($("#input6input").val());
    setDisabled(disabledInt + 2);
  });

  $('input[name=number2]').on('change', function() {
    setDisabled(3);
    if($('input[name=number2]:checked').val() == "1") {
      outcome(2, "Press the button with a '4' on it", true);
      $("#input6text, #input6input, #input6confirm").hide();
      $("#input2text, #input2input").fadeIn(250);
      $("#input2confirm").delay(100).show();
    } else if($('input[name=number2]:checked').val() == "2" || $('input[name=number2]:checked').val() == "4") {
      outcome(2, `Press the ${outcome1pos} button`);
      outcome2pos = outcome1pos;
      $("#input2text, #input2input, #input2confirm").hide();
      $("#input6text, #input6input").fadeIn(250);
      $("#input6confirm").delay(100).show();
    } else if($('input[name=number2]:checked').val() == "3") {
      outcome(2, "Press the first button");
      outcome2pos = "first";
      $("#input2text, #input2input, #input2confirm").hide();
      $("#input6text, #input6input").fadeIn(250);
      $("#input6confirm").delay(100).show();
    }
  });

  $("#input4confirm").click(function() {
    outcome3num = parseInt($("#input4input").val());
    setDisabled(disabledInt + 2);
  });

  $('input[name=number3]').on('change', function() {
    setDisabled(5);
    if($('input[name=number3]:checked').val() == "1") {
      outcome(3, `Press the button with a '${outcome2num}' on it`);
      outcome4num = outcome2num;
      $("#input4text, #input4input, #input4confirm").fadeOut(250);
    } else if($('input[name=number3]:checked').val() == "2") {
      outcome(3, `Press the button with a '${outcome1num}' on it`);
      outcome4num = outcome2num;
      $("#input4text, #input4input, #input4confirm").fadeOut(250);
    } else if($('input[name=number3]:checked').val() == "3") {
      outcome(3, "Press the third button", true);
      $("#input4text, #input4input").fadeIn(250);
      $("#input4confirm").delay(100).show();
    } else if($('input[name=number3]:checked').val() == "4") {
      outcome(3, "Press the button with a '4' on it");
      outcome4num = 4;
      $("#input4text, #input4input, #input4confirm").fadeOut(250);
    }
  });

  $("#input5confirm").click(function() {
    outcome4num = parseInt($("#input5input").val());
    setDisabled(disabledInt + 2);
  });

  $('input[name=number4]').on('change', function() {
    setDisabled(7);
    if($('input[name=number4]:checked').val() == "1") {
      outcome(4, `Press the ${outcome1pos} button`, true);
    } else if($('input[name=number4]:checked').val() == "2") {
      outcome(4, "Press the first button", true);
    } else if($('input[name=number4]:checked').val() == "3" || $('input[name=number4]:checked').val() == "4") {
      outcome(4, `Press the ${outcome2pos} button`, true);
    }
    $("#input5text, #input5input").fadeIn(250);
    $("#input5confirm").delay(100).show();
  });

  $('input[name=number5]').on('change', function() {
    setDisabled(9);
    if($('input[name=number5]:checked').val() == "1") {
      outcome(5, `Press the button with a '${outcome1num}' on it`);
    } else if($('input[name=number5]:checked').val() == "2") {
      outcome(5, `Press the button with a '${outcome2num}' on it`);
    } else if($('input[name=number5]:checked').val() == "3") {
      outcome(5, `Press the button with a '${outcome4num}' on it`);
    } else if($('input[name=number5]:checked').val() == "4") {
      outcome(5, `Press the button with a '${outcome3num}' on it`);}
  });

  function outcome(stage, text, wait) {
    $(`#output${stage}`).val(`${text}`);
    if(wait == false || wait == null) {
      setDisabled(disabledInt + 1);
  } }

  $('#reset').click(function() {
    outcome1num = outcome2num = outcome3num = outcome4num = null;
    outcome1pos = outcome2pos = null;
    for (var i = 1; i <= 5; i++) {
      $(`#output${i}`).val("");
      $(`input[name=number${i}]`).prop('checked', false);
    }
    hasConfirmedInput2 = false;
    setDisabled(1);
    $("#input2text, #input2input, #input2confirm, #input3text, #input3input, #input3confirm, #input4text, #input4input, #input4confirm, #input5text, #input5input, #input5confirm, #input6text, #input6input, #input6confirm").hide();
  });
});
