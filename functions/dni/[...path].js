export async function onRequest(context) {
  const { env, params } = context;

  // captura: /dni/imagen.png
  const key = params.path.join("/");

  // busca en R2
  const object = await env.ZHAEND_BUCKET.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType || "image/png",
      "Cache-Control": "public, max-age=31536000"
    }
  });
}
