$(l=>{
  //Runs when the page is ready for inputs
  $( document ).ready(function() {
    addNewWire();
  });

  //Runs when the buttonn 'no wire' is pressed
  $(".container").on('click', '#nowire', function() {
    addNewWire();
  });

  //Runs when the buttonn 'next wire' is pressed
  $("#nextwire").click(function() {
    if(color == "Red") {
      redWires++;
    } else if(color == "Blue") {
      blueWires++;
    } else if(color == "Black") {
      blackWires++;
    } else {
      console.log(blackWires);
    }
    addNewWire();
  });

  //Varibales
  let wire = 1, stage = 1;
  let blackWires = 1, blueWires = 1, redWires = 1;
  let color, pos;

  //Add a new wire at the bottom of the 'list'
  function addNewWire() {
    $("#nextwire").prop('disabled', true);
    color = position = null;
    if(wire <= 12) {
      stage = Math.floor((wire/3) + 0.75);

      if(wire%3 == 1) {
        $(".inputs").empty();
      }

      $(".title").html(`Stage ${stage}`);
      $(".inputs").append(` <div class="wire${wire}"> <div class="display"> <h5 class="mainsubtitle">Wire ${wire}</h5> <button type="button" id="nowire" class="waves-effect waves-light btn orange">No Wire</button> </div> <div class="color"> <h5 class="subtitle">Color:</h5> <p> <label> <input class="with-gap" name="color" type="radio"/> <span>Red</span> </label> </p> <p> <label> <input class="with-gap" name="color" type="radio"/> <span>Blue</span> </label> </p> <p> <label> <input class="with-gap" name="color" type="radio"/> <span>Black</span> </label> </p> </div> <div class="position"> <h5 class="subtitle">Position:</h5> <p> <label> <input class="with-gap" name="position" type="radio"/> <span>A</span> </label> </p> <p> <label> <input class="with-gap" name="position" type="radio"/> <span>B</span> </label> </p> <p> <label> <input class="with-gap" name="position" type="radio"/> <span>C</span> </label> </p> </div> <div class="output"> <input type="text" class="input-field col s6" id="output" readonly> </div> </div> `);
      $(".inputs").find(`.wire${wire}`).hide();
      $(".inputs").find(`.wire${wire}`).fadeIn(250);

      if(wire%3 == 0 || wire%3 == 2) {
        $(`.wire${wire-1}`).find("h5").addClass("disabled");
        $(`.wire${wire-1}`).find("button").addClass("disabled");
        $(`.wire${wire-1}`).find("input").prop('disabled', true);
      }
      wire++;
    } else {
      $(`.wire${wire-1}`).find("h5").addClass("disabled");
      $(`.wire${wire-1}`).find("button").addClass("disabled");
      $(`.wire${wire-1}`).find("input").prop('disabled', true);
    }
  }

  //Reset back to default
  $("#reset").click(function() {
    $(".inputs").empty();
    wire = 1;
    addNewWire();
    blackWires = blueWires = redWires = 1;
    color = position = null;
  });

  //Runs when the radio button state of input is changed
  $(".container").on('input', 'input[name=color]', function() {
    color = $(this).parent().find("span").html();
    getOutcome();
  });

  //Runs when the radio button state of position is changed
  $(".container").on('input', 'input[name=position]', function() {
    pos = $(this).parent().find("span").html();
    getOutcome();
  });

  //Gets the output
  function getOutcome() {
    if(color == null || pos == null) {
      return;
    }
    $("#nextwire").prop('disabled', false);
    if(needsToCut()) {
      $(`.wire${wire-1}`).find(`#output`).val("Cut");
    } else {
      $(`.wire${wire-1}`).find(`#output`).val("Don't cut");
    }
  }

  function needsToCut() {
    if(color == "Red") {
      if(pos == "A") {
        if(redWires == 3 || redWires == 4 || redWires == 6 || redWires == 7 || redWires == 8) {
          return true;
        }
      } else if(pos == "B") {
        if(redWires == 2 || redWires == 5 || redWires == 7 || redWires == 8 || redWires == 9) {
          return true;
        }
      } else if(pos == "C") {
        if(redWires == 1 || redWires == 4 || redWires == 6 || redWires == 7) {
          return true;
        }
      }
    } else if(color == "Blue") {
      if(pos == "A") {
        if(blueWires == 2 || blueWires == 4 || blueWires == 8 || blueWires == 9) {
          return true;
        }
      } else if(pos == "B") {
        if(blueWires == 1 || blueWires == 3 || blueWires == 5 || blueWires == 6) {
          return true;
        }
      } else if(pos == "C") {
        if(blueWires == 2 || blueWires == 6 || blueWires == 7 || blueWires == 8) {
          return true;
        }
      }
    } else if(color == "Black") {
      if(pos == "A") {
        if(blackWires == 1 || blackWires == 2 || blackWires == 4 || blackWires == 7) {
          return true;
        }
      } else if(pos == "B") {
        if(blackWires == 1 || blackWires == 3 || blackWires == 5 || blackWires == 6 || blackWires == 7) {
          return true;
        }
      } else if(pos == "C") {
        if(blackWires == 1 || blackWires == 2 || blackWires == 4 || blackWires == 6 || blackWires == 8 || blackWires == 9) {
          return true;
        }
      }
    }
    return false;
  }
});
