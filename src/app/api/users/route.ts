export const revalidate = 60

 
export async function GET(req: Request) {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()

  const { searchParams } = new URL(req.url);

  console.log('searchParams', req);
 
  return Response.json(posts)
}


