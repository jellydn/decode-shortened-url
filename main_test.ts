import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { getRealURL } from "./main.ts";

Deno.test("should get real url from shortened urls", async function getRealUrlTest() {
  assertEquals(
    await getRealURL("https://t.co/aARSWrWCYr"),
    "https://twitter.com/DrJimFan/status/1638560161123151872/video/1",
  );
  assertEquals(
    await getRealURL("https://t.co/DYFFG9dnLR"),
    "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
  );
  assertEquals(
    await getRealURL("https://t.co/IKuxkh8CWa"),
    "https://twitter.com/Carlillo/status/1591148366070747347/photo/1",
  );
});
