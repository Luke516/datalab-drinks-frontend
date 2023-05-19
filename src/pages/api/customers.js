
import { getCustomers } from "../../modules/backend/customer";


export default async function handler(req, res) {
  const customers = await getCustomers();
  res.status(200).json(customers);
}
