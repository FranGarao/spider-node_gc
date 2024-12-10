import {Sequelize} from "sequelize";
import config from '../config/database.js';
import development from "../config/database.js";

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,
  }
);

export default sequelize;