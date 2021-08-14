import { SERVER_URL } from "./config.json"
import { getRequest } from "./request"

export function authenticate(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch(`${SERVER_URL}/users/authenticate`, requestOptions)
    .then(data => data.json())
}

export function getFamily(token) {
  return fetch(`${SERVER_URL}/family/${familyId}`, getRequest(token))
    .then(data => data.json())
}