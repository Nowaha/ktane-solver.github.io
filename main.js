$(l=>{
  function disableObject() {
    disableObject = true;
  }
  $(".selection").on('click', "button", function() {
    window.location.assign(`/pages/${encodeURI($(this).text().toLowerCase())}.html`);
  });

  $(".back").on('click', function() {
    window.location.assign("../index.html");
  });
});
