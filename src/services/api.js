// export const serverBaseURL = "http://localhost:5000/v1";
export const serverBaseURL = "http://140.114.85.21:5000/v1";

export function getMenu() {
  const url = serverBaseURL + "/menus/";
  return fetch(url)
    .then(data => data.json())
}

export function postOrder(order) {
  const url = serverBaseURL + `/v1/orders?order_by=${name}&item_id=${props.data.id}&sugar=${sugar}&ice=${ice}`;
  return fetch(
    url,{
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      // body: JSON.stringify(request.session)
    })
    .then(data => data.json())
}