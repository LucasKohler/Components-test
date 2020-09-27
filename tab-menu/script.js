const tabs = document.getElementsByClassName('tab');
const content = document.getElementsByClassName('content');
const toRight = document.getElementById('to-right');
const toLeft = document.getElementById('to-left');
const students = document.getElementById('students');
const selectedStudentsContainer = document.getElementById('selectedStudents');
const selectedStudentsList = document.getElementsByClassName('studentList');
const selectedStudents = [];
const url = './data.json';

let listOfStudents = [];

//Moving class selected to the new selected tab
function tabStyle(tab) {
	const selected = document.getElementsByClassName('selected');
	selected[0].classList.toggle('selected');
	tab.classList.toggle('selected');
}

//Moving the 'display: flex' to content with the same index as the selected tab
function showContent(index) {
	for (let i = 0; i < content.length; i++) {
		content[i].style.display = 'none';
	}
	content[index].style.display = 'flex';
}

//Move student from left to right
function moveStudent() {
	const checkboxes = document.querySelectorAll(
		'input[name="studentCheck"]:checked'
	);
	for (let checkbox of checkboxes) {
		let parentRM = checkbox.parentNode.parentNode;
		parentRM.remove();

		let str = checkbox.value.split(' ');
		let preJson = `{"first_name": "${str[0]}", "last_name": "${str[1]}"}`;
		let json = JSON.parse(preJson);
		selectedStudents.push(json);

		selectedStudentsContainer.innerHTML = htmlStudentList(
			sortOn(selectedStudents)
		);
		eventStudentList();

		for (let student of listOfStudents) {
			let index = listOfStudents.indexOf(student);
			if (
				json.first_name === student.first_name &&
				json.last_name === student.last_name
			) {
				listOfStudents.splice(index, 1);
			}
		}
	}
}

function eventStudentList() {
	for (let i = 0; i < selectedStudentsList.length; i++) {
		selectedStudentsList[i].addEventListener('click', () =>
			addClass(selectedStudentsList[i])
		);
	}
}

//Move student from right to left
function returnStudent() {
	const checkedStudents = document.querySelectorAll('.studentList.selected');
	for (let student of checkedStudents) {
		let str = student.textContent.split(' ');
		let preJson = `{"first_name": "${str[0]}", "last_name": "${str[1]}"}`;
		let json = JSON.parse(preJson);
		student.remove();
		listOfStudents.push(json);

		for (let student of selectedStudents) {
			let index = selectedStudents.indexOf(student);
			if (
				json.first_name === student.first_name &&
				json.last_name === student.last_name
			) {
				selectedStudents.splice(index, 1);
			}
		}

		students.innerHTML = reduceStudents(sortOn(listOfStudents, 'first_name'));
	}
}

// Order array alphabetically
function sortOn(arr, prop) {
	arr.sort(function (a, b) {
		if (a[prop] < b[prop]) {
			return -1;
		} else if (a[prop] > b[prop]) {
			return 1;
		} else {
			return 0;
		}
	});
	return arr;
}

function htmlStudentList(arr) {
	let aux = arr.reduce(
		(html, student) =>
			html +
			`<div class="studentList">${student.first_name} ${student.last_name}</div>`,
		''
	);
	return aux;
}

//Return the html of a array
function reduceStudents(arr) {
	let aux = arr.reduce(
		(html, student) =>
			html +
			`<div class="container-row">
			<div class="col-10">
				<input
					type="checkbox"
					name="studentCheck"
					id="studentCheck"
					value="${student.first_name} ${student.last_name}"
				/>
			</div>
			<div class="col-90">${student.first_name} ${student.last_name}</div>
		</div>`,
		''
	);
	return aux;
}

function addClass(student) {
	student.classList.toggle('selected');
}

content[0].style.display = 'flex';

toRight.addEventListener('click', () => moveStudent());

toLeft.addEventListener('click', () => returnStudent());

//attaches an event handler to all tabs
for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', () => {
		tabStyle(tabs[i]);
		showContent(i);
	});
}

fetch(url)
	.then(resp => resp.json())
	.then(data => sortOn(data, 'first_name'))
	.then(data => {
		listOfStudents = [...data];
		return data;
	})
	.then(data => {
		const items = reduceStudents(data);
		students.innerHTML += items;
	});
