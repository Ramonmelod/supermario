export const query = async (urlQuery) => {
  try {
    const response = await fetch(urlQuery);
    if (!response.ok) {
      throw new Error("Erro na solicitação da API");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
