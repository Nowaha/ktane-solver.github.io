$(()=> {
    let icons = [];
    let iconForIsIcon = "";

    let rows = [["balloon", "at", "upsidedowny", "squigglyn", "squidknife", "hookn", "leftc"], ["euro", "balloon", "leftc", "cursive", "hollowstar", "hookn", "questionmark"], ["copyright", "pumpkin", "cursive", "doublek", "meltedthree", "upsidedowny", "hollowstar"], ["six", "paragraph", "bt", "squidknife", "doublek", "upsidedowny", "smileyface", "questionmark"], ["pitchfork", "smileyface", "bt", "leftc", "paragraph", "dragon", "filledstar"], ["six", "euro", "tracks", "ae", "pitchfork", "nwithhat", "omega"]];

    $('#icons img').on('click', function() {
        if(!$(this).hasClass('selected')) {
            icons.push(this.className);
        } else {
            iconForIsIcon = this.className.split(' ')[0];
            icons.splice(icons.findIndex((element)=>{return element == iconForIsIcon;}), 1);
        }
        $(this).toggleClass('selected');
        if(icons.length >= 4) {
            $('#submit').removeClass('disabled');
        } else {
            $('#submit').addClass('disabled');
        }
        if(icons.length > 4) {
            $(`.${icons[0]}`).removeClass('selected');
            icons.shift();
        }
    });

    $('#submit').on('click', function() {
        if(icons.length != 4) { /* Inspect element protection lol */
            $('#submit').addClass('disabled');
            alert('nice try.');
            return;
        }
        let solutionRow;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            if(row.includes(icons[0]) && row.includes(icons[1]) && row.includes(icons[2]) && row.includes(icons[3])) {
                solutionRow = row;
            }
        }

        $('#result').fadeOut(250);
        setTimeout(function() {
            if(solutionRow) {
                $('#result').text("yes");
                $('#result').delay(250).fadeIn(250);
                
                let indexes = [];

                for (let i = 0; i < icons.length; i++) {
                    indexes.push(solutionRow.indexOf(icons[i]));
                    console.log(icons[i] + solutionRow.indexOf(icons[i]));
                }

                $('#result').parent().find('h5').remove();
                $('#result').empty().parent().prepend(`<h5>Press the buttons in the following order:</h5>`);
                for (let i = 0; i < 4; i++) {
                    let index = solutionRow[Math.min(...indexes)];
                    $('#result').append(`
                    <tr>
                        <td>${i + 1}:</td>
                        <td><img class="${index}" src="/img/${index}.png"> </td>
                    </tr>`);
                    indexes.splice(indexes.indexOf(Math.min(...indexes)), 1);
                }
            } else {
                $('#result').text("There is no solution possible with the selected symbols.");
                $('#result').delay(250).fadeIn(250);
            }

            $('#icons .selected').removeClass('selected');
            $('#submit').addClass('disabled');
            icons = [];
        }, 250);
    });
});
