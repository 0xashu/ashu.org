export async function GET() {
  const data = {
    webcredentials: {
      apps: ["74V7N6MW3W.org.ashu.murphy"],
    },
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
