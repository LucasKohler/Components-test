const tabs = document.getElementsByClassName('tab');
const content = document.getElementsByClassName('content');
const toRight = document.getElementById('to-right');
const toLeft = document.getElementById('to-left');
const students = document.getElementById('students');
const selectedStudentsContainer = document.getElementById('selectedStudents');
const selectedStudents = [];

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

function moveStudent() {
	const checkboxes = document.querySelectorAll(
		'input[name="studentCheck"]:checked'
	);
	for (let checkbox of checkboxes) {
		let parentRM = checkbox.parentNode.parentNode;
		parentRM.remove();
		let z = document.createElement('div');
		z.classList.add('studentList');
		z.innerHTML = checkbox.value;
		selectedStudentsContainer.appendChild(z);
		selectedStudents.push(z);
		z.addEventListener('click', () => addClass(z));
	}
}

//Move student from right to left
function returnStudent() {
	const checkedStudents = document.querySelectorAll('.studentList.selected');
	for (let student of checkedStudents) {
		let z = `
		<div class="container-row">
			<div class="col-10">
				<input
					type="checkbox"
					name="studentCheck"
					id="studentCheck"
					value="${student.textContent}"
				/>
			</div>
			<div class="col-90">${student.textContent}</div>
		</div>
		`;
		student.remove();
		students.innerHTML += z;
	}
}

function addClass(student) {
	student.classList.toggle('selected');
}

//attaches an event handler to all tabs
for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', () => {
		tabStyle(tabs[i]);
		showContent(i);
	});
}

content[0].style.display = 'flex';

toRight.addEventListener('click', () => moveStudent());

toLeft.addEventListener('click', () => returnStudent());
