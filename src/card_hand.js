var CardHand = function(raw_cards, rules){
	var api = {};
	var cards = [];
	
	var MAX_HIGH = 14;
	var MAX_PAIR = MAX_HIGH * 2;
	
	var parse = function(){
		var splited_cards = raw_cards.split(' ');
		for(raw_index in splited_cards){
			var card = extract_card(splited_cards[raw_index]);
			cards.push(card);
		}
	}
	
	var extract_card = function(card_info){
		var card_info = card_info.split('');
		var value = card_info[0];
		var suit = card_info[1];
		return Card(value,suit);
	}
	
	parse();
	
	api.score = function(){
		return rules.score(cards);
	}
	
	api.cards = function(){
		return cards;
	}
	
	return api;
}

var Card = function(value, suit){
	
	var value_to_number = {
		'T' : 10,
		'J' : 11,
		'Q' : 12,
		'K' : 13,
		'A' : 14
	}
	
	var number_value = function(){
		var int_value = parseInt(value);
		return int_value ? int_value : value_to_number[value];
	}
	
	return {
		value : value,
		suit : suit,
		number_value : number_value()
	}
}

var HighRule = function(){
	var api = {};
	api.MAX_VALUE = 14;
	
	api.score = function(cards){
		var higher = cards[0];
		for(c in cards){
			if (cards[c].number_value > higher.number_value){
				higher = cards[c];
			}
		}
		return higher.number_value;
	}
	
	return api;
}

var PairRule = function(nextRule){
	var api = {};
	api.MAX_VALUE = nextRule.MAX_VALUE * 2;
			
	var findPairs = function(cards){
		for(var i=0; i<cards.length; i++){
			for(var j=i+1; j<cards.length; j++){
				if (cards[i].number_value == cards[j].number_value) return cards[i].number_value;
			}
		}
		return 0;
	}
	
	api.score = function(cards){
		var pair_value = findPairs(cards);
		if (pair_value > 0)	return pair_value + nextRule.MAX_VALUE;
		return nextRule.score(cards);
	}
		
	return api;	
}

var TwoPairsRule = function(nextRule){
	var api = {};
	api.MAX_VALUE = nextRule.MAX_VALUE * 2;
	
	var twoPairs = function(cards){
		var pairs = [];
		for (var i=0; i<cards.length; i++){
			for(var j=i+1; j<cards.length; j++){
				if(cards[i].number_value == cards[j].number_value)
					pairs.push(cards[i].number_value)
			}
		}
		return pairs;
	}
	
	api.score = function(cards){
		var pairs = twoPairs(cards);
		if(pairs.length > 1){
			return pairs[0] + pairs[1] + nextRule.MAX_VALUE;
		}
		return nextRule.score(cards);
	}
	
	return api;
}