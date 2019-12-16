import { get } from "github.com/axetroy/deno_process/mod.ts";

console.log("current process information: ", await get(Deno.pid));
