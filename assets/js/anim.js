// наши фрукты и их очки
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
// возможные комбинации
var combos = [
	{
		kits: 1, // количество наборов в комбинации
		counts: [2], // количества фруктов в каждом наборе
		types: ['any'], // типы фруктов в каждом наборе
		score: (item1) => { // функция по которой начисляются очки если такая комбинация выпала
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
        counts: [3],
        types: ['any'],
        score: () => {
            return 3*(items[item1] + 1);
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

// инициирующая функция, ее вызов находится в атрибуте onload тэга body
function init() {

	var itemHeight, // высота любой ячейки с фруктом
		bottomScrollHeight, // максимальная высота прокрутки
		borderOffset, // отступ от нижней границы (чтобы фрукты становились красиво по центру)
		sections = document.querySelectorAll('.section'), // все секции (это те что вращаются)
		balanceNode = document.getElementById('balance'); // узел в котором записывается баланс игрока
	// проходимся по каждой секции 
	for(let section of sections){
		section.canBeScrolled = true; // добавляем каждой секции новое свойство (может или не может она вращаться)
		let keys = Object.keys(items); // получаем масив фруктов
		for(let item of keys.concat(keys.slice(0, 3))){ // копируем три первых фрукта в конец массива и проходимся по каждому фрукту
			let itemNode = document.createElement('div'); // создаем новый узел
			itemNode.setAttribute('class', 'item'); // устанавливаем ему class item
			itemNode.style.backgroundImage = `url(assets/images/${item}.png)`; // устанавливаем на задний фон картинку фрукта
			section.appendChild(itemNode); // добавляем фрукт в секцию
		}
		itemHeight = parseInt(getComputedStyle(document.querySelector('.item')).height); // находим высотку ячейки с фруктом//Функция parseInt() принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.
		borderOffset = itemHeight/3.5; // находим отстутп от нижней границы
		bottomScrollHeight = (keys.length*itemHeight)+borderOffset; // находим максимальную высоту прокрутки
		section.scrollTop = bottomScrollHeight; // прокручиваем каждую секцию вниз на максимум
	}

	let keepScrolling = false; // эта переменная показывает должны ли секции крутиться дальше или остановиться
	function scrollItems(){ // функция которая вращает секции
		for(let section of sections){ // проходимся по каждой секции и вращаем ее на одинакокое количество пикселей вверх
			if(!section.canBeScrolled) continue; // если секция не может крутиться то код ниже не выполняем
			section.scrollTop -= 30; // прокрутка вверх на 30 пикселей
			if(section.scrollTop <= borderOffset){ // если достигнут верхний предел прокрутки секции то перематываем секцию максимально вниз
				section.scrollTop = bottomScrollHeight;
			}
		}
		if(keepScrolling) // если секции должны крутиться, то запаршиваем у браузера нужную производительность для анимации DOM элементов и выполняем функцию scrollItems еще раз
			requestAnimationFrame(scrollItems);
		else{ // если не должны - выставляем исходное значение переменной canBeScrolled для каждой секции
			for(let section of sections)
				section.canBeScrolled = true;
			setScore(); // проверяем комюинации и выставляем очки
		}
	}

	let randomKit = [], // случайный набор индексов фруктов
		sectionIndex = 0; // индекс текущей секции
	function stopAtRandomItem(){ // функция которая останавливает по очереди секции на случайном фрукте
		let randomIndex = parseInt(Math.floor(Math.random()*Object.keys(items).length)); // получаем случайный индекс фрукта
		randomKit.push(randomIndex); // добавляем его в массив случайных фруктовых индексов
		if(randomIndex == 0) randomIndex += 8; // если это банан (индекс 0) то увеличиваем его индекс на 8 (тоже банан, только снизу), чтобы не возникало ошибки со смещением
		sections[sectionIndex].scrollTop = (randomIndex*itemHeight)-parseInt(itemHeight/1.5); // расчитываем высоту прокрутки и прокручиваем секцию на эту высоту
		sections[sectionIndex].canBeScrolled = false; // останавливаем секцию (фактически говорим программе что эта секция больше не должны крутиться)
		sectionIndex++; // увеличиваем индекс секции на 1
		if(sectionIndex < sections.length) // если текущая секция не последняя то снова выполняем функцию stopAtRandomItem над следующей секцией 
			setTimeout(stopAtRandomItem, 1000);
		else{ // если последняя - запрещаем секциям крутиться и обнуляем индекс текущей секции
			keepScrolling = false;
			sectionIndex = 0;
		}
	}

	// проверяет наличие комбинаций и начисляет очки за них
	function setScore(){
		let kits = {};
        console.log(randomKit);
		// весь этот цикл проходит по каждому случайному индексу фрукта и пытается найти надоры фруктов в ряд (типа, банан - банан - банан,вишня-вишня,ракета-ракета-ракета-ракета)
		// если что-то находит записывает в объект kits
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
						
						kits[item] = kit.length;
					}
					break;
				}
			}
		}
		let score = 0;
		// а весь этот цикл проверяет каждый набор, который нашел первый цикл, и сравнивает его с каждой с комбинаций
		// если набор и комбинация совпали, то начисляет очки по функции, которая есть в каждой комбинации
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
		changeBalance(score); // увеличиввет баланс на расчитаное количество очков
	}

	// получаем текущий баланс. /\d+/ - регулярное выражение которое находит числовое значение текущего баланса
	function getBalance(){
		return parseInt(/\d+/.exec(balanceNode.innerHTML));
	}
	// увеличиваем (или уменьшаем) значение баланса на number
	function changeBalance(number){
		balanceNode.innerHTML = `Balance: ${getBalance()+number} pts`;
	}
	// привязываем обработку нажатия к кнопке Start
	document.querySelector('#start').addEventListener('click', function(){
		if(getBalance() < 20) return;
		if(keepScrolling) return; // если секции уже вращаются, то кнопка не будет работать
		changeBalance(-20); // снимаем 20 очков баланса
		keepScrolling = true; // разрешаем секциям крутиться
		scrollItems(); // запускаем вращение секций
		randomKit = []; // обнуляем массив рандомных индексов фруктов
		setTimeout(stopAtRandomItem, 1000); // запускаем остановку секций по очереди с задержкой 1000 милисекунд (1 секунда)
	});
	// привязываем обработку нажатия к кнопке Add 100 pts
	document.querySelector('#add100pts').addEventListener('click', changeBalance.bind(null, 100));

}