export const MapperVolumetriaToModel = {
    MapearToModel:function(dados){
        let  dadosModel = {
            ResultPesq: {
              totalConsultaAcoes: {
                quantidade: "0",
                valor: "0"
              },
              totalVolumetriaConsumo: {
                quantidade: "0",
                valor: "0"
              },
              totalPreditivoConsumo: {
                quantidade: "0",
                valor: "0"
              },
              justica: [
                {
                  Nome: "Estadual",
                  Qtd: "0"
                },
                {
                  Nome: "Federal",
                  Qtd: "0"
                },
                {
                  Nome: "Trabalhista",
                  Qtd: "0"
                }
              ],
              parte: [
                {
                  Nome: "reu",
                  Qtd: "0"
                },
                {
                  Nome: "autor",
                  Qtd: "0"
                }
              ],
              UF: [
                {
                  Nome: "AC",
                  Qtd: "0"
                },
                {
                  Nome: "AL",
                  Qtd: "0"
                },
                {
                  Nome: "AM",
                  Qtd: "0"
                },
                {
                  Nome: "AP",
                  Qtd: "0"
                },
                {
                  Nome: "BA",
                  Qtd: "0"
                },
                {
                  Nome: "PE",
                  Qtd: "0"
                },
                {
                  Nome: "CE",
                  Qtd: "0"
                },
                {
                  Nome: "DF",
                  Qtd: "0"
                },
                {
                  Nome: "ES",
                  Qtd: "0"
                },
                {
                  Nome: "GO",
                  Qtd: "0"
                },
        
                {
                  Nome: "MA",
                  Qtd: "0"
                },
                {
                  Nome: "MG",
                  Qtd: "0"
                },
                {
                  Nome: "MS",
                  Qtd: "0"
                },
                {
                  Nome: "MT",
                  Qtd: "0"
                },
                {
                  Nome: "PA",
                  Qtd: "0"
                },
                {
                  Nome: "PB",
                  Qtd: "0"
                },
                {
                  Nome: "PI",
                  Qtd: "0"
                },
                {
                  Nome: "PR",
                  Qtd: "0"
                },
                {
                  Nome: "RJ",
                  Qtd: "0"
                },
                {
                  Nome: "RN",
                  Qtd: "0"
                },
                {
                  Nome: "RO",
                  Qtd: "0"
                },
                {
                  Nome: "RR",
                  Qtd: "0"
                },
                {
                  Nome: "RS",
                  Qtd: "0"
                },
                {
                  Nome: "SC",
                  Qtd: "0"
                },
                {
                  Nome: "SE",
                  Qtd: "0"
                },
                {
                  Nome: "SP",
                  Qtd: "0"
                },
                {
                  Nome: "TO",
                  Qtd: "0"
                }
              ]
            }
          };
          //Transformando para objeto adicionando no model de volumetria
          
          dadosModel.ResultPesq.totalConsultaAcoes.quantidade = dados.totalConsultaAcoes.quantidade
          dadosModel.ResultPesq.totalConsultaAcoes.valor = dados.totalConsultaAcoes.valor
          dadosModel.ResultPesq.totalVolumetriaConsumo.quantidade = dados.totalVolumetriaConsumo.quantidade
          dadosModel.ResultPesq.totalVolumetriaConsumo.valor = dados.totalVolumetriaConsumo.valor
          dadosModel.ResultPesq.totalPreditivoConsumo.quantidade = dados.totalPreditivoConsumo.quantidade
          dadosModel.ResultPesq.totalPreditivoConsumo.valor = dados.totalPreditivoConsumo.valor


          dadosModel.ResultPesq.justica[0].Qtd = dados.justica.estadual
          dadosModel.ResultPesq.justica[1].Qtd = dados.justica.federal
          dadosModel.ResultPesq.justica[2].Qtd = dados.justica.trabalhista

          dadosModel.ResultPesq.parte[0].Qtd = dados.partes.reu
          dadosModel.ResultPesq.parte[1].Qtd = dados.partes.autor

          
          for (const elem of dados.uf) {
            dadosModel.ResultPesq.UF.filter(y=> y.Nome == elem.uf_cod)[0].Qtd = elem.count
          }
          return dadosModel
        

    }
    
}