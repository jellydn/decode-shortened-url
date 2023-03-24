import { getRealURL } from "./main.ts";

Deno.bench(async function getVideo() {
  await getRealURL("https://t.co/aARSWrWCYr");
});

Deno.bench(async function getPhoto() {
  await getRealURL("https://t.co/IKuxkh8CWa");
});
