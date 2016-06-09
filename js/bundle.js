var Board = function () {
    var container = $('.game-board'),
        rowNumber = 3,
        tdNumberInRow = 3,
        tdId = 0,
        cellsNumber = 9;

    this.render = function () {
        var table = $("<table/>").addClass('game-board-table');
        for (var i = 0; i < rowNumber; i++) {
            var row = $("<tr/>");
            for (var j = 0; j < tdNumberInRow; j++) {
                row.append($('<td/>', { id: tdId }).addClass('table-cell'));
                tdId++;
            }
            table.append(row);
        }
        container.append(table);
    };

    this.constructCells = function () {
        for (var i = 0, cells = []; i < cellsNumber; i++) {
            cells.push({ id: i, state: "not-clicked" });
        }
        return cells;
    };
};
var Game = function () {
    var board = new Board();

    this.init = function () {
        board.render();
        return board.constructCells();
    };

    this.checkWin = function (player) {
        var finish = false;
        var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        player.sort();

        winningCombinations.forEach(function (combination) {
            var count = 0;
            player.forEach(function (value) {
                if (combination.indexOf(value) >= 0) {
                    count++;
                }
            });
            if (count == 3) {
                finish = true;
            }
        });
        return finish;
    };
};
$(document).ready(function () {
    var game = new Game(),
        player = new Player();

    var cells = game.init();

    $('.table-cell').hover(function () {
        $(this).addClass('animated tada');
    }, function () {
        $(this).removeClass('animated tada');
    }).click(function () {

        var currentCell = player.shot(cells[this.id], player.name);
        $(this).text(currentCell.state);

        var playerProgress = player.getProgress();
        if (game.checkWin(playerProgress)) {
            alert(player.name + " is win!");
        }
    });
    $('.game-user').click(function () {
        player.name = player.setUser(this.id);
        console.log(player.name);
    });
    /*$('.game-user').click(function () {
        var playerId = this.id;
       player.name = playerId;
    });*/
});
var Player = function () {
    var progress = [];
    //this.name = name;

    this.shot = function (cell, name) {
        cell.state = name;
        progress.push(cell.id);
        return cell;
    };

    this.getProgress = function () {
        return progress;
    };

    this.setUser = function (name) {
        return name;
    };
};
