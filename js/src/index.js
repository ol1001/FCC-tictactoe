$(document).ready(function () {
    var game = new Game();
    game.init();

    $('.game-user').click(function () {
        game.players(this.id);
        $('.choose-user').hide(250);
    });

    $('.table-cell').click(function () {
        $(this).text(game.human.name);
        game.play(game.human.name,this.id);
    });
});