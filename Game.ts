namespace engarde {

    export class Game {

        id: number;

        level: number;

        players: Player[];

        curPlayer: number;
        dealer: number;

        roundStartPlayer: number;

        round: number;

        board: Board;
        drawDeck: Deck;
        discardDeck: Deck;

        egio: EnGardeIO;

        constructor(level: number, egio: EnGardeIO){

            this.egio = egio;
            this.reset(level);
            this.egio.readyPlayers(this.players);

        }

        reset(level: number){

            this.level = level;
            this.round = 1;
            this.board = new Board();
            this.drawDeck = new Deck(true);
            this.discardDeck = new Deck();
            this.curPlayer = 0;
            this.roundStartPlayer = 0;
            this.dealer = 1;

        }

        startGame() {

            this.egio.readyGame(this);
            this.startRound(this.players[0]);

        }

        startRound(startPlayer: Player) {

            this.drawDeck.schawfulschawfulschawful();
            this.drawDeck.deal(MAX_HAND_SIZE,[this.players[this.roundStartPlayer].getHand(), this.players[this.dealer].getHand()]);
            this.egio.readyRound();
            this.startTurn(startPlayer);
        }


        startTurn(player: Player){

            this.egio.readyTurn();
            this.egio.promptAction(player);

        }


        public processAction(action: Action){

            

        }

        
        processReaction(reaction: Reaction){



        }


        processTurnResult(){



        }


        collectCards(){

            for(let i: number = 0; i< this.players.length; i++){

                let dumpHand = this.players[i].getHand().dump();
                this.drawDeck.addCards(dumpHand);

            }
        }


        nextTurn(){

            if (this.curPlayer = 0){

                this.curPlayer = 1;

            }
            else {

                this.curPlayer = 0;

            }
                
            this.startTurn(this.players[this.curPlayer]);

        }

        
        nextRound() {

            this.collectCards();
            this.curPlayer++;
            if( this.curPlayer > 1 ) this.curPlayer = 0;

        }


        public publicGetCurrentPlayer(): Player {
            
            return this.players[this.curPlayer];
        }
    }
}