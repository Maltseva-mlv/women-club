const monthName = document.querySelectorAll('.calendar__month--name');
const calendarDaysContainer  = document.querySelectorAll('.calendar__days');
const weekDaysContainer = document.querySelectorAll('.weekdays');
const yearName = document.querySelectorAll('.calendar__year');
const listMonths = document.querySelectorAll('.list__months .month');

const currentDate = new Date();
const monthNames = [

  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];


const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


function createCalendar(elem, year, month){
	elem = document.querySelector(elem);
	let mon = month - 1;
	let d = new Date(year, mon);

	let table = `
		<table class="calendar__table">
			<tr>
				<th>ПН</th>
				<th>Вт</th>
				<th>Ср</th>
				<th>Чт</th>
				<th>Пт</th>
				<th>Сб</th>
				<th>Вс</th>
			</tr>
			<tr>

	`;

	for (let i = 0; i < getDay(d); i++){
		table += '<td></td>'
	}

	while(d.getMonth() == mon){

		// console.log(d);
		isToday = new Date().toDateString() === d.toDateString(); 

		table += '<td' + (isToday ? ' class="today"' : '') + '>' + d.getDate() + '</td>';

		if (getDay(d) % 7 == 6){
			table += '</tr><tr>'
		}
		d.setDate(d.getDate() + 1);
	}

	if (getDay(d) != 0){
		for (let i = getDay(d); i < 7; i++){
			table += '<td></td>'
		}
	}
	table += '</tr></table>';

	elem.innerHTML = table;
	monthName[0].textContent = monthNames[mon];
	yearName[0].textContent = year;
}

function getDay(date){
	let day = date.getDay();

	if (day == 0)
		day = 7;

	return day - 1;
}

createCalendar('.calendar__days', 2023, 12);

const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const monthsToShow = [];
function generateMonthList(currentMonth, currentYear){

	for (let i = -1; i <= 2; i++){
		const month = (currentMonth + i) % 12 || 12;
		const year = currentYear + Math.floor((currentMonth + i - 1) / 12);
		console.log(month, year, i);
		monthsToShow.push({month, year});
	}

	return(monthsToShow);
	console.log(monthsToShow);
}
generateMonthList(currentMonth, currentYear)

listMonths.forEach((monthElement, index) => {
	const { month, year } = monthsToShow[index];
	monthElement.dataset.month = month;
	monthElement.dataset.year = year; 
	monthElement.querySelector('.month__name').textContent = monthNames[month - 1];
	monthElement.querySelector('.year').textContent = year;
});
listMonths.forEach(monthElement => {
	monthElement.addEventListener('click', () => {
	  // Удаление класса month-active и year-active у всех месяцев
	  listMonths.forEach(el => {
		el.classList.remove('month-active');
		el.querySelector('.year').classList.remove('year-active');
	  });

	  monthElement.classList.add('month-active');
	  monthElement.querySelector('.year').classList.add('year-active');
  
	  const selectedMonth = parseInt(monthElement.getAttribute('data-month'));
	  const selectedYear = parseInt(monthElement.getAttribute('data-year'));
	  createCalendar('.calendar__days', selectedYear, selectedMonth);
	});
  });
  