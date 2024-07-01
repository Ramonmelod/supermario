export const query = async (urlQuery) => {
  const response = await fetch(urlQuery) //captura dos dados em json da api de leitura e registro de recordes
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro na solicitação da API");
      }

      return res.json().then((data) => {});
    });

  return response;
};

/*
export const query = async (urlQuery) => {
  const response = await fetch(urlQuery) //captura dos dados em json da api de leitura e registro de recordes
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro na solicitação da API");
      }

      return res.json();
    });

  return response;
};*/
