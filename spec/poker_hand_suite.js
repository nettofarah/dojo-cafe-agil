describe('PokerHand', function () {
	
	describe('ranking a card hand',function(){

		it('should rank high cards as 1',function(){
			var cardHand = CardHand('2H 3D 5S 9C KD');
			expect(cardHand.score()).toEqual(1);
		});

	});
	
});