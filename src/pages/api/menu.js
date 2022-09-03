// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMenuRemote } from "../../modules/api/drinkMenu"
import { getMenu } from "../../modules/backend/menu";


export default async function handler(req, res) {
  const menu = getMenu();
  // TODO: remove unused
  // const menu = {}//await getMenuRemote();
  res.status(200).json(menu);
}
