const https = require("https");

let url_presidente_primeiro_turno =
  "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json";

let url_presidente_segundo_turno =
  "https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json";

https
  .get(url_presidente_primeiro_turno, (resp) => {
    //variavel para guardar o codigo do site
    let data = "";

    //adiciona conteúdo da web na variavel data
    resp.on("data", (chunk) => {
      data += chunk;
    });

    //bloco que possui código que será executado quando chegar a resposta final
    resp.on("end", () => {
      let resultado_eleicao = JSON.parse(data);

      let sessoes_totais = resultado_eleicao.s;
      let total_votos_primeiro_turno = resultado_eleicao.c;
      let obj_candidatos_primeiro_turno = resultado_eleicao.cand;

      let porcentagem_totalizada = resultado_eleicao.pst;
      console.log(
        "Porcentagem de urnas apuradas da eleição: " +
          porcentagem_totalizada +
          "%"
      );

      for (var i = 0; i <= obj_candidatos_primeiro_turno.length - 1; i++) {
        let obj_candidato = obj_candidatos_primeiro_turno[i];

        let votos_validos = obj_candidato.pvap;
        let vice_presidente = obj_candidato.nv;
        let coligacao = obj_candidato.cc;
        let nome_candidato = obj_candidato.nm;

        console.log("votos validos: " + votos_validos + "%");
        console.log("vice presidente: " + vice_presidente);
        console.log("coligacao: " + coligacao);
        console.log("nome candidato: " + nome_candidato);
        console.log("---------------------------------------------------");
      }
    });
  })
  .on("error", (error) => {
    console.log("Error: " + error.message);
  });
