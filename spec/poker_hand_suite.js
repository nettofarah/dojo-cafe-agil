describe('PokerHand', function () {
	
	describe('deciding a winner',function(){
		it("should evaluate high scores", function() {
		  	var white = CardHand('2H 7D 5C 9S AK');
			var black = CardHand('2H 7D 5C 9S QC');
			expect(white.score()).toBeGreaterThan(black.score());
		});
		
		it("should evaluate pair scores", function() {
		  	var white = CardHand('2H 2C 5S 9S QK')
			var black = CardHand('2H 7D 5C 9S AC');
			expect(white.score()).toBeGreaterThan(black.score());
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