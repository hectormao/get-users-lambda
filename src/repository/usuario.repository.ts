import { inject, injectable } from "inversify";
import { Pool } from "mariadb";
import TYPES from "../inversify/types";
import { User } from "../types/types";

const sqlstring = require("sqlstring");

@injectable()
class UsuarioRepository {
  constructor(@inject(TYPES.DBPool) private readonly pool: Pool) {}

  public async getUsers(filters: any): Promise<User[]> {
    let conn;
    try {
      conn = await this.pool.getConnection();

      let sqlStatement: string = "SELECT * from usuarios";
      const fields: string[] = Object.keys(filters);
      if (fields.length > 0) {
        const where: string = fields
          .map((f) => `${f} = ${sqlstring.escape(filters[f])}`)
          .join(" and ");

        sqlStatement = `${sqlStatement} where ${where}`;
      }
      const rows = await conn.query(sqlStatement);

      return rows as User[];
    } finally {
      if (conn) conn.release();
    }
  }
}

export { UsuarioRepository };
