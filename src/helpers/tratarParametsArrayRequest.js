export function prepararParametrosArray(dados,nomeParametro){

    let parametros=""
    for (var i=0; i<dados.length; ++i) {
        if (parametros.indexOf('?') === -1) {
            parametros = parametros + `?${nomeParametro}[]=' + ${dados[i]}`;  
        }else {
            parametros = parametros + `&${nomeParametro}[]=' + ${dados[i]}`;
        }
    }
    return parametros
}

