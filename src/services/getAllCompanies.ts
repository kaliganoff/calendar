async function getAllCompanies(offset: number) {
  const response = await fetch(
    "http://devapp.bonusmoney.pro/mobileapp/getAllCompaniesLong",
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
  return json.companies;
}

export default getAllCompanies;
