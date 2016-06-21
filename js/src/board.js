var Board = {
    render: function (container) {
        var rowNumber = 3,
            cellNumber = 3,
            cellId = 0;

        var table = $("<table/>").addClass('game-board-table');
        for (var i = 0; i < rowNumber; i++) {
            var row = $("<tr/>");
            for (var j = 0; j < cellNumber; j++) {
                row.append($('<td/>', {id: cellId}).addClass('table-cell'));
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
            cells.push(new Cell(i, "not-clicked", cellWeight(i)));
        }
        return cells;
    }
};
