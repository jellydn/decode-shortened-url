import LRUCache from "https://deno.land/x/lru_cache/mod.ts";

// create a LRU cache with max size of 10 items
const cache = new LRUCache<string, string>(10);

// get real URL from a shortened URL
export async function getRealURL(shortURL: string) {
  const foundUrl = cache.get(shortURL);
  if (foundUrl) {
    return foundUrl;
  }

  const response = await fetch(shortURL, {
    redirect: "manual",
  });
  const finalUrl = response.headers.get("location");
  if (!finalUrl) {
    throw new Error("No location header found");
  }

  // cancel the request after getting the location header
  response.body?.cancel();

  cache.set(shortURL, finalUrl);

  return finalUrl;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  getRealURL("https://t.co/aARSWrWCYr").then(console.log)
    .catch(
      console.error,
    );
}
