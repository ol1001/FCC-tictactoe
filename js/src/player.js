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

    this.setUser = function (name){
            return name;
    }
};
