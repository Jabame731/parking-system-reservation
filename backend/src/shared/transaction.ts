import { PoolConnection } from "mysql2";
import { connection } from "../config/mysql.db";

export const withTransaction = async <T>(
  fn: (conn: PoolConnection) => Promise<T>
): Promise<T> => {
  const conn = await connection().getConnection();

  try {
    await conn.beginTransaction();
    const result = await fn(conn as any);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
