var Game = function () {
    var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ],
        activeCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var board = Object.create(Board);
    var cells = board.createCells(winningCombinations);

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
            updateActiveCells(cellId);
            if (isWin(human.progress, human.name) || activeCells.length == 0) {
                location.reload();
            } else {
                var computerChoice = computer.shot(computer.analyze(human.progress, cells), human.progress);
                $('#' + computerChoice).text(computer.name);
                updateActiveCells(computerChoice);
                if (isWin(computer.progress, computer.name) || activeCells.length == 0) {
                    location.reload();
                }
            }
        } else {
            alert("Choose the symbol");
        }
    };

    function isWin(progress, player) {
        var finish = false;
        progress.forEach(function (progressCombination) {
            var count = 0;
            var combination = progressCombination.combination;
            for (var key in combination) {
                if (combination[key] == player) {
                    count++;
                }
            }
            if (count == 3) {
                alert(player + " is won!");
                finish = true;
            }
        });
        return finish;
    }

    function updateActiveCells(cellId) {
        var i = activeCells.indexOf(Number(cellId));
        if (i != -1) {
            activeCells.splice(i, 1);
        }
    }
};
