export const query = async () => {
  const response = await fetch("https://blockchain.info/ticker");

  const data = await response.json();
  //console.log(data);
  return data;
};
