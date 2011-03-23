var CardHand = function(raw_cards){
	var api = {};
	var cards = [];
	
	var MAX_HIGH = 14;
	
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
	
	var high = function(){
		var higher = cards[0];
		for(c in cards){
			if (cards[c].number_value > higher.number_value){
				higher = cards[c];
			}
		}
		return higher.number_value;
	}
	
	var pair = function(){
		for(var i=0; i<cards.length; i++){
			for(var j=i+1; j<cards.length; j++){
				if (cards[i].number_value == cards[j].number_value) return cards[i].number_value;
			}
		}
		return 0;
	}
	
	api.score = function(){
		var pair_value = pair();
		if (pair_value != 0) return pair_value + MAX_HIGH;
		return high();
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