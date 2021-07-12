class Despesas{
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;

    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }
}

class BancoDados{
  
  constructor(){
    let id = localStorage.getItem('id');

    if(id === null){
      localStorage.setItem('id', 0);
    }
  }

  getProximoId(){
    let proximoId = localStorage.getItem('id');
    return parseInt(proximoId) + 1;
  }
  
  gravar(despesaAtual){
    //localStorage.setItem('despesa', JSON.stringify(despesaAtual));
    let id =this.getProximoId();

    localStorage.setItem(id, JSON.stringify(despesaAtual));

    localStorage.setItem('id', id);
  }
}

let bancoDados = new BancoDados();

function cadastrarDespesas(){
  let ano = document.getElementById('ano');
  let mes = document.getElementById('mes');
  let dia = document.getElementById('dia');
  
  let tipo = document.getElementById('tipo');
  let descricao = document.getElementById('descricao');
  let valor = document.getElementById('valor');

  let despesa = new Despesas(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )

 bancoDados.gravar(despesa)
}

