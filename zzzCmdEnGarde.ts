namespace engarde {
    class cmdEnGarde{
        public static main(): void {
            
            let game: Game;
            let egio: CmdEnGardeIO = new CmdEnGardeIO();
            let pOne: Player = new Player()
            egio.clearScreen();
            game= new Game(0,egio);
            egio.readyGame(game);
            egio.clearScreen();
            egio.getCmdLineInput("Press Enter to Begin Game");
            game.startGame();

        }
    }

    cmdEnGarde.main();

}