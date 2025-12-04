import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { load } from "jsr:@std/dotenv";
import {
 exercisesSchema,
 categoriesSchema,
 usersSchema,
 sessionsSchema,
 sessionexercisesSchema,
} from "../db/schema.ts";
import { categoriesRelations, exercisesRelations } from "./relations.ts";
import { tryReadFile } from "../utils/try-read-file.ts";
import { parseDotenv } from "../utils/parse-dot-env.ts";


exercisesSchema.$inferSelect;

const envFiles = ["local.env"];
let env = {} as Record<string, string | undefined>;
let foundFrom: string | null = null;


 const parsed = await load();
 env = parsed;

 if (!env.DB_URL) {
 for (const file of envFiles) {
  try {
   const content = await tryReadFile(file);
   if (!content) continue;
   const parsed = parseDotenv(content);
   if (parsed.DB_URL) {
    env.DB_URL = parsed.DB_URL;
    foundFrom = file + " (direct read)";
    break;
   }
  } catch (_e) {
   // ignore
  }
 }
}

const { Pool } = pg;

const pool = new Pool({
 connectionString: env.DB_URL,
});

export const db = drizzle(pool, {
 schema: {
  exercisesSchema,
  exercisesRelations,
  categoriesRelations,
  categoriesSchema,
  usersSchema,
  sessionexercisesSchema,
  sessionsSchema,
 },
});

if (foundFrom) {
 console.log(`DB_URL loaded from ${foundFrom}`);
} else {
 
 const maybeDeno = globalThis as unknown as {
  Deno?: { env?: { get?: (k: string) => string | undefined } };
 };
 if (maybeDeno.Deno?.env?.get && maybeDeno.Deno.env.get("DB_URL")) {
  console.log("DB_URL loaded from runtime Deno.env");
 }
}
