describe('PokerHand', function () {
	
	beforeEach(function() {
	  	this.addMatchers({
		    toBeat: function(lower) { return this.actual.score() > lower.score(); }
		});
	});
	
	describe('deciding a winner',function(){	
		it("should evaluate high scores", function() {
			var low = CardHand('2H 7D 5C 9S QC');
			var high = CardHand('2H 7D 5C 9S AC');
			expect(high).toBeat(low);
		});
		
		describe("evaluating pair scores", function() {
			
			var pair;
			beforeEach(function() {
			  pair = CardHand('2H 2D 5C 9S AC');
			});
			
			it("should evaluate a pair against a high", function() {
				var high = CardHand('2H 7D 5C 9S AC');
				expect(pair).toBeat(high);  
			});
			
			it("should evaluate a pair against other pair", function() {
			 	var pairOfTwo = CardHand('2H 2D 5C 9S AC');
				var pairOfThree = CardHand('3H 3D 5C 9S AC');
				expect(pairOfThree).toBeat(pairOfTwo);
			});
		});
		
		describe("evaluating two pair scores", function() {
		  	var doublePair;
			
			beforeEach(function() {
				doublePair = CardHand('3D 3H 5D 5C AS');
			});
			
			it("should evaluate a two pair against a pair", function() {
				var pair = CardHand('5H 5S 2C KD AH');
				expect(doublePair).toBeat(pair);
		  	});
			
			it("should evaluate a two pairs against other two pairs", function() {
				var biggerDoublePair = CardHand('4H 4S 5S 5C AS');
				expect(biggerDoublePair).toBeat(doublePair);
			});
		});
	});
	
	describe('ranking a card hand',function(){
		it('should rank high cards as the higher value',function(){
			var cardHand = CardHand('2H 7D 5S 9C');
			expect(cardHand.score()).toEqual(9);
		});
	});
	
	describe('parsing a card hand',function(){
		it('should parse single value cards',function(){
			var cardHand = CardHand('2H 3D');
			var twoHearts = Card('2','H');
			var threeDiamonds = Card('3','D');
			
			expect(cardHand.cards()[0]).toEqual(twoHearts);
			expect(cardHand.cards()[1]).toEqual(threeDiamonds);
		});
		
		it('should parse a "char" card',function(){
			var cardHand = CardHand('TC KD JH QS AC');
			var cards = [Card('T','C'),Card('K','D'), Card('J','H'), Card('Q','S'), Card('A','C')];
			for(c in cards){
				expect(cardHand.cards()).toContain(cards[c]);
			}
		});
	});
	
});

describe("Card", function() {
  	it('should have a number value',function() {
		var two = Card('2','H');
		expect(two.number_value).toEqual(2);
	});
	
	it('should have a number value for char cards',function(){
		expected_values = {
			'T' : 10,
			'J' : 11,
			'Q' : 12,
			'K' : 13,
			'A' : 14
		}
		for (key in expected_values){
			expect(Card(key,'D').number_value).toEqual(expected_values[key]);	
		}
	});
});