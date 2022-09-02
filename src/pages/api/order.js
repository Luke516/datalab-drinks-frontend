// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMenu, getOrdersBackup } from "../../modules/api/drinkMenu"


export default async function handler(req, res) {
  const orders = await getOrdersBackup();
  console.log(orders);
  res.status(200).json(orders);
}
