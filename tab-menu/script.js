const tabs = document.getElementsByClassName('tab');
const content = document.getElementsByClassName('content');

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

//attaches an event handler to all tabs
for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', () => {
		tabStyle(tabs[i]);
		showContent(i);
	});
}

content[0].style.display = 'flex';
