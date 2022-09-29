// TODO: remove unused heroku codes

import { menu } from "./drinkMenuBackup";

// export const serverBaseURL = "http://localhost:5000/v1";
// export const serverBaseURL = "http://3.37.201.24:5002/v2";
// export const serverBaseURL = "http://datalab-drinks.herokuapp.com/api"; //"/api";
// export const backupServerBaseURL = "http://datalab-drinks.herokuapp.com/api";
const serverBaseURL = "/api";
const backupServerBaseURL = serverBaseURL;
const remoteServerUrl = "http://datalab-drinks.herokuapp.com/api";

export function getMenu() {
  const url = serverBaseURL + "/menu/";
  return fetch(url)
    .then((data) => {
      return data.json();
    })
}

export function getMenuRemote() {
  const url = remoteServerUrl + "/menus/";
  return fetch(url)
    .then((data) => {
      return data.json();
    })
}

export function submitOrder(order) {
  const url = serverBaseURL + `/orders/`;
  return fetch(
    url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      order_by: order.name,
      item_id: order.id,
      size: order.size,
      sugar_id: parseInt(order.sugar),
      ice_id: parseInt(order.ice)
    })
  }
  ).catch((error) => {
    console.log(error);
    return submitOrderBackUp(order);
  })
}

export function getOrdersBackup() {
  const url = `${backupServerBaseURL}/orders/`;
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      console.error(error);
      return {};
    })
}

export function getOrders() {
  const url = serverBaseURL + "/orders/";
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      console.log(error);
    })
}

export function getOrdersRemote() {
  const url = remoteServerUrl + "/orders/";
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      console.log(error);
    })
}

export function submitOrderRemote(order) {
  const url = `${remoteServerUrl}/orders/`;
  return fetch(
    url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(order)
  }
  ).catch((error) => {
    console.log(error);
  })
}