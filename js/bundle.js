var Board = {
    render: function (container) {
        var rowNumber = 3,
            cellNumber = 3,
            cellId = 0;

        var table = $("<table/>").addClass('game-board-table');
        for (var i = 0; i < rowNumber; i++) {
            var row = $("<tr/>");
            for (var j = 0; j < cellNumber; j++) {
                row.append($('<td/>', { id: cellId }).addClass('table-cell'));
                cellId++;
                Object.create(Cell);
            }
            table.append(row);
        }
        container.append(table);
        console.log("board created");
    },
    createCells: function (winningCombinations) {
        function cellWeight(id) {
            var weight = 0;
            winningCombinations.forEach(function (combination) {
                if (combination.indexOf(id) >= 0) {
                    weight++;
                }
            });
            return weight;
        }

        for (var i = 0, cells = []; i < 9; i++) {
            cells.push(new Cell(i, cellWeight(i)));
        }
        return cells;
    }
};
var Cell = function (id, weight) {
    this.id = id;
    this.weight = weight;
};
var Game = function () {
    var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
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
        computer.init(choosenSymbol == "x" ? "o" : "x", winningCombinations, "computer");
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
$(document).ready(function () {
    var game = new Game();
    game.init();

    $('.game-user').click(function () {
        game.setPlayers(this.id);
        $('.choose-user').hide(250);
    });

    $('.table-cell').click(function () {
        $(this).text(game.getHuman());
        game.play(this.id);
    });
    $('.game-refresh').click(function () {
        location.reload();
    });
});
var Player = {
    init: function (name, winningCombinations, player) {
        this.name = name;
        this.player = player;
        this.progress = function (combinations) {
            var _progress = [];
            for (var i = 0; i < combinations.length; i++) {
                var currentCombination = combinations[i],
                    progressCombination = {};
                for (var j = 0; j < currentCombination.length; j++) {
                    progressCombination[currentCombination[j]] = "not-clicked";
                }
                _progress.push({ count: 0, combination: progressCombination });
            }
            return _progress;
        }(winningCombinations);
    },

    analyze: function (progress, cellsWeight) {
        var countAndIndex = checkCount(progress);

        if (countAndIndex.count == 2) {
            return countAndIndex.potentialShots;
        } else {
            var bestShot = detectShotWithMaxWeight(countAndIndex.potentialShots);
            return bestShot.cellId;
        }

        function checkCount(progress) {
            var potentialShots = [];

            for (var i = 0; i < progress.length; i++) {
                if (progress[i].count == 2) {
                    for (var key in progress[i].combination) {
                        if (progress[i].combination[key] == "not-clicked") {
                            return { count: 2, potentialShots: key };
                        }
                    }
                }
            }
            for (var j = 0; j < progress.length; j++) {
                if (progress[j].count == 1) {
                    for (var key in progress[j].combination) {
                        if (progress[j].combination[key] == "not-clicked") {
                            potentialShots.push({
                                cellId: cellsWeight[Number(key)].id,
                                cellWeight: cellsWeight[Number(key)].weight
                            });
                        }
                    }
                }
            }
            return { count: 1, potentialShots: potentialShots };
        }

        function detectShotWithMaxWeight(potentialShots) {
            return potentialShots.reduce(function (a, b) {
                return a.cellWeight > b.cellWeight ? a : b;
            });
        }
    },

    shot: function (cellId, progress) {
        this.hit(cellId, progress, this.name);
        return cellId;
    },

    hit: function (cellId, progress, name) {
        this.progress = progress;

        for (var i = 0; i < this.progress.length; i++) {
            for (var key in this.progress[i].combination) {
                if (key == Number(cellId)) {
                    this.progress[i].combination[key] = name;
                    if (this.player == "human") {
                        this.progress[i].count++;
                    }
                }
            }
        }
    }
};
