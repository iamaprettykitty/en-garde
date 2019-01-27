namespace engarde {

    export class CmdEnGardeIO extends EnGardeIO {


        constructor(){

            super();

        }

        public promptAction(p: Player) {
            this.getCmdLineInput();
        }



        public getCmdLineInput(prompt?: string): string {
            process.stdout.write(prompt);
            let retString: string;
            var stdin = process.openStdin();
            stdin.addListener("data", function(d) {retString = d.toString().trim();});
            return retString;
        }

        public processAction(a: Action) {

        }

        public roundStartIO() {

        }

        public promptReaction(p: Player) {}

        public processReaction(r: Reaction) {}

        public updateBoard(game: Game){

            process.stdout.write(game.publicGetCurrentPlayer().getName());

        }

        

        public showHand (h: Hand){}

        public showDeck(){}

        public refreshScreen(){}

        public clearScreen(){
            process.stdout.write('\033c');
        }

        public readyPlayers(players: Player[]){


            players[0].setName(this.getCmdLineInput('Player One Name:'));
            players[1].setName(this.getCmdLineInput('Player Two Name:'));

        }

        public promptTurnStart(player: Player){
            process.stdout.write('Ready ' + player.getName() + '\nPress Enter To Show Hand');
        }

        public promptGameEnd(winner: Player){
            process.stdout.write('Game Over');
        }

        public pressEnterPrompt(){
            process.stdout.write('Press Enter to Continue');
            this.getCmdLineInput();
        }
        
    }
}

