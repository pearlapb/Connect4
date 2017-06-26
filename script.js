// STILL TO DO:
/*
2/ Add GAMEPLAY Animation (only have cat for now)
3/ Make all my checking functions more concise... Try doing it by slots?
*/

(function() {

    startGame();

    function startGame() {

        // ASK FOR PLAYER'S NAMES
        alert('New Game?');
        var p1 = prompt('Player1 Name');
        var p2 = prompt('Player2 Name');
        $('#checker').css({
            color: 'white'
        }).html(p1.slice(0,1).toUpperCase());

        //CHANGING PLAYERS
        var currentPlayer = 1;
        function playerChange() {
            if (currentPlayer == 1) {
                currentPlayer = 2;
                $('#checker').css({
                    backgroundColor: 'Orange',
                    boxShadow: '0 10px DarkOrange',
                    color: 'black'
                }).html(p2.slice(0,1).toUpperCase());
            } else {
                currentPlayer = 1;
                $('#checker').css({
                    backgroundColor: 'FireBrick',
                    boxShadow: '0 10px DarkRed',
                    color: 'white'
                }).html(p1.slice(0,1).toUpperCase());
            }
        }

        //CLICK EVENT TO LET GO OF CHECKER
        $('.col').on('click', function(e) {
            var currentSlot = $(e.currentTarget).children().last();
            while (currentSlot.length) { //while there still is a currentSlot
                if (!(currentSlot.hasClass('fill'))) { //if the current slot does not have class fill...
                    fill(); // fill it
                    break; // and stop the loop
                } else { // if it does have fill
                    currentSlot = currentSlot.prev(); // go the the slot above it
                }
            }
            checkWinner();
            playerChange();

            // DECLARING MY FUNCTIONS: FILL & CHECKWIN
            function fill() {
                if (currentPlayer == 1) {
                    currentSlot.addClass('fill p1');
                } else {
                    currentSlot.addClass('fill p2');
                }

            }

            // WRITE MY WINNER FUNCTION
            function checkWinner() {

                // CALL ALL MY FUNCTIONS
                checkCol();
                checkRow();
                checkDiagDown();
                checkDiagUp();

                function animation() {
                    $('#nyan-cat').animate({
                        left: '200%'
                    }, 2000);
                }

                // FUNCTION FOR CHECK COLUMNS
                function checkCol() {
                    var col = $('.col');
                    for (var i = 0; i < col.length; i++) { // loop through all my columns
                        var slots = col.eq(i).find('div');
                        var seq = '';
                        for (var j = 0; j < slots.length; j++) { //loop through all the slots in one column
                            if (slots.eq(j).hasClass('p1')) {
                                seq += '1';
                            } else if (slots.eq(j).hasClass('p2')) {
                                seq += '2';
                            } else {
                                seq += '0';
                            }
                        }
                        if (seq.indexOf('1111') > - 1) {
                            animation();
                            setTimeout(function() {
                                alert(`${p1} wins!`);
                                document.location.reload(true);
                            }, 2000);
                        } else if (seq.indexOf('2222') > - 1) {
                            animation();
                            setTimeout(function() {
                                alert(`${p2} wins!`);
                                document.location.reload(true);
                            }, 2000);
                        }
                    }
                }

                // CHECK ROWS
                function checkRow() {
                    for (var i = 0; i < 7; i++) {
                        var row = $(`.row${i}`);
                        var seq = '';
                        for (var j = 0; j < row.length; j++) {
                            if (row.eq(j).hasClass('p1')) {
                                seq += '1';
                            } else if (row.eq(j).hasClass('p2')) {
                                seq += '2';
                            } else {
                                seq += '0'; // added this so that it wouldn't say win for 4 in a row with blank spaces.
                            }
                        }
                        if (seq.indexOf('1111') > - 1) {
                            animation();
                            setTimeout(function() {
                                alert(`${p1} wins!`);
                                document.location.reload(true);
                            }, 2000);
                        } else if (seq.indexOf('2222') > - 1) {
                            animation();
                            setTimeout(function() {
                                alert(`${p1} wins!`);
                                document.location.reload(true);
                            }, 2000);
                        }
                    }
                }

                // CHECK DIAGONALS DOWN & UP
                function checkDiagDown() {
                    for (var i = 0; i < 7; i++) {
                        var row = $(`.row${i}`);
                        for (var j = 0; j < row.length; j++) {
                            if ($(`.row${i}`).eq(j).hasClass('p1') && $(`.row${i+1}`).eq(j+1).hasClass('p1') && $(`.row${i+2}`).eq(j+2).hasClass('p1') && $(`.row${i+3}`).eq(j+3).hasClass('p1')) {
                                animation();
                                setTimeout(function() {
                                    alert(`${p1} wins!`);
                                    document.location.reload(true);
                                }, 2000);
                            } else if ($(`.row${i}`).eq(j).hasClass('p2') && $(`.row${i+1}`).eq(j+1).hasClass('p2') && $(`.row${i+2}`).eq(j+2).hasClass('p2') && $(`.row${i+3}`).eq(j+3).hasClass('p2')) {
                                animation();
                                setTimeout(function() {
                                    alert(`${p1} wins!`);
                                    document.location.reload(true);
                                }, 2000);
                            }
                        }
                    }
                }
                function checkDiagUp() {
                    for (var i = 0; i < 7; i++) {
                        var row = $(`.row${i}`);
                        for (var j = 0; j < row.length; j++) {
                            if ($(`.row${i}`).eq(j).hasClass('p1') && $(`.row${i-1}`).eq(j+1).hasClass('p1') && $(`.row${i-2}`).eq(j+2).hasClass('p1') && $(`.row${i-3}`).eq(j+3).hasClass('p1')) {
                                animation();
                                setTimeout(function() {
                                    alert(`${p1} wins!`);
                                    document.location.reload(true);
                                }, 2000);
                            } else if ($(`.row${i}`).eq(j).hasClass('p2') && $(`.row${i-1}`).eq(j+1).hasClass('p2') && $(`.row${i-2}`).eq(j+2).hasClass('p2') && $(`.row${i-3}`).eq(j+3).hasClass('p2')) {
                                animation();
                                setTimeout(function() {
                                    alert(`${p1} wins!`);
                                    document.location.reload(true);
                                }, 2000);
                            }
                        }
                    }
                }
            }

        }).on('mouseover', function(e) {
            $(e.currentTarget).children().css({
                opacity: '0.7'
            });
        }).on('mouseout', function(e) {
            $(e.currentTarget).children().css({
                opacity: '1'
            });
        });
    }

    // CHECKER FOLLOWS MOUSE
    document.addEventListener('mousemove', function moveChecker(e) {
        var checker = document.getElementById('checker');
        var x = e.clientX;
        var y = e.clientY;
        checker.style.left =  x + 'px';
        checker.style.top = y + 'px';
        checker.style.transform = 'translate(-100%, -100%)';
    });

})();
