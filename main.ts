import LRUCache from "https://deno.land/x/lru_cache/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

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
  serve(async (req: Request) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const shortenedUrl = params.get("url");
    // thorw error if no url is provided
    if (!shortenedUrl) {
      // return 500 status code with error message
      return new Response("No url provided", {
        status: 400,
      });
    }

    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=UTF-8",
    });

    const url = await getRealURL(shortenedUrl);

    // return json response
    return new Response(JSON.stringify({ shortenedUrl, url }), {
      headers,
    });
  });
}
