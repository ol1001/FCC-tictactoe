var Computer = {
    progress: [],
    hits: [],
    init: function (player) {
        this.progress = [];
        this.name = (player == "x") ? "o" : "x";
    },
    shot: function (humanHits, name) {
        this.hits = humanHits;
        var potentialShots = [];

        for (var i = 0; i < this.hits.length; i++) {
            if (this.hits[i].count == 2) {
                for (var key in this.hits[i].combination) {
                    if (this.hits[i].combination[key] == "not-clicked" && humanHits[i].combination.hasOwnProperty(key)) {
                        this.hits[i].combination[key] = name;
                        return key;
                    }
                }
            } else if (this.hits[i].count == 1) {
                for (var key in this.hits[i].combination){
                    if (this.hits[i].combination[key] == "not-clicked" && humanHits[i].combination.hasOwnProperty(key)){
                        potentialShots.push(Number(key));
                    }
                }
            }
        }
        console.log(potentialShots);
    }


};
