$(l=>{
  $(".stage2").hide();

  let wireAmt = 1;
  let hasParralel, isOdd, batteries;
  let hasLight1 = false, hasLight2 = false, hasLight3 = false, hasLight4 = false, hasLight5 = false, hasLight6 = false, hasStar1 = false, hasStar2 = false, hasStar3 = false, hasStar4 = false, hasStar5 = false, hasStar6 = false;

  function isTrue(object) {
    if(object.is(":checked")) { return true; } else { return false; }
  }

  $( document ).ready(function() {
    loadRows();
  });

  $("#continue").click(function() {
    $(this).fadeOut(100);
    $(".stage2").delay(100).fadeIn(250);
  });

  $("#reset").click(function() {
    $(".stage2").fadeOut(250);
    $("#continue").delay(250).fadeIn(50);
    $("#hasParralel, #isOdd, #batteries").prop('checked', false);
  });

  $("#hasParralel").on('change', function() {
    if($(this).prop('checked')) { hasParralel = true; } else { hasParralel = false; }
  });

  $("#isOdd").on('change', function() {
    if($(this).prop('checked')) { isOdd = true; } else { isOdd = false; }
  });

  $("#batteries").on('change', function() {
    if($(this).prop('checked')) { batteries = true; } else { batteries = false; }
  });

  function assignVariable(num, state, type) {
    if(type == "light") {
      switch (parseInt(num)) { case 1: hasLight1 = state; break; case 2: hasLight2 = state; break; case 3: hasLight3 = state; break; case 4: hasLight4 = state; break; case 5: hasLight5 = state; break; case 6: hasLight6 = state; break; default: alert("Please reload the page"); break;
      }
    } else {
      switch (parseInt(num)) { case 1: hasStar1 = state; break; case 2: hasStar2 = state; break; case 3: hasStar3 = state; break; case 4: hasStar4 = state; break; case 5: hasStar5 = state;break; case 6: hasStar6 = state; break; default: alert("Please reload the page"); break;
      }
    }
    runCorrectFunc(colorString, num);
  }

  let colorString;
  function runCorrectFunc(color, num) {
    if(color == "white") {
      colorString = "white";
      w(color, num);
    } else if(color == "red" || color == "red-white") {
      colorString = "red";
      r_rw(color, num);
    } else if(color == "blue" || color == "blue-white") {
      colorString = "blue";
      b_bw(color, num);
    } else if(color == "red-blue") {
      colorString = "red-blue";
      r_b(color, num);
    } else {
      alert("Please reload the page.")
    }
  }

  $("#table tr").on('change', "td p label input[type=checkbox]", function() {
    if($(this).prop('id').split('hasLight')[1] != null) {
      num = $(this).prop('id').split('hasLight')[1];
      state = $(this).is(':checked');
      assignVariable(num, state, "light");
    } else {
      num = $(this).prop('id').split('hasStar')[1];
      state = $(this).is(':checked');
      assignVariable(num, state, "star");
    }

  });

  $('#table tr').on('change', "td p label input[type=radio]", function() {
    num = $(this).prop('name').split('color')[1];
    runCorrectFunc($(this).parent().find("span").html().toLowerCase(), num);
  });

  function w(color, num) {
    hasLightx = eval(`hasLight${num}`);
    hasStarx = eval(`hasStar${num}`);
    if(!hasLightx) {
      outcome("Cut", num);
    } else if(hasLightx && hasStarx && batteries) {
      outcome("Cut", num);
    } else {
      outcome("Don't cut", num);
    }
  }

  function r_rw(color, num) {
    hasLightx = eval(`hasLight${num}`);
    hasStarx = eval(`hasStar${num}`);
    if(!hasLightx && hasStarx) {
      outcome("Cut", num);
    } else if(!hasLightx && !hasStarx && !isOdd) {
      outcome("Cut", num);
    } else if(hasLightx && batteries) {
      outcome("Cut", num);
    } else {
      outcome("Don't cut", num);
    }
  }

  function b_bw(color, num) {
    hasLightx = eval(`hasLight${num}`);
    hasStarx = eval(`hasStar${num}`);
    if(!hasLightx && !hasStarx && !isOdd) {
      outcome("Cut", num);
    } else if(hasLightx && hasParralel) {
      outcome("Cut", num);
    } else {
      outcome("Don't cut", num);
    }
  }

  function r_b(color, num) {
    hasLightx = eval(`hasLight${num}`);
    hasStarx = eval(`hasStar${num}`);
    if(!hasLightx && !hasStarx && !isOdd) {
      outcome("Cut", num);
    } else if(!hasLightx && hasStarx && hasParralel) {
      outcome("Cut", num);
    } else if(hasLightx && !hasStarx && !isOdd) {
      outcome("Cut", num);
    } else {
      outcome("Don't cut", num);
    }
  }

  $("#amount").on('input', function() {
    if($(this).val() < 1 ) {
      $(this).val(1);
    } else if ($(this).val() > 6 ) {
      $(this).val(6);
    }
    wireAmt = $(this).val();
    loadRows();
  });

  function loadRows() {
    if(wireAmt == null || wireAmt == "") {
      return;
    }
    $("#table").find("tr").empty();
    for (var i = 0; i < wireAmt; i++) {
      num = i + 1;
      if(i == wireAmt - 1) {
        $("#table").find("tr").append(`<td class="absorbing-column master">
          <h5 class="customHeader">Properties</h5>
          <p class="customParagraph">
            <label>
              <input type="checkbox" class="filled-in" id="hasLight${num}"/>
              <span>Has Light</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input type="checkbox" class="filled-in" id="hasStar${num}"/>
              <span>Has Star</span>
            </label>
          </p>
          <h5 class="customHeader">Color</h5>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="W"/>
              <span>White</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="R"/>
              <span>Red</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="RB"/>
              <span>Blue</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="RW"/>
              <span>Red-Blue</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="BW"/>
              <span>Red-White</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio"  />
              <span>Blue-White</span>
            </label>
          </p>
          <h5 class="customHeader">Output:</h5>
          <div class="input-field col s6 outputDiv">
            <input id="output${num}" class="outputText" type="text" placeholder="Output" readonly/>
          </div>
        </td>`);
      } else {
        $("#table").find("tr").append(`<td class="master">
          <h5 class="customHeader">Properties</h5>
          <p class="customParagraph">
            <label>
              <input type="checkbox" class="filled-in" id="hasLight${num}"/>
              <span>Has Light</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input type="checkbox" class="filled-in" id="hasStar${num}"/>
              <span>Has Star</span>
            </label>
          </p>
          <h5 class="customHeader">Color</h5>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="W"/>
              <span>White</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="R"/>
              <span>Red</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="RB"/>
              <span>Blue</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="RW"/>
              <span>Red-Blue</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio" val="BW"/>
              <span>Red-White</span>
            </label>
          </p>
          <p class="customParagraph">
            <label>
              <input class="with-gap" name="color${num}" type="radio"  />
              <span>Blue-White</span>
            </label>
          </p>
          <h5 class="customHeader">Output:</h5>
          <div class="input-field col s6 outputDiv">
            <input id="output${num}" class="outputText" type="text" placeholder="Output" readonly/>
          </div>
        </td>`);
      }
    }
  }

  function outcome(text, num) {
    $(`#output${num}`).val(text);
    $(`#output${num}`).addClass("outputBold");
  }

});
