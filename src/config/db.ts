// cspell: ignore postgresql, postgres, oregon, rlks6lffphdx, cqto, qbbv

import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Product.model";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Product],
  logging: false,
});

export default db;
