var Player = {
    progress: [],
    shot: function (cell) {
        this.progress.push(parseInt(cell));
        return this.progress;
    }
};
