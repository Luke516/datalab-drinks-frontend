import {menu} from "./menu-backup";

export const serverBaseURL = "http://localhost:5000/api";
// export const serverBaseURL = "http://shwu16.cs.nthu.edu.tw:5002/v2";
// export const backupServerBaseURL = "http://datalab-drinks.herokuapp.com/api";

export function getParticipants() {
  const url = serverBaseURL + "/participants/";
  return fetch(url)
    .then((data) => {
      return data.json();
    })
}

export function getParticipantGroups() {
  const url = serverBaseURL + "/groups/";
  return fetch(url)
    .then((data) => {
      return data.json();
    })
}

// export function getMenu() {
//   const url = serverBaseURL + "/menus/";
//   return fetch(url)
//     .then((data) => {
//       return data.json();
//     })
// }

// export function submitOrder(order) {
//   const url = serverBaseURL + `/orders/`;
//   return fetch(
//     url,{
//       method: 'POST',
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//       body: JSON.stringify({
//         order_by: order.name,
//         item_id: order.id,
//         size: order.size,
//         sugar_id: parseInt(order.sugar),
//         ice_id: parseInt(order.ice)
//       })
//     }
//   ).catch((error) => {
//     console.log(error);
//     return submitOrderBackUp(order);
//   })
// }

// export function submitOrderBackUp(order) {
//   const url =  `${backupServerBaseURL}/orders/`;
//   return fetch(
//     url,{
//       method: 'POST',
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//       body: JSON.stringify({
//         order_by: order.name,
//         item_id: order.id,
//         size: order.size,
//         sugar_id: parseInt(order.sugar),
//         ice_id: parseInt(order.ice)
//       })
//     }
//   ).catch((error) => {
//     console.log(error);
//   })
// }

// export function getOrdersBackup() {
//   const url =  `${backupServerBaseURL}/orders/`;
//   return fetch(url)
//     .then((data) => {
//       console.log(data);
//       return data.json();
//     })
//     .catch((error) => {
//       console.log(error);
//       return {};
//     })
// }

// export function getOrders() {
//   const url = serverBaseURL + "/orders/";
//   return fetch(url)
//     .then((data) => {
//       return data.json();
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }