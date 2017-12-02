process.env.PORT = 3001;
const assert = require('assert');
const fetch = require('node-fetch');
const server = require('../..'); // starts the app 
const User = require('../../models/user');

// fetch util
let authorization;
const toJson = r => (/^application\/json/.test(r.headers.get('Content-Type')) ? r.json() : r.text())
	.then(d => Promise[r.status>=400?'reject':'resolve'](d));

const fetchJSON = (url, {method = 'GET', body}={}) => fetch(`http://localhost:${process.env.PORT}${url}`, {
	method,
	body: body && JSON.stringify(body), 
	headers: {'Content-Type': 'application/json', Accept:'*/json', authorization}
}).then(toJson);


before(() => {
	return User.deleteMany({});
})

after(() => {
	server.close()
});

describe('users route', () => {
	it('should return no profile', () => {
		return fetchJSON('/users/profile')
			.catch(err => assert(err)); // Unauthorized
	});

	it('should register', () => {
		return fetchJSON('/users/register', {
			method: 'POST',
			body: {
				username: 'tester',
				password: 'tester',
				email: 'tester@t.st',
				team: 'gsw'
			}
		})
			.then(data => {
				assert(data.success);
			});
	});

	it('should sign in', () => {
		return fetchJSON('/users/authenticate', {
			method: 'POST',
			body: {
				username: 'tester',
				password: 'tester'
			}
		})
			.then(data => {
				assert(data.token);
				authorization = data.token;
				assert(data.user);
			});
	});

	it('should return profile', () => {
		return fetchJSON('/users/profile')
			.catch(err => console.log(err));
	});
})
