import { SERVER_URL } from "./config.json"
import { getRequest } from "./request"

export function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch(`${SERVER_URL}/users/authenticate`, requestOptions)
    .then(data => data.json())
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export function getFamily(token) {
  return fetch(`${SERVER_URL}/family/${familyId}`, getRequest(token))
    .then(data => data.json())
}