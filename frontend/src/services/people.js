export function getList(list, state) {
  return fetch(`http://localhost:3001/${list}/${state}`)
    .then(data => data.json())
}