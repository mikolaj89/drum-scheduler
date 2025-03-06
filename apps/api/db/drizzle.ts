import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { load } from "jsr:@std/dotenv";
import {
  exercisesSchema,
  categoriesSchema,
  usersSchema,
  sessionsSchema,
  sessionexercisesSchema,
} from "./schema.ts";
import { categoriesRelations, exercisesRelations } from "./relations.ts";

exercisesSchema.$inferSelect

const env = await load();
const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: env.DB_URL,
  }),
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
