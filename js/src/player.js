var Player = {
    init: function (name, winningCombinations, player) {
        this.name = name;
        this.player = player;
        this.progress = (function (combinations) {
            var _progress = [];
            for (var i = 0; i < combinations.length; i++) {
                var currentCombination = combinations[i],
                    progressCombination = {};
                for (var j = 0; j < currentCombination.length; j++) {
                    progressCombination[currentCombination[j]] = "not-clicked";
                }
                _progress.push({count: 0, combination: progressCombination});
            }
            return _progress;
        })(winningCombinations);
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
                            return {count: 2, potentialShots: key};
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
            return {count: 1, potentialShots: potentialShots};
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