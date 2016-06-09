describe("board.js spec", function() {

var board;

    describe("when board is constructing",function(){

        beforeEach(function () {
            board = new Board();
        });

        it("should exist", function () {
           expect(board).toBeDefined();
        });

        it("should have table",function(){
           expect($('<table class="">'))
        });

    });

});