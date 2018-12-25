$(()=> { 
    let numWires = 3, lastOdd = false, colors = []; 

    function generateTableElement(num) {
        return `<td><p><b>Wire ${num + 1}:</b></p><label><input name="color${num}" type="radio" class="color${num} with-gap" value="red" checked/><span>Red</span></label><br><label><input name="color${num}" type="radio" class="color${num} with-gap" value="blue"/><span>Blue</span></label><br><label><input name="color${num}" type="radio" class="color${num} with-gap" value="yellow"/><span>Yellow</span></label><br><label><input name="color${num}" type="radio" class="color${num} with-gap" value="black"/><span>Black</span></label><br><label><input name="color${num}" type="radio" class="color${num} with-gap" value="white"/><span>White</span></label></td>`;
    }

    $('#wirecount').on('change', function() {
        numWires = $(this).val();
        if(numWires == "" || numWires < 3) {
            $(this).val(3);
            numWires = 3;
        } else if (numWires > 6) {
            $(this).val(6);
            numWires = 6;
        }

        addWireOptions(numWires);
    });

    function addWireOptions(count) {
        $('#wirecontainer').empty();
        for (let i = 0; i < count; i++) {
            $('#wirecontainer').append(generateTableElement(i));
        }
    }

    addWireOptions(3);

    $('#submit').on('click', function() {
        numWires = $('#wirecount').val();
        lastOdd = $('#lastodd').prop('checked');
        colors = [];

        let children = document.querySelector('#wirecontainer').childNodes;
        for (var i = 0; i < numWires; i++) {
            colors.push($(children[i]).find('label').find('input:checked').val());
        }

        if(numWires == 3) {
            if(!containsColor('red')) {
                showResult('Cut the second wire.');
            } else if (lastIs('white')) {
                showResult('Cut the last wire.');
            } else if (amountOf('blue') > 1) {
                showResult('Cut the last blue wire.');
            } else {
                showResult('Cut the last wire.');
            }
        } else if (numWires == 4) {
            if (amountOf('red') > 1 && lastOdd) {
                showResult('Cut the last red wire.');
            } else if (lastIs('yellow') && !containsColor('red')) {
                showResult('Cut the first wire.');
            } else if (amountOf('blue') == 1) {
                showResult('Cut the first wire.');
            } else if (amountOf('yellow') > 1) {
                showResult('Cut the last wire.');
            } else {
                showResult('Cut the second wire.');
            }
        } else if (numWires == 5) {
            if(lastIs('black') && lastOdd) {
                showResult('Cut the fourth wire.');
            } else if (amountOf('red') == 1 && amountOf('yellow') > 1) {
                showResult('Cut the first wire.');
            } else if (!containsColor('black')) {
                showResult('Cut the second wire.');
            } else {
                showResult('Cut the first wire.');
            }
        } else if(numWires == 6) {
            if (!containsColor('yellow') && lastOdd) {
                showResult('Cut the third wire.');
            } else if (amountOf('yellow') == 1 && amountOf('white') > 1) {
                showResult('Cut the fourth wire.');
            } else if (!containsColor('red')) {
                showResult('Cut the last wire.')
            } else {
                showResult('Cut the fourth wire.')
            }
        }
    });

    function amountOf(color) {
        if(!containsColor(color)) {
            return 0;
        } else {
            let count = 0;
            for (let i = 0; i < colors.length; i++) {
                if(colors[i] == color) {
                    count++;
                }
            }
            return count;
        }
    }

    function containsColor(color) {
        for (let i = 0; i < colors.length; i++) {
            const element = colors[i];
            if(element == color) {
                return true;
            }
        }
        return false;
    }

    function lastIs(color) {
        return (colors[colors.length + 1] == color);
    }

    function showResult(result) {
        $('#resultContainer').fadeOut(200); 
        setTimeout(() => {
            $('#resultContainer').empty();
            $('#resultContainer').append(`<h5>Solution: ${result}</h5>`);
            $('#resultContainer').fadeIn(200); 
        }, 200);
               
    }
})
