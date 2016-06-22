var Player = {
    progress: [],
    hits: [],
    init: function (name) {
        this.name = name;
    },
    shot: function (cell) {
        this.cell = cell;
        this.progress.push(parseInt(this.cell));
    },

    hit: function (cell, winningCombinations, name, computerHits) {
        this.hits = computerHits;

        for (var i = 0; i < winningCombinations.length; i++) {
            var indexCell = winningCombinations[i].indexOf(Number(cell));

            if (indexCell >= 0) {
                var indexHits = isExists(this.hits, winningCombinations[i]);
                if (indexHits != undefined) {
                    // console.log("index hits" + indexHits);
                    this.hits[indexHits].count++;
                    this.hits[indexHits].combination[cell] = name;
                    //console.log(this.hits[indexHits]);
                } else {
                    var combination = {};
                    winningCombinations[i].forEach(function (cellInCombination) {
                        if (cellInCombination != Number(cell)) {
                            combination[cellInCombination] = "not-clicked";
                        } else {
                            combination[cellInCombination] = name;
                        }
                    });
                    this.hits.push({count: 1, combination: combination});
                }
            }
        }

        function isExists(array, value) {

            for (var i = 0; i < array.length; i++) {
                var trueCounter = 0;
                for (var j = 0; j < value.length; j++) {
                    if (array[i].combination.hasOwnProperty(value[j])) {
                        trueCounter++;
                    }

                }
                if (trueCounter == 3) {
                    //console.log(value);
                    return i;
                }
            }

        }

    }

};
