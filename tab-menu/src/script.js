const tabs = document.getElementsByClassName('tab');
const content = document.getElementsByClassName('content');
const toRight = document.getElementById('to-right');
const toLeft = document.getElementById('to-left');
const students = document.getElementById('students');
const selectedStudentsContainer = document.getElementById('selectedStudents');
//const selectedStudentsList = document.getElementsByClassName('studentList');
const selectedStudents = [];
const url = './data.json';

let = listOfStudents = [];

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

content[0].style.display = 'flex';

//attaches an event handler to all tabs
for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', () => {
		tabStyle(tabs[i]);
		showContent(i);
	});
}

//Move student from right to left
function returnStudent() {
	const checkedStudents = document.querySelectorAll('.studentList.selected');
	for (let student of checkedStudents) {
		let json = valueToJson(student.textContent);
		console.log(json);
		student.remove();
		listOfStudents.push(json);
		removeStudent(selectedStudents, json);
		students.innerHTML = reduceLeftStudents(
			sortOn(listOfStudents, 'first_name')
		);
	}
}

toLeft.addEventListener('click', () => returnStudent());

//Move student from left to right
function moveStudent() {
	const checkboxes = document.querySelectorAll(
		'input[name="studentCheck"]:checked'
	);
	for (let checkbox of checkboxes) {
		let parentRM = checkbox.parentNode.parentNode;
		parentRM.remove();
		let json = valueToJson(checkbox.value);
		selectedStudents.push(json);
		selectedStudentsContainer.innerHTML = reduceRightStudents(
			sortOn(selectedStudents, 'first_name')
		);
		removeStudent(listOfStudents, json);
	}
}

toRight.addEventListener('click', () => moveStudent());

function removeStudent(arr, json) {
	for (let student of arr) {
		let index = arr.indexOf(student);
		if (
			json.first_name === student.first_name &&
			json.last_name === student.last_name
		) {
			arr.splice(index, 1);
		}
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

function reduceRightStudents(arr) {
	let aux = arr.reduce(
		(html, student) =>
			html +
			`<div class="studentList" onClick="addClass(this)">${student.first_name} ${student.last_name}</div>`,
		''
	);
	return aux;
}

//Return the html of an array
function reduceLeftStudents(arr) {
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

function valueToJson(value) {
	let str = value.split(' ');
	let preJson = `{"first_name": "${str[0]}", "last_name": "${str[1]}"}`;
	return JSON.parse(preJson);
}

function addClass(student) {
	student.classList.toggle('selected');
}

fetch(url)
	.then(resp => resp.json())
	.then(data => sortOn(data, 'first_name'))
	.then(data => {
		listOfStudents = [...data];
		return data;
	})
	.then(data => {
		const items = reduceLeftStudents(data);
		students.innerHTML += items;
	});
