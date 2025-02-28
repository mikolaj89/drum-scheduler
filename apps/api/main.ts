import { Application } from "@oak/oak";
import exercisesRouter from "./routes/exercises.ts";
import sessionsRouter from "./routes/sessions.ts";
import sessionsExercisesRouter from "./routes/sessionExercises.ts";
import categoriesRouter from "./routes/categories.ts";


const app = new Application();

// Middleware for logging requests
app.use(async (context, next) => {
  console.log(`${context.request.method} ${context.request.url}`);
  await next();
});

// Register routers
app.use(exercisesRouter.routes());
app.use(exercisesRouter.allowedMethods());
app.use(sessionsRouter.routes());
app.use(sessionsRouter.allowedMethods());
app.use(sessionsExercisesRouter.routes());
app.use(sessionsExercisesRouter.allowedMethods());
app.use(categoriesRouter.routes());
app.use(categoriesRouter.allowedMethods());

// Start the server
const PORT = 8000;
console.log(`Server is running on http://localhost:${PORT}`);

await app.listen({ port: PORT });

