// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMenu, getMenuRemote } from "../../modules/api/drinkMenu"


export default async function handler(req, res) {
  console.log("QWQ");
  console.log(await getMenuRemote());
  const menu = await getMenuRemote();
  res.status(200).json(menu);
}
