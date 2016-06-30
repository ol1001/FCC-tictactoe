$(document).ready(function () {
    var game = new Game();
    game.init();

    $('.game-user').click(function () {
        game.setPlayers(this.id);
        $('.choose-user').hide(250);
    });

    $('.table-cell').click(function () {
        $(this).text(game.getHuman());
        game.play(this.id);
    });
    $('.game-refresh').click(function () {
        location.reload();
    });
});



