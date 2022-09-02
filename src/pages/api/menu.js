// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getMenu } from "../../modules/api/drinkMenu"


export default async function handler(req, res) {
  console.log("QWQ");
  console.log(await getMenu());
  res.status(200).json({ name: 'QWQ' })
}
