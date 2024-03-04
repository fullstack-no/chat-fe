export async function requestServer(path: string, method: string, body?: any) {
  const repsonse = await fetch(`${process.env.REACT_APP_SERVER_URL}/${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  const data = repsonse.json();
  return data;
}
