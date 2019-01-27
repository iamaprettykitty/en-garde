var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var engarde;
(function (engarde) {
    var ActionType;
    (function (ActionType) {
        ActionType[ActionType["ADV"] = 0] = "ADV";
        ActionType[ActionType["RET"] = 1] = "RET";
        ActionType[ActionType["ATT"] = 2] = "ATT";
        ActionType[ActionType["AAA"] = 3] = "AAA";
    })(ActionType = engarde.ActionType || (engarde.ActionType = {}));
    var ReactionType;
    (function (ReactionType) {
        ReactionType[ReactionType["PRY"] = 0] = "PRY";
        ReactionType[ReactionType["RET"] = 1] = "RET";
    })(ReactionType = engarde.ReactionType || (engarde.ReactionType = {}));
    var EnGardeIO = /** @class */ (function () {
        function EnGardeIO() {
        }
        EnGardeIO.prototype.promptAction = function (p) { };
        EnGardeIO.prototype.processAction = function (a) { };
        EnGardeIO.prototype.promptReaction = function (p) { };
        EnGardeIO.prototype.processReaction = function (r) { };
        EnGardeIO.prototype.updateBoard = function (b) { };
        EnGardeIO.prototype.showHand = function (h) { };
        EnGardeIO.prototype.readyPlayers = function (pOne, pTwo) { };
        return EnGardeIO;
    }());
    engarde.EnGardeIO = EnGardeIO;
})(engarde || (engarde = {}));
var engarde;
(function (engarde) {
    var BOARD_LENGTH = 23;
    var Board = /** @class */ (function () {
        function Board() {
            this.p1ScorePos = 0;
            this.p2ScorePos = 0;
            this.p1Loc = 1;
            this.p2Loc = 2;
        }
        Board.prototype.playerDistance = function () { return this.p1Loc - this.p2Loc; };
        return Board;
    }());
    engarde.Board = Board;
})(engarde || (engarde = {}));
var engarde;
(function (engarde) {
    var DrawResult;
    (function (DrawResult) {
        DrawResult[DrawResult["SUC"] = 0] = "SUC";
        DrawResult[DrawResult["END"] = 1] = "END";
        DrawResult[DrawResult["ERR"] = 2] = "ERR";
    })(DrawResult = engarde.DrawResult || (engarde.DrawResult = {}));
    var Deck = /** @class */ (function () {
        function Deck(drawDeck) {
            if (drawDeck === void 0) { drawDeck = false; }
            this.deckArray = [];
            if (drawDeck) {
                var curid = 1;
                for (var i = 1; i <= 5; i++) {
                    for (var j = 1; j <= 5; j++) {
                        var titleText = void 0;
                        switch (i) {
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
                        this.deckArray.push({ id: curid++, strength: i, title: titleText });
                    }
                }
            }
        }
        Deck.prototype.schawfulschawfulschawful = function () {
            this.shuffleDeck();
            this.shuffleDeck();
            this.shuffleDeck();
        };
        Deck.prototype.shuffleDeck = function () {
            var _a;
            // if it's 1 or 0 items, just return
            if (this.deckArray.length <= 1)
                return null;
            // For each index in array
            for (var i = 0; i < this.deckArray.length; i++) {
                var randomChoiceIndex = this.randomInt(0, this.deckArray.length - 1);
                // place our random choice in the spot by swapping
                _a = [this.deckArray[randomChoiceIndex], this.deckArray[i]], this.deckArray[i] = _a[0], this.deckArray[randomChoiceIndex] = _a[1];
            }
        };
        Deck.prototype.draw = function (hand, qty) {
            if (qty === void 0) { qty = 1; }
            for (var i = 0; i < qty; i++) {
                if (!hand.isFull() && this.deckArray.length > 0) {
                    hand.addCard(this.deckArray.pop());
                    if (this.deckArray.length > 0) {
                        return DrawResult.SUC;
                    }
                    else
                        return DrawResult.END;
                }
                else
                    return DrawResult.ERR;
            }
        };
        Deck.prototype.randomInt = function (low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        };
        Deck.prototype.toString = function (showtitle) {
            if (showtitle === void 0) { showtitle = false; }
            var returnString = "";
            for (var i = 0; i < this.deckArray.length; i++) {
                if (showtitle)
                    returnString = returnString + "[" + this.deckArray[i].title + "], " + '\n';
                else
                    returnString = returnString + "[" + this.deckArray[i].strength.toString() + "], " + '\n';
            }
            return returnString;
        };
        Deck.prototype.deal = function (numCards, hands) {
            for (var i = 0; i < numCards; i++) {
                for (var j = 0; j < hands.length; j++) {
                    hands[j].addCard(this.deckArray.pop());
                }
            }
        };
        return Deck;
    }());
    engarde.Deck = Deck;
})(engarde || (engarde = {}));
var engarde;
(function (engarde) {
    var Game = /** @class */ (function () {
        function Game(level, egio) {
            this.egio = egio;
            this.level = level;
            this.round = 1;
            this.board = new engarde.Board();
            this.drawDeck = new engarde.Deck(true);
            this.discardDeck = new engarde.Deck();
            this.curPlayer = 0;
            this.drawDeck.schawfulschawfulschawful();
            console.log(this.drawDeck.toString(true));
            this.drawDeck.deal(engarde.MAX_HAND_SIZE, [this.pOne.getHand(), this.pTwo.getHand()]);
            console.log(this.drawDeck.toString(true));
            egio.updateBoard(this.board);
        }
        Game.prototype.start = function () {
            this.startTurn(this.pOne);
        };
        Game.prototype.collectCards = function () {
        };
        Game.prototype.nextTurn = function () {
        };
        Game.prototype.startTurn = function (player) {
            this.collectCards();
            this.drawDeck.schawfulschawfulschawful();
        };
        return Game;
    }());
    engarde.Game = Game;
})(engarde || (engarde = {}));
var engarde;
(function (engarde) {
    engarde.MAX_HAND_SIZE = 5;
    var Hand = /** @class */ (function () {
        function Hand() {
            this.cards = [];
        }
        Hand.prototype.addCard = function (card) {
            this.cards.push(card);
        };
        Hand.prototype.isFull = function () {
            if (this.cards.length >= engarde.MAX_HAND_SIZE)
                return true;
            else
                return false;
        };
        Hand.prototype.toString = function (showtitle) {
            if (showtitle === void 0) { showtitle = false; }
            var returnString = "";
            for (var i = 0; i < this.cards.length; i++) {
                if (showtitle)
                    returnString = returnString + "[" + this.cards[i].title + "], ";
                else
                    returnString = returnString + "[" + this.cards[i].strength.toString() + "], ";
            }
            return returnString;
        };
        return Hand;
    }());
    engarde.Hand = Hand;
})(engarde || (engarde = {}));
// namespace engarde {
//     class Startup {
//         public static main(): number {
//             console.log('testtesttest');
//             let testObj2 = new TestClass();
//             console.log(testObj2.getTestNum2());
//             let testObj = new cmdEnGarde();
//             console.log(testObj.getTestNum())
//             return 0;
//         }
//     }
//         class TestClass {
//             testNum2: number;
//             constructor() {
//                 this.testNum2 = 101010111101;
//             }
//             getTestNum2() {
//                 return this.testNum2;
//             }
//         }
// Startup.main();
// }
var engarde;
(function (engarde) {
    var Player = /** @class */ (function () {
        function Player() {
            this.hand = new engarde.Hand();
        }
        Player.prototype.getName = function () {
            return this.name;
        };
        Player.prototype.setName = function (n) {
            this.name = n;
        };
        Player.prototype.getHand = function () {
            return this.hand;
        };
        return Player;
    }());
    engarde.Player = Player;
})(engarde || (engarde = {}));
var engarde;
(function (engarde) {
    var CmdEnGardeIO = /** @class */ (function (_super) {
        __extends(CmdEnGardeIO, _super);
        function CmdEnGardeIO() {
            return _super.call(this) || this;
        }
        CmdEnGardeIO.prototype.promptAction = function (p) {
            this.getCmdLineInput();
        };
        CmdEnGardeIO.prototype.getCmdLineInput = function () {
            var retString;
            var stdin = process.openStdin();
            stdin.addListener("data", function (d) { retString = d.toString().trim(); });
            return retString;
        };
        CmdEnGardeIO.prototype.processAction = function (a) {
        };
        CmdEnGardeIO.prototype.promptReaction = function (p) { };
        CmdEnGardeIO.prototype.processReaction = function (r) { };
        CmdEnGardeIO.prototype.updateBoard = function (b) { };
        CmdEnGardeIO.prototype.showHand = function (h) { };
        CmdEnGardeIO.prototype.showDeck = function () { };
        CmdEnGardeIO.prototype.refreshScreen = function () { };
        CmdEnGardeIO.prototype.clearScreen = function () {
            process.stdout.write('\033c');
        };
        CmdEnGardeIO.prototype.readyPlayers = function (pOne, pTwo) {
        };
        CmdEnGardeIO.prototype.promptTurnStart = function (player) {
            process.stdout.write('Ready ' + player.getName() + '\nPress Enter To Show Hand');
        };
        CmdEnGardeIO.prototype.promptGameEnd = function (winner) {
            process.stdout.write('Game Over');
        };
        return CmdEnGardeIO;
    }(engarde.EnGardeIO));
    engarde.CmdEnGardeIO = CmdEnGardeIO;
})(engarde || (engarde = {}));
var engarde;
(function (engarde) {
    var cmdEnGarde = /** @class */ (function () {
        function cmdEnGarde() {
        }
        cmdEnGarde.main = function () {
            var egio = new engarde.CmdEnGardeIO;
            var pOne = new engarde.Player();
            egio.clearScreen();
            var game = new engarde.Game(0, egio);
            game.start();
        };
        return cmdEnGarde;
    }());
    cmdEnGarde.main();
})(engarde || (engarde = {}));
