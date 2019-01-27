namespace engarde {

    export const MAX_HAND_SIZE = 5;

    export class Hand {
        
        cards: Card[];

        constructor() {
            this.cards = [];
        }

        addCard(card: Card){
            this.cards.push(card);
        }

        isFull(): boolean{
            if (this.cards.length >= MAX_HAND_SIZE) return true;
            else return false;
        }

        public toString(showtitle: boolean = false): string {
            let returnString: string = "";
            for (let i=0; i <this.cards.length; i++) {
                if (showtitle)
                    returnString = returnString + "[" + this.cards[i].title + "], "
                else
                    returnString = returnString + "[" + this.cards[i].strength.toString() + "], "
            }
            return returnString;
        }

        public dump(): Card[]{
            let returnArray = [];
            while (this.cards.length > 0){
                returnArray.push(this.cards.pop());
            }
            return returnArray;
        }


    }

}