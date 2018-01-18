jQuery(function( $ ){

function Helper(){}
Helper.mostUsed = function(_items){
	var output = {};
	$.each(_items, function(i, p){			
		var index = p.c
		if (output[index] === void 0)
			output[index] = 1
		else
			output[index] = output[index]  + 1
	});
	var items = Helper.sortRecord(output);
	Helper.writeHtml(items, 'mostUsed');
};
Helper.topChar = function(_items){
	var output = {};
	var total = _items.length
	$.each(_items, function(i, p){
		var points = (total + 1000) / parseInt(p.r)
		var index = p.c

		if (output[index] === void 0)
			output[index] = points
		else
			output[index] = output[index]  + points
	});
	var items = Helper.sortRecord(output);
	Helper.writeHtml(items, 'topChar');
}
Helper.sortRecord = function(items){
	var sortable = [];
	for (var item in items) {
	    sortable.push([item, items[item]]);
	}

	sortable.sort(function(a, b) {
	    return b[1] - a[1];
	});

	return sortable;
}
Helper.writeHtml = function(arr, valueType){
	Helper.addHead(valueType);
	var html = "";	
	$.each(arr, function(_, chunk){
		var charName = chunk[0];
		var value = chunk[1];
		var text = ""

		if (valueType === 'mostUsed'){
			text += `<td class="c-name"><strong>${charName}</strong> </td> <td><strong>${value}</strong> Players</td>`
		}else if (valueType === 'topChar'){
			text +=  `<td class="c-name"><strong>${charName}</strong></td> has <td><strong>${value.toFixed(2)}</strong></td>`
		}
	
		html +=  "<tr>" + text + "</td></tr>"	
	})
	$('.display-result').html(html);


}
Helper.addHead = function(valueType){
	var sTh = "";
	if (valueType === 'mostUsed'){
		sTh += 'Used by'
	}else if (valueType === 'topChar'){
		sTh += 'Rating'
	}

	$('.display-result-head').html(`<th>Character</th> <th> ${sTh}</th>`);
}

Helper.canContinue = function(_start, _end, _rank){
	var start = parseInt(_start),
		end = parseInt(_end);
		rank = parseInt(_rank);
	
	if (start >= end)
		return false
	
	return (rank >= start && rank <=  end)
}

	$('#generate-results').on('click', function(){
		var action = $('#filter-action input:checked').data('action');
		var startRank = $('#filter-rank-start').val();
		var endRank = $('#filter-rank-end').val();
		var items = record.filter(p => Helper.canContinue(startRank, endRank, p.r))

		if (action === "most_used"){
			Helper.mostUsed(items);
		}else if("top-char") {
			Helper.topChar(items);
		}
	});
});