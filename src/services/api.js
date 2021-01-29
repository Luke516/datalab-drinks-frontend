export function getMenu() {
    return fetch('http://localhost:5000/v1/menus/')
      .then(data => data.json())
}