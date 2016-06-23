var Game = function () {
    var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    var board = Object.create(Board);
    var cellsWeight = board.createCells(winningCombinations);

    this.init = function () {
        board.render($('.game-board'));
    };
    var human = Object.create(Player),
        computer = Object.create(Player);

    this.setPlayers = function (choosenSymbol) {
        human.init(choosenSymbol, winningCombinations, "human");
        computer.init((choosenSymbol == "x") ? "o" : "x", winningCombinations, "computer");
    };
    this.getHuman = function () {
        return human.name;
    };
    this.getComputer = function () {
        return computer.name;
    };
    this.play = function (cellId) {
        if (human.name != undefined) {

            human.shot(cellId, computer.progress);
            $('#' + computer.shot(computer.analyze(human.progress, cellsWeight), human.progress)).text(computer.name);
            console.log(JSON.stringify(computer.progress));

        } else {
            alert("Choose the symbol");
        }
    }

};
/*
 function checkWin(hitsInCombination) {
 var finish = false;
 hitsInCombination.forEach(function (hit) {
 if (hit.count == 3) {
 finish = true;
 }
 });
 return finish;
 }
 };
 */