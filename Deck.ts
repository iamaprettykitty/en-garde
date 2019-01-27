namespace engarde {

    export enum DrawResult {

        SUC,
        END,
        ERR

    }

    export interface Card {

        id: number;
        strength: number;
        title?: string;

    }


    export class Deck {

        deckArray: Card[];

        constructor (drawDeck: boolean = false){

            this.deckArray = [];

            if (drawDeck){

                let curid: number = 1;

                for (let i=1; i <= 5; i++) {
                    for (let j=1; j <= 5; j++) {

                        let titleText: string;
                        switch(i) { 
                            case 1: { 
                            titleText = "One #" + j; 
                            break; 
                            } 
                            case 2: { 
                                titleText = "Two #" + j; 
                            break; 
                            } 
                            case 3: { 
                                titleText = "Three #" + j;
                                break; 
                            }
                            case 4: { 
                                titleText = "Four #" + j;
                                break; 
                            }
                            case 5: { 
                                titleText = "Five #" + j;
                                break; 
                            } 
                        } 
                        this.deckArray.push({id: curid++, strength: i, title: titleText})
                    }
                }
                
            }
            
        }

        public schawfulschawfulschawful(){
            this.shuffleDeck();
            this.shuffleDeck();
            this.shuffleDeck();
        }

        private shuffleDeck(){
            // if it's 1 or 0 items, just return
            if (this.deckArray.length <= 1) return null;
    
            // For each index in array
            for (let i = 0; i < this.deckArray.length; i++) {
    
                const randomChoiceIndex = this.randomInt(0, this.deckArray.length - 1);
    
                // place our random choice in the spot by swapping
                [this.deckArray[i], this.deckArray[randomChoiceIndex]] = [this.deckArray[randomChoiceIndex], this.deckArray[i]];
            }
    
            
        }

        public draw(hand: Hand, qty: number = 1):DrawResult{

            for (let i = 0; i < qty; i++){
                if (!hand.isFull() && this.deckArray.length > 0 ) {
                    hand.addCard(this.deckArray.pop());
                    if (this.deckArray.length > 0) {
                        return DrawResult.SUC;
                    }
                    else return DrawResult.END;
                }
                else return DrawResult.ERR
            }
        }

        public randomInt(low: number, high:number): number {
            return Math.floor(Math.random() * (high - low) + low)
        }

        public toString(showtitle: boolean = false): string {
            let returnString: string = "";
            for (let i=0; i <this.deckArray.length; i++) {
                if (showtitle)
                    returnString = returnString + "[" + this.deckArray[i].title + "], " + '\n'
                else
                    returnString = returnString + "[" + this.deckArray[i].strength.toString() + "], " + '\n'
            }
            return returnString;
        }

        public deal(numCards: number, hands: Hand[]){

            for (let i = 0; i<numCards;i++){

                for (let j = 0; j<hands.length;j++){

                    hands[j].addCard(this.deckArray.pop());

                }
                
            }
        }

        public addCards(cards: Card[]){
            this.deckArray = this.deckArray.concat(cards);
        }
    }

}