export function getRequest (token) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
}

export function postRequest (token, body) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      body: JSON.stringify(body)
    }
  }
}

export function deleteRequest (token) {
  return {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
}