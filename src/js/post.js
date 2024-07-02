export const save = async (recordistaSave, pontosSave, urlPostSave) => {
  let nomeDigitado = {
    nome: recordistaSave,
    pontuacao: pontosSave,
  };
  let cabecalho = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nomeDigitado),
  };

  fetch(urlPostSave, cabecalho).catch((error) => {
    console.error("Erro na solicitação:", error);
  });
};
