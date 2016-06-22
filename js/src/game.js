var Game = function () {
    var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    var human = Object.create(Player);
    var computer = Object.create(Computer);
    var board = Object.create(Board);
    var cells = board.createCells(winningCombinations);

    this.init = function () {
        board.render($('.game-board'));
    };

    this.setPlayers = function (choosenSymbol) {
        human.init(choosenSymbol);
        computer.init(human.name);
        //console.log("h: " + human.name + " , " + "c: " + computer.name);
    };

    this.getHuman = function () {
        return human.name;
    };

    this.getComputer = function () {
        return computer.name;
    };

    this.play = function (cell) {
        if (human.name != undefined) {
            cells[cell].state = human.name;
            human.shot(cell);
            human.hit(cell, winningCombinations,human.name, computer.hits);


            //console.log(JSON.stringify(cells));
            //console.log(human.progress);
            //console.log(JSON.stringify(human.hits));

            if (checkWin(human.hits)) {
                alert("Finish");
            } else {
                console.log("comp shot");
                $('#' + computer.shot(human.hits, computer.name)).text(computer.name);
            }
        } else {
            alert("Please choose the symbol");
        }
    };


    function checkWin(hitsInCombination) {
        var finish = false;
        /*hitsInCombination.forEach(function (hit) {
            if (hit.count == 3) {
                finish = true;
            }
        });*/
        return finish;
    }

};

