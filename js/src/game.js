var Game = function () {
    var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    this.human = Object.create(Player);
    this.computer = Object.create(Player);
    this.board = Object.create(Board);

    var cells = this.board.createCells(winningCombinations);

    this.init = function () {
        this.board.render($('.game-board'));
    };

    this.players = function (choosenSymbol) {
        this.human.name = choosenSymbol;
        this.computer.name = (choosenSymbol == "x") ? "o" : "x";
    };

    this.play = function (player, cell) {
        if (player != undefined) {
            cells[cell].state = player;

            var playerProgress = this.human.shot(cell);
            console.log(playerProgress);
            var playerHits = analyzePlayerShots(playerProgress);

            if (checkWin(playerHits)) {
                alert("Finish");
            } else {
                $('#' + computerShot(playerHits, this.computer.name)).text(this.computer.name);
            }
        } else {
            alert("Please choose the player");
        }
    };

    function checkWin(hitsInCombination) {
        var finish = false;
        hitsInCombination.forEach(function (hit) {
            if (hit.count == 3) {
                finish = true;
            }
        });
        return finish;
    }

    function analyzePlayerShots(playerProgress) {
        var hitsInCombination = [];
        winningCombinations.forEach(function (combination) {
            var count = 0;
            playerProgress.forEach(function (value) {
                if (combination.indexOf(value) >= 0) {
                    return count++;
                }
            });
            if (count > 0) {
                hitsInCombination.push({count: count, combination: combination});
            }
        });
        return hitsInCombination;
    }

    function computerShot(hitsInCombination, computerName) {
        var potentialShots = [];

        for (var i = 0; i < hitsInCombination.length; i++) {
            if (hitsInCombination[i].count == 2) {
                var freeCell = hitsInCombination[i].combination.filter(checkIsFree);
                cells[freeCell].state = computerName;
                winningCombinations.splice(winningCombinations.indexOf(hitsInCombination[i].combination), 1);
                return freeCell;
            }
            var freeCells = hitsInCombination[i].combination.filter(checkIsFree);
            freeCells.forEach(function (freeCell) {
                potentialShots.push({id: cells[freeCell].id, weight: cells[freeCell].weight});
            });

        }
        var shotId = detectShotWithMaxWeight(potentialShots);
        cells[shotId].state = computerName;
        return shotId;
    }

    function checkIsFree(cell) {
        if (cells[cell].state == "not-clicked") return cells[cell];
    }

    function detectShotWithMaxWeight(potentialShots) {
        var max = potentialShots.reduce(function (a, b) {
            return a.weight > b.weight ? a : b;
        });
        return max.id;
    }

};

