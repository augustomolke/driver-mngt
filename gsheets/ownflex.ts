const api_url = process.env.GSHEET_OWNFLEX_URL;

export const getCeps = async () => {
  const body = JSON.stringify({
    method: "GET",
    sheet: "ceps",
    key: process.env.SECRET,
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  const ceps = await result.json();

  return ceps.data || [];
};
