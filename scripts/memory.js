$(l=>{
  //Runs when the page is ready for inputs
  $( document ).ready(function() {
    addNewStage();
  });

  //Variables
  let stage = 1;
  let stage1pos, stage2pos;
  let stage1label, stage2label, stage3label, stage4label;
  let hasUsedRadio = false, hasUsedInput = false;

  //Add a new stage at the bottom of the 'list'
  function addNewStage() {
    $(".container").append(`<div class="stage${stage}"> <h5>Stage ${stage}</h5> <div class="inputs"> <div class="display"> <form> <label> <input class="with-gap" name="number${stage}" type="radio" value="1"/> <span>1</span> </label> <br> <label> <input class="with-gap" name="number${stage}" type="radio" value="2"/> <span>2</span> </label> <br> <label> <input class="with-gap" name="number${stage}" type="radio" value="3"/> <span>3</span> </label> <br> <label> <input class="with-gap" name="number${stage}" type="radio" value="4"/> <span>4</span> </label> </form> </div> <div class="output"> <input type="text" id="output${stage}" readonly> </div> <div class="input_extra${stage}"> <p id="input_extra_text">Please input the --- of that number:</p><input type="number" id="input_extra" min="1" max="4"> </div> </div> </div>`);
      $(".container").find(`.input_extra${stage}`).hide();
  }

  //Disable (gray out) all the previous stages
  function disablePreviousStages() {
    for (var num = 1; num < stage; num++) {
      $(".container").find(`input[name=number${num}]`).prop('disabled', true);
      $(".container").find(`.input_extra${num} input`).prop('disabled', true);
      $(".container").find(`#output${num}`).prop('disabled', true);
      $(".container").find(`.input_extra${num} p`).addClass('disabled');
      $(".container").find(`.stage${num} h5`).addClass('disabled');
    }
  }

  //Runs on change of radio buttons
  $(".container").on('change', 'input[type=radio]', function() {
    if($(this).prop('checked') == false) {
      return;
    }

    hasUsedRadio = true;
    val = $(this).val();
    if(needsInput(val) == false) {
      output(val);
      $(".container").find(`.input_extra${stage}`).fadeOut(250);
      hasUsedInput = true;
    } else {
      $(".container").find(`.input_extra${stage}`).fadeIn(250);
      $(".container").find(`.input_extra${stage} #input_extra_text`).html(inputType(needsInput(val)));
      output(val);
    }
    canContinue();
  });

  //Runs on input of input_extra
  $(".container").on('input', 'input[type=number]', function() {
    if($(this).val() > 4) {
      $(this).val(4);
    } else if($(this).val() < 1) {
      $(this).val(1);
    }
    if(stage == 1) {
      stage1label = $(this).val();
      stage1pos = posToTxt($(this).val())
    } else if(stage == 2) {
      stage2label = $(this).val();
      stage2pos = posToTxt($(this).val())
    } else if(stage == 3) {
      stage3label = $(this).val();
    } else if(stage == 4) {
      stage4label = $(this).val();
    }
    hasUsedInput = true;
    canContinue();
  });

  //Converts numbers to words
  function posToTxt(val) {
    if (val == 1) {
      return "first";
    } else if (val == 2) {
      return "second";
    } else if (val == 3) {
      return "third";
    } else if (val == 4) {
      return "fourth";
    } else {
      return "404";
    }
  }

  //Runs when continue button is pressed
  $("#submit").click(function() {
    $(this).prop('disabled', true);
    stage++;
    addNewStage();
    disablePreviousStages();
  });

  //Runs when reset button is pressed
  $("#reset").click(function() {
    stage = 1;
    $(".container").empty();
    addNewStage();
  });

  //Check if the continue button can be undisabled
  function canContinue() {
    if(hasUsedRadio && hasUsedInput && stage < 5) {
      hasUsedInput = hasUsedRadio = false;
      $("#submit").prop('disabled', false);
    }
  }

  //Get and display the output with the input(s) given.
  function output(val) {
    out = $(".container").find(`#output${stage}`);
    if(stage == 1) {
      if(val == 4) {
        out.val(outputPrefab("fourth", true));
      } else if(val == 3){
        out.val(outputPrefab("third", true));
      } else {
        out.val(outputPrefab("second", true));
      }
    } else if(stage == 2) {
      if(val == 1) {
        out.val(outputPrefab("4", false));
      } else if(val == 3) {
        out.val(outputPrefab("first", true));
      } else {
        out.val(outputPrefab(stage1pos, true));
      }
    } else if(stage == 3) {
      if(val == 1) {
        out.val(outputPrefab(stage2label, false));
      } else if(val == 2) {
        out.val(outputPrefab(stage1label, false));
      } else if(val == 3) {
        out.val(outputPrefab("third", true));
      } else {
        out.val(outputPrefab("4", false));
      }
    } else if(stage == 4) {
      if(val == 1) {
        out.val(outputPrefab(stage1pos, true));
      } else if(val == 2) {
        out.val(outputPrefab("first", true));
      } else {
        out.val(outputPrefab(stage2pos, true));
      }
    } else if(stage == 5) {
      if(val == 1) {
        out.val(outputPrefab(stage1label, false));
      } else if(val == 2) {
        out.val(outputPrefab(stage2label, false));
      } else if(val == 3) {
        out.val(outputPrefab(stage4label, false));
      } else {
        out.val(outputPrefab(stage3label, false));
      }
    }
  }

  //Prefab for the output text
  function outputPrefab(text, position) {
    if(position) {
      return "Press the button in the " + text + " position";
    } else {
      return "Press the button with a " + text + " on it";
    }
  }

  //Return the text that is needed infront of the input.
  function inputType(string) {
    if(string == "label") {
      return "Please input the number on that button:";
    } else if(string == "pos"){
      return "Please input the position that button is in:"
    } else {
      return;
    }
  }

  //Check if the result needs extra input from the user (button label/pos).
  function needsInput(val) {
    if(stage == 1) {
      return "label";
    } else if(stage == 2){
      if(val == 1) {
        return "pos";
      } else {
        return "label";
      }
    } else if(stage == 3){
      if(val == 3) {
        return "label";
      } else {
        return false;
      }
    } else if(stage == 4){
      return "label";
    } else {
      return false;
    }
  }
});
