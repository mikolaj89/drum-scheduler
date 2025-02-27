// import { Pool } from "postgres";
// import { load } from "jsr:@std/dotenv";

// const env = await load();

// const pool = new Pool({
//   user: env.DB_USER,
//   password: env.DB_PASSWORD,
//   database: env.DB_NAME,
//   hostname: env.DB_HOST,
//   port: env.PORT,

// }, 10); // 3 connections in the pool

// export async function query(sql: string, params: unknown[] = []) {
//   const client = await pool.connect();
//   try {
//     return await client.queryObject(sql, params);
//   } finally {
//     client.release();
//   }
// }
