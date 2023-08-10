// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// TODO: remove
import { getMenuRemote } from "../../modules/fetch/drinkMenu"
import { getMenu } from "../../modules/data/menu";


export default async function handler(req, res) {
  const menu = getMenu();
  res.status(200).json(menu);
}
