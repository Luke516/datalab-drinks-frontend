// export const serverBaseURL = "http://localhost:5000/v1";
export const serverBaseURL = "http://140.114.85.21:5000/v1";

export function getMenu() {
  const url = serverBaseURL + "/menus/";
  return fetch(url)
    .then(data => data.json())
}

export function submitOrder(order) {
  // const url = serverBaseURL + `/v1/orders?order_by=${order.name}&item_id=${order.id}&sugar=${order.sugar}&ice=${order.ice}`;
  const url = serverBaseURL + `/orders/`;
  return fetch(
    url,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        order_by: order.name,
        item_id: order.id,
        sugar: parseInt(order.sugar),
        ice: parseInt(order.ice)
      })
    })
    .then(data => data.json())
}

export function getOrders() {
  const url = serverBaseURL + "/orders/";
  return fetch(url)
    .then(data => data.json())
}