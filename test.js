var items = {
	banana: 2,
	bell: 2,
	cherries: 3,
	joker: 3,
	moneybag: 4, 
	orange: 4,
	poker: 5,
	startup: 6
}

var combos = [
	{
		kits: 1,
		counts: [2],
		types: ['any'],
		score: (item1) => {
			 
			return 2*items[item1];
		}
	},
	{
		kits: 2,
		counts: [2, 2],
		types: ['any', 'any'],
		score: (item1, item2) => {
			 
			return 2*items[item1]+2*items[item2];
		}
	},
	{
		kits: 2,
		counts: [3, 2],
		types: ['any', 'any'],
		score: (item1, item2) => {
			 
			return 3*(items[item1]+1)+2*items[item2];
		}
	},
	{
		kits: 1,
		counts: [4],
		types: ['any'],
		score: (item1) => {
			 
			return 4*(items[item1]*items[item1]);
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['banana'],
		score: () => {
			 
			return 50;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['bell'],
		score: () => {
			 
			return 70;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['cherries'],
		score: () => {
			 
			return 90;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['joker'],
		score: () => {
			 
			return 110;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['moneybag'],
		score: () => {
			 
			return 130;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['orange'],
		score: () => {
			 
			return 150;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['poker'],
		score: () => {
			 
			return 170;
		}
	},
	{
		kits: 1,
		counts: [5],
		types: ['startup'],
		score: () => {
			 
			return 250;
		}
	}
]


randomKit = [1,1,1,7,7];


let kits = {};
for(let i = 0; i < randomKit.length-1; i++){
	let item = randomKit[i];
	let kit = [item];
	for(let j = i+1; j < randomKit.concat(['_']).length; j++){
		let subitem = randomKit[j];
		if(subitem == item){
			kit.push(subitem);
		}else{
			item = Object.keys(items)[item];
			if(kit.length > 1 && !(item in kits)){
				console.log(kit);
				kits[item] = kit.length;
			}
			break;
		}
	}
}

console.log(kits);

let score = 0;

for(let combo of combos){
	if(Object.keys(kits).length != combo.kits) continue;
	let match = false;
	for(let i = 0; i < Object.keys(kits).length; i++){
		if(
			(combo.counts[i] == kits[Object.keys(kits)[i]])
			&&
			(combo.types[i] == 'any' || combo.types[i] == Object.keys(kits)[i])
		){
			match = true;
		}else{
			match = false;
		}
	}
	if(match){
		score = combo.score.apply(null, Object.keys(kits));
	}
}

console.log(score);