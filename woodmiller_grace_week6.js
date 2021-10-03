// -	Deal 26 Cards to two Players from a Deck. 
// -	Iterate through the turns where each Player plays a Card
// -	The Player who played the higher card is awarded a point
// -	Ties result in zero points for either Player
// -	After all cards have been played, display the score.


class CardError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class Card {
    static cardNum = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
    static suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    
    constructor(cardNums, suit) {
        this.cardNums = cardNums;
        this.suit = suit;
    }

    equals(c) {
        if (!(c instanceof Card)) {
            throw new CardError("input to Card.equals is not a Card");
        }
        return this.cardNums === c.cardNums && this.suit === c.suit;
    }

    beats(c) {
        let ourValue = Card.cardNum.indexOf(this.cardNums);
        let theirvalue = Card.cardNum.indexOf(c.cardNums);
        return ourValue > theirvalue;
    }

    description() {
        return Card.cardNum[this.cardNums - 1] + " of " + Card.suits[this.suit];
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.populate();
    }

    populate() {
        for (let i = 0; i < Card.suits.length; i++) {
            let suit = Card.suits[i];
            for (let j = 0; j < Card.cardNum.length; j++) {
                let cardNum = Card.cardNum[j];
                this.cards.push(new Card(cardNum, suit));
            }
        }
    }

    report() {
        console.log("The deck:");
        for (let card of this.cards) {
            console.log(card.description());
        }
    }

    shuffle() {
        for (let i = 0; i < this.cards.length; i++) {
            let shuff = Math.trunc(Math.random() * this.cards.length);
            let temp = this.cards[shuff];
            this.cards[shuff] = this.cards[i];
            this.cards[i] = temp;
        }
    }


    dealAlltoPlayers(players) {
        while (this.cards.length > 0) {
            for (let i = 0; i < players.length; i++) {
                if (this.cards.length > 0) {
                    let card = this.cards.pop();
                    let player = players[i];
                    player.takeCard(card);
                }
            }
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.points = 0;
    }

    takeCard(card) {
        this.hand.push(card);
    }

    playCard() {
        return this.hand.pop();
    }

    hasCards() {
        return this.hand.length > 0;
    }

    awardPoint() {
        this.points++;
    }

    reportHand() {
        console.log(this.name + " has " + this.hand);
    }

    reportPoints() {
        console.log(this.name + " has " + this.points);
    }

}

function playWar() {
    // Create and shuffle deck
    let d = new Deck();
    d.shuffle();

    // Create players
    let p1 = new Player("Arisu");
    let p2 = new Player("Luci");

    // Deal cards to the players and report their details
    d.dealAlltoPlayers([p1, p2]);

    // Continually play until one player runs out of cards
    while (p1.hasCards() && p2.hasCards()) {
        let c1 = p1.playCard();
        let c2 = p2.playCard();

        if (c1.beats(c2)) {
            p1.awardPoint();
        } else if (c2.beats(c1)) {
            p2.awardPoint();
        } else {
            // draw, both cards are the same but have been discarded
            // while playing this turn
        }
        p1.reportPoints();
        p1.reportHand();
        p2.reportPoints();
        p2.reportHand();
    }

    // Compare points and print
    if (p1.points > p2.points) {
        console.log(p1.name + " wins!");
    } else if (p2.points > p1.points) {
        console.log(p2.name + " wins!");
    } else {
        console.log("It's a draw.");
    }
}

playWar();

// from professor example, scrapped for uselessness
// let c = new Card(1, 2);
// console.log(c.description());
// let d = new Card(2, 3);
// console.log(d.description());


// let deck = new Deck();