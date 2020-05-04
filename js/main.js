const API_URL = 'https://api.lyrics.ovh';

const form = document.querySelector('#form');

const search = document.querySelector('#search');

const result = document.querySelector('#result');

const more = document.querySelector('#more');

console.log(form, search, result, more);


async function searchsongs(term) {
	let res = await fetch(`${API_URL}/suggest/${term}`);
	let data = await res.json();
	showData(data)
}

function showData(data) {
	let out = '';
	data.data.forEach(song => {
		out +=
			`
		<li>
			<span><strong>${song.artist.name}</strong>-${song.title}</span>
			<button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}">歌词</button>
		</li>
		`;
	});

	result.innerHTML = `
	<ul class="song">
		${out}
	</ul>
	`;
	if (data.prev || data.next) {
		console.log(data)
		more.innerHTML =
			`
		${data.prev ? `<button class="btn" onclick='getMoreSongs("${data.prev}")'>上一页</button>`:``}
		${data.next ?`<button class="btn" onclick='getMoreSongs("${data.next}")'>下一页</button>`:``}
		`
	} else {
		more.innerHTML = '';
	}

}

async function getMoreSongs(url) {
	const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
	const data = await res.json();

	showData(data)
}

async function getLyrics(artist, songtitle) {
	console.log(artist, songtitle)
	try {
		const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songtitle}`);
		console.log(res)
		const data = await res.json();

		console.log(data)
		const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
		result.innerHTML = `<h2><strong>${artist}</strong>-${songtitle}</h2>
		<span>${lyrics}</span>
	`;

		more.innerHTML = '';
	} catch (e) {
		//TODO handle the exception
		console.log(e);
		alert('该网站没有改歌曲的歌词内容,非常抱歉')

	}
	console.log(15)

}

// 事件监听

form.addEventListener('submit', e => {
	e.preventDefault();
	console.log(e)
	const searchTerm = search.value.trim();
	// searchTerm || alert('输入内容谢谢')
	if (!searchTerm) {
		alert('输入内容谢谢');
	} else {
		searchsongs(searchTerm);
	}
	console.log(searchTerm)
})

// 事件代理 
result.addEventListener('click', e => {
	console.log(12)
	console.dir(e.target.tagName)
	if (e.target.tagName === 'BUTTON') {
		console.log(12)

		const artist = e.target.dataset['artist'];
		const songtitle = e.target.dataset['songtitle'];
		console.log(artist, songtitle);
		getLyrics(artist, songtitle)
	}

})
