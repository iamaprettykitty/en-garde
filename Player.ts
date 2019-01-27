namespace engarde {

    export class Player {

        private name: string;
        public hand: Hand;

        constructor(){
            this.hand = new Hand();
        }

        public getName(): string{
            return this.name;
        }

        public setName(n: string){
            this.name = n;
        }

        public getHand(): Hand{
            return this.hand;
        }
    }
}