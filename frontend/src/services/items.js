import { SERVER_URL } from "./config.json"
import { getRequest, postRequest, deleteRequest } from "./request"

export function getItems(token) {
  return fetch(`${SERVER_URL}/items`, getRequest(token))
    .then(data => data.json())
}

export function getItem(token, itemId) {
  return fetch(`${SERVER_URL}/items/${itemId}`, getRequest(token))
    .then(data => data.json())
}

export function saveItem(token, item) {
  return fetch(`${SERVER_URL}/items`, postRequest(token, item))
    .then(data => data.json())
}

export function deleteItem(token, itemId) {
  return fetch(`${SERVER_URL}/items/${itemId}`, deleteRequest(token))
    .then(data => data.json())
}