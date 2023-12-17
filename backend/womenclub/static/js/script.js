const monthName = document.querySelectorAll('.calendar__month--name');
const calendarDaysContainer  = document.querySelectorAll('.calendar__days');
const weekDaysContainer = document.querySelectorAll('.weekdays');
const yearName = document.querySelectorAll('.calendar__year');
const listMonths = document.querySelectorAll('.list__months .month');
const burger = document.querySelectorAll('.burger');

const currentDate = new Date();
const monthNames = [

  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

document.addEventListener('DOMContentLoaded', function () {
	var navMenu = document.querySelector('.header__nav');
	var burgerIcon = document.querySelector('.burger');
	var add = document.getElementById('add');
	var lecture = document.querySelector('.schedule__form');

	burgerIcon.addEventListener('click', function () {
		navMenu.classList.toggle('nav-visible');
	});

	add.addEventListener('click', function () {

		if (lecture.style.display == 'block'){
			lecture.style.display = 'none'
		} else {
			lecture.style.display = 'block'
		}
		
	});
});

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

		isToday = new Date().toDateString() === d.toDateString(); 

		table += '<td data-date="' + year + '-' + (mon + 1) + '-' + d.getDate() + '"' + (isToday ? ' class="today"' : '') + '>' + d.getDate() + '</td>';


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
		console.log('клик');
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
  

const calendarTable = document.querySelector('.calendar__table');

calendarTable.addEventListener('click', function(e) {
    if (e.target.tagName === 'TD' && e.target.dataset.date) {
        const selectedDate = e.target.dataset.date;

		document.querySelectorAll('.calendar__table td').forEach(td => {
            td.classList.remove('selected-date');
        });
		e.target.classList.add('selected-date');
		
        loadEvents(selectedDate);
    }
});

function loadEventsToday(){
	const eventList = document.getElementById('eventList');
	const currentDate = new Date();
    const dateToLoad = currentDate.toISOString().split('T')[0]; // Получаем дату в формате "гггг-мм-дд"

	fetch(`/api/events/get_events_for_date?date=${dateToLoad}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            eventList.innerHTML = '';
            if (data.events && data.events.length > 0) {
                data.events.forEach(event => {
					const formattedDate = new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric'});
					const formattedTime = event.time.split(':').slice(0, 2).join(':');
                    const caseItem = document.createElement('div');

                    caseItem.classList.add('case');
                    caseItem.innerHTML = `
                        <div class="case__date">${formattedDate}</div>
						<span> — </span>
						<div class="case__time">${formattedTime}</div>
                        <div class="case__text">${event.subject}</div>
                    `;
                    eventList.appendChild(caseItem);
                });
            } else {
                const noEventsItem = document.createElement('div');
                noEventsItem.classList.add('case');
                noEventsItem.innerHTML = `<div class="case__text">Занятий нет</div>`;
                eventList.appendChild(noEventsItem);
            }
        })
        .catch(error => console.error('Error:', error));
}

loadEventsToday()

function loadEvents(selectedDate) {
    const eventList = document.getElementById('eventList');
	const currentDate = new Date();
    const dateToLoad = selectedDate || currentDate.toISOString().split('T')[0]; // Получаем дату в формате "гггг-мм-дд"
	console.log(dateToLoad, 'dateToLoad');
    fetch(`/api/events/get_events_for_date?date=${dateToLoad}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            eventList.innerHTML = '';
            if (data.events && data.events.length > 0) {
                data.events.forEach(event => {
					const formattedDate = new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric'});
					const formattedTime = event.time.split(':').slice(0, 2).join(':');

                    const caseItem = document.createElement('div');
                    caseItem.classList.add('case');
                    caseItem.innerHTML = `
                        <div class="case__date">${formattedDate}</div>
						<span> — </span>
						<div class="case__time">${formattedTime}</div>
                        <div class="case__text">${event.subject}</div>
                    `;
                    eventList.appendChild(caseItem);
                });
            } else {
                const noEventsItem = document.createElement('div');
                noEventsItem.classList.add('case');
                noEventsItem.innerHTML = `<div class="case__text">Занятий нет</div>`;
                eventList.appendChild(noEventsItem);
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadLectures(){
	const eventList = document.getElementById('lecture__table--wrapper');
	console.log(eventList);
	fetch(`/api/lectures/`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			console.log(data)
			// eventList.innerHTML = '';
			if (data.events && data.events.length > 0) {
                data.events.forEach(event => {
					
                    caseItem.innerHTML = `
						<div class="lecture--name">${event.lecture_name}</div>
						<div class="lecture--name">${event.link}</div>
                    `;
                    eventList.appendChild(caseItem);
                });
            } else {
                console.log('error');
            }

		})
		.catch(error => console.error('Error:', error));
}

loadLectures();