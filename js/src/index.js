$(document).ready(function () {
    var game = new Game(),
        player = new Player();

    var cells = game.init();


    $('.table-cell')
        .hover(function () {
        $(this).addClass('animated tada');
    }, function () {
        $(this).removeClass('animated tada');
    })
        .click(function(){

            var currentCell = player.shot(cells[this.id],player.name);
            $(this).text(currentCell.state);

            var playerProgress = player.getProgress();
            if (game.checkWin(playerProgress)) {
                alert(player.name + " is win!");
            }
        });
    $('.game-user').click(function () {
        player.name = player.setUser(this.id);
    });

});