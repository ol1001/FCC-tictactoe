var Game = function () {
    var board = new Board();

    this.init = function () {
        board.render();
        return board.constructCells();
    };

    this.checkWin = function (player) {
        var finish = false;
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
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

