export async function handleRequest(request: Request): Promise<Response> {
  let { params, query, url } = request
  return new Response(`Hello world ${url} ${query} ${params}`)
}
