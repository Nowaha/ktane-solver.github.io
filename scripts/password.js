$(l=>{
  let letters1 = [];
  let letters2 = [];
  let letters3 = [];
  let letters4 = [];
  let letters5 = [];

  $("#input1").on('input', function() {
    if($("#input1").val() != "") {
      $("#input2").prop('disabled', false);
    } else {
      $("#input2").prop('disabled', true);
      $("#input3").prop('disabled', true);
      $("#input4").prop('disabled', true);
      $("#input5").prop('disabled', true);
      $("#input2").val("");
      $("#input3").val("");
      $("#input4").val("");
      $("#input5").val("");
      $("#input2").removeClass("valid");
      $("#input3").removeClass("valid");
      $("#input4").removeClass("valid");
      $("#input5").removeClass("valid");
      $("#input2").parent().find("label").removeClass("active");
      $("#input3").parent().find("label").removeClass("active");
      $("#input4").parent().find("label").removeClass("active");
      $("#input5").parent().find("label").removeClass("active");
    }
    updateOutput();
  });

  $("#input2").on('input', function() {
    if($("#input2").val() != "") {
      $("#input3").prop('disabled', false);
    } else {
      $("#input3").prop('disabled', true);
      $("#input4").prop('disabled', true);
      $("#input5").prop('disabled', true);
      $("#input3").val("");
      $("#input4").val("");
      $("#input5").val("");
      $("#input3").removeClass("valid");
      $("#input4").removeClass("valid");
      $("#input5").removeClass("valid");
      $("#input3").parent().find("label").removeClass("active");
      $("#input4").parent().find("label").removeClass("active");
      $("#input5").parent().find("label").removeClass("active");
    }
      updateOutput();
  });

  $("#input3").on('input', function() {
    if($("#input3").val() != "") {
      $("#input4").prop('disabled', false);
    } else {
      $("#input4").prop('disabled', true);
      $("#input5").prop('disabled', true);
      $("#input4").val("");
      $("#input5").val("");
      $("#input4").removeClass("valid");
      $("#input5").removeClass("valid");
      $("#input4").parent().find("label").removeClass("active");
      $("#input5").parent().find("label").removeClass("active");
    }
      updateOutput();
  });

  $("#input4").on('input', function() {
    if($("#input4").val() != "") {
      $("#input5").prop('disabled', false);
    } else {
      $("#input5").prop('disabled', true);
      $("#input5").val("");
      $("#input5").removeClass("valid");
      $("#input5").parent().find("label").removeClass("active");
    }
      updateOutput();
  });

  $("#input5").on('input', function() {
      updateOutput();
  });

  function updateOutput() {
    $("#output").html("");
    letters1 = $("#input1").val().toLowerCase().split("");
    letters1 = letters1.filter(function(str) {
      return /\S/.test(str);
    });
    letters2 = $("#input2").val().toLowerCase().split("");
    letters2 = letters2.filter(function(str) {
      return /\S/.test(str);
    });
    letters3 = $("#input3").val().toLowerCase().split("");
    letters3 = letters3.filter(function(str) {
      return /\S/.test(str);
    });
    letters4 = $("#input4").val().toLowerCase().split("");
    letters4 = letters4.filter(function(str) {
      return /\S/.test(str);
    });
    letters5 = $("#input5").val().toLowerCase().split("");
    letters5 = letters5.filter(function(str) {
      return /\S/.test(str);
    });
    getWords();
    if($("#input1").val() != "" || $("#input2").val() != "" || $("#input3").val() != "" || $("#input4").val() != "" || $("#input5").val() != "") {
      $("#output").attr("class", "output");
    } else {
      $("#output").attr("class", "placeholder");
      $("#output").html("Output...");
    }
  }

  const words = ["about", "after", "again", "below", "could", "every", "first", "found", "great", "house", "large", "learn", "never", "other", "place", "plant", "point", "right", "small", "sound", "spell", "still", "study", "their", "there", "three", "think", "water", "where", "which", "world", "would", "write"];

  function getWords() {
    for (var i = 0; i < words.length; i++) {
      let word = words[i].split("");
      if($.inArray(word[0], letters1) != -1) {
        if(letters2[0] == null) {
          if($("#output").html() == "") {
            $("#output").html(words[i]);
          } else {
            $("#output").html($("#output").html() + " / " + words[i])
          }
        } else {
          if($.inArray(word[1], letters2) != -1) {
            if(letters3[0] == null) {
              if($("#output").html() == "") {
                $("#output").html(words[i]);
              } else {
                $("#output").html($("#output").html() + " / " + words[i])
              }
            } else {
              if($.inArray(word[2], letters3) != -1) {
                if(letters4[0] == null) {
                  if($("#output").html() == "") {
                    $("#output").html(words[i]);
                  } else {
                    $("#output").html($("#output").html() + " / " + words[i])
                  }
                } else {
                  if($.inArray(word[3], letters4) != -1) {
                    if(letters5[0] == null) {
                      if($("#output").html() == "") {
                        $("#output").html(words[i]);
                      } else {
                        $("#output").html($("#output").html() + " / " + words[i])
                      }
                    } else {
                      if($.inArray(word[4], letters5) != -1) {
                        if($("#output").html() == "") {
                          $("#output").html(words[i]);
                        } else {
                          $("#output").html($("#output").html() + " / " + words[i])
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
