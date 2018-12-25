$(e=>{
    $('.stage2, .stage3').hide();

    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    let results;

    $.getJSON('/scripts/wofResults.json', function(result) {
        results = result;
    });

    $('#continue1').on('click', function() {
        const textondisplay = $('#textondisplay').val().toLowerCase();

        $('.top-left, .top-right, .mid-left, .mid-right, .bottom-left, .bottom-right').css('background-color', '#fff');
        switch(textondisplay) {
            case "ur":
                $('.top-left').css('background-color', '#4CAF50');
                break;
            case "first": case "okay": case "c":
                $('.top-right').css('background-color', '#4CAF50');
                break;
            case "yes": case "nothing": case "led": case "they are":
                $('.mid-left').css('background-color', '#4CAF50');
                break;
            case "blank": case "read": case "red": case "you": case "your": case "their": case "you're":
                $('.mid-right').css('background-color', '#4CAF50');
                break;
            case "displayempty": case "reed": case "leed": case "they're": 
                $('.bottom-left').css('background-color', '#4CAF50');
                break;
            case "display": case "says": case "no": case "lead": case "hold on": case "you are": case "there": case "see": case "cee":
                $('.bottom-right').css('background-color', '#4CAF50');
                break;
        }
        $('.stage2').fadeIn(250);
        $('.stage1').find('h5').css('color', 'rgb(100,100,100)');
        $('#continue1').prop('disabled', true);
        $('#textondisplay').parent().find(".select-dropdown").prop('disabled', true);
    });
    
    $('#continue2').on('click', function() {
        $('.stage3').fadeIn(250);
        $('.stage2').find('h5').css('color', 'rgb(100,100,100)');
        $('#continue2').prop('disabled', true);
        $('#labelonbutton').parent().find(".select-dropdown").prop('disabled', true);

        $('.stage3 p').text(results[$('#labelonbutton').val()]);
    });
});
