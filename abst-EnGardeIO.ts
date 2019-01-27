namespace engarde {

    export enum ActionType {

        ADV,//Advance
        RET,//Retreat
        ATT,//Attack, (THRUST!)
        AAA//Advance and Attack

    }

    export enum ReactionType {

        PRY,//Parry, (PARRY)!
        RET//Retreat

    }


    export interface Action {

        type: ActionType;
        cards: Card[];

    }

    export interface Reaction {

        type: ReactionType;
        cards: Card[];

    }

    export class EnGardeIO {

        curGame: Game;

        public constructor(){}

        public promptAction (p: Player) {} //abstract only
        public promptReaction (p: Player) {} //abstract only

        public buildAndSendAction (at: ActionType, c: Card[]) {
            let curAction = {type: at, cards:c};
            this.curGame.processAction(curAction);

        }
        public buildAndSendReaction (r: Reaction) {

            this.curGame.processReaction();

        }

        public readyPlayers(players: Player[]){

        public processResult(b: Game, a: Action, r?: Reaction){

            //TODO: Code here for IO-independent round result handling

        }

        public readyPlayers(pOne: Player, pTwo :Player){} //abstract only
        public readyGame (g:Game) {this.curGame=g}
        public readyRound() {} //abstract only
        public readyTurn() {} //abstract only

        

        

    }
}