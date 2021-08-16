
var state = "def";
const ls = localStorage;
const doc = document;

if ( ls.getItem('ASTOTAL') === null ) {
	ls.setItem('ASTOTAL', 'null');
}

function hasChar(str, char) {
	for ( let c of str.split('') ) {
		if ( c === char ) {
			return true;
		}
	}
}

for ( let c of location.href.split('') ) {
	if ( c == "?" ) {
		state = location.href.split("?")[1];
		break;
	}
}

if ( state === "def" ) {
	console.log('RECALL - Home Page');
	console.log('RECALL - Attachment Studios Basic License(c)V3');
	home_render();
} else {
	if ( String(ls.getItem(state)).toLowerCase() === "null" ) {
		location.replace(location.href.split("?")[0]);
	} else {
		render();
	}
}

function create() {
	let name = "";
	let valid = false;
	while ( !(valid) ) {
		name = prompt('Project Name:');
		if ( name === null ) {
			break;
		} else {
			let chars = "\"a\", \"b\", \"c\", \"d\", \"e\", \"f\", \"g\", \"h\", \"i\", \"j\", \"k\", \"l\", \"m\", \"n\", \"o\", \"p\", \"q\", \"r\", \"s\", \"t\", \"u\", \"v\", \"w\", \"x\", \"y\", \"z\", \"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"G\", \"H\", \"I\", \"J\", \"K\", \"L\", \"M\", \"N\", \"O\", \"P\", \"Q\", \"R\", \"S\", \"T\", \"U\", \"V\", \"W\", \"X\", \"Y\", \"Z\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\", \"-\", \".\"";
			if ( name.replaceAll(' ') === '' ) {
				alert('Invalid Name!\nAvailable Characters:\n' + chars);
			} else {
				valid = true;
				for ( let c of name ) {
					if (!( hasChar(chars.replaceAll('"', '').replaceAll(' ', '').replaceAll(',', ''), c)  )) {
						alert('Invalid Name!\nAvailable Characters:\n' + chars);
						valid = false;
						break;
					}
				}
			}
		}
	}
	
	if ( valid ) {
		if ( ls.getItem(name) === null || ls.getItem(name) === '' ) {
			if ( name !== 'ASTOTAL' ) {
				ls.setItem(name, '');
				ls.setItem('ASTOTAL', ls.getItem('ASTOTAL') + '?' + name + '?null');
				window.open(location.href + '?' + name);
				location.reload();
			} else {
				alert('Name reserved!');
			}
		} else {
			alert('Project with same name already exists!');
		}
	}
}

function remove(id) {
	if ( confirm('Delete Project?') ) {
		ls.setItem('ASTOTAL', ls.getItem('ASTOTAL').replace('?' + id + '?', '?'));
		ls.setItem(id, '');
		location.reload();
	}
}

function home_render() {
	prj = doc.getElementById('all_projects');
	for ( let n of ls.getItem('ASTOTAL').split('?') ) {
		if ( String(n) !== 'null' ) {
			prj.innerHTML = prj.innerHTML + `<button oncontextmenu="remove('${n}');" onclick="window.open(location.href + '?' + '${n}');">${n}</button>`
		}
	}
}

function render() {
	doc.title = state + ' - Recall - Project Management Tool';
	doc.body.innerHTML = `
		<div id="title">
			<h1>${state}</h1>
		</div>
		<button onclick="newlist();">+ New List</button>
		<br>
		<div id="coll">
		</div>
	`;
	
	let list_names = ls.getItem(state).split('!');
	let coll = doc.getElementById('coll');
	for ( let n of list_names ) {
		let allowed = true;
		if ( n !== 'null' && n !== '' && allowed ) {
			coll.innerHTML = coll.innerHTML + `
				<div class="list" id="${n}">
					<h2 oncontextmenu="removelist('${n}');">${n}</h2>
					<button onclick="newitem('${n}');">+ New Item</button>
					<div id="${n}-items"></div>
				</div>
			`;
			for ( let v of ls.getItem(state + n).split('==--!--==') ) {
				let itar = doc.getElementById(n + '-items');
				if ( v !== '' ) {
					itar.innerHTML = itar.innerHTML + `<p class="item" id="${state}-${n}-${v}" oncontextmenu="removeitem('${state}-${n}-${v}');">${v}</p>`;
				}
			}
		}
	}
}

function newlist() {
	let name = "";
	let valid = false;
	while ( !(valid) ) {
		name = prompt('List Name:');
		if ( name === null ) {
			break;
		} else {
			let chars = "\"a\", \"b\", \"c\", \"d\", \"e\", \"f\", \"g\", \"h\", \"i\", \"j\", \"k\", \"l\", \"m\", \"n\", \"o\", \"p\", \"q\", \"r\", \"s\", \"t\", \"u\", \"v\", \"w\", \"x\", \"y\", \"z\", \"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"G\", \"H\", \"I\", \"J\", \"K\", \"L\", \"M\", \"N\", \"O\", \"P\", \"Q\", \"R\", \"S\", \"T\", \"U\", \"V\", \"W\", \"X\", \"Y\", \"Z\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\", \"-\", \".\", \" \"";
			if ( name.replaceAll(' ') === '' ) {
				alert('Invalid Name!\nAvailable Characters:\n' + chars);
			} else {
				valid = true;
				for ( let c of name ) {
					if (!( hasChar(chars.replaceAll('"', '').replaceAll(' ', '').replaceAll(',', ''), c)  )) {
						alert('Invalid Name!\nAvailable Characters:\n' + chars);
						valid = false;
						break;
					}
				}
			}
		}
	}
	
	if ( valid ) {
		if ( ls.getItem(state + name) === null || ls.getItem(state + name) === '' ) {
			if ( true ) {
				ls.setItem(state + name, '');
				ls.setItem(state, ls.getItem(state) + 'null!' + name + '!null!');
				render();
			}
		} else {
			alert('List with same name already exists!');
		}
	}
}


function newitem(id) {
	let name = prompt('Item:');
	if ( name !== null ) {
		ls.setItem(state + id, ls.getItem(state + id) + '==--!--==' + name + '==--!--==');
		render();
	}
}

function removelist(id) {
	if ( confirm('Delete List?') ) {
		ls.setItem(state, ls.getItem(state).replace('null!' + id + '!', ''));
		ls.setItem(state + id, '');
		render();
	}
}

function removeitem(id) {
	let s = id.split('-')[0];
	let n = id.split('-')[1];
	let v = id.split('-')[2];
	
	ls.setItem(s+n, ls.getItem(s+n).replace(v, ''));
	render();
}

