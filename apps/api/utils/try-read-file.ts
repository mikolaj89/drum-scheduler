export const tryReadFile = async (path: string): Promise<string | null> => {
  try {
    if (typeof (globalThis as any).Deno?.readTextFile === "function") {
      return await (globalThis as any).Deno.readTextFile(path);
    }
    const fs = require("fs");
    return fs.readFileSync(path, "utf8");
  } catch (_e) {
    return null;
  }
}

