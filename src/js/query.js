export const query = async (urlQuery) => {
  const response = await fetch(urlQuery);

  const data = await response.json();
  //console.log(data);
  return data;
};
