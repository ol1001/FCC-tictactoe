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
                row.append($('<td/>',{id:tdId}).addClass('table-cell'));
                tdId++;
            }
            table.append(row);
        }
        container.append(table);
    };

    this.constructCells = function() {
        for (var i = 0, cells = []; i < cellsNumber; i++) {
            cells.push({id: i, state: "not-clicked"});
        }
        return cells;
    }

};



