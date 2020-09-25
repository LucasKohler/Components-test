const tabs = document.getElementsByClassName('tab');
const content = document.getElementsByClassName('content');

function tabStyle(tab) {
	const selected = document.getElementsByClassName('selected');
	for (let i = 0; i < selected.length; i++) {
		selected[i].classList.add('not-selected');
		selected[i].classList.remove('selected');
	}
	tab.classList.add('selected');
	tab.classList.remove('not-selected');
}

function showContent(index) {
	for (let i = 0; i < content.length; i++) {
		content[i].style.display = 'none';
	}
	content[index].style.display = 'flex';
}

for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', () => {
		tabStyle(tabs[i]);
		showContent(i);
	});
}

content[0].style.display = 'flex';
