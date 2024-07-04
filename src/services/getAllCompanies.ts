async function getAllCompanies(offset: number) {
  const response = await fetch(
    "http://devapp.bonusmoney.pro/mobileapp/getAllCompanies",
    {
      method: "POST",
      headers: {
        TOKEN: "123",
      },
      body: JSON.stringify({
        offset,
        limit: 10,
      }),
    },
  );

  const json = await response.json();
  if (response.status === 400) throw new Error(response.statusText);
  if (response.status === 401) throw new Error("Ошибка авторизации");
  if (response.status === 500) throw new Error("Всё упало");
  return json.companies;
}

export default getAllCompanies;
