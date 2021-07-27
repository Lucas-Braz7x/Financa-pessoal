class Despesas{
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;

    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados(){
    for(let i in this){
      if(this[i] == undefined || this[i] == null || this[i] == ''){
        return false;
      }
    }
    return true
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
  recuperarRegistros(){
    let id = localStorage.getItem('id');
    let despesas = [];

    for(let i = 1; i <= id; i++){
      let despesa = JSON.parse(localStorage.getItem(i));
      
      if(despesa === null ){
        continue;
      }  
      despesas.push(despesa);
    }
    return despesas;
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

  if(despesa.validarDados()){
    bancoDados.gravar(despesa);
    $('#sucessoGravacao').modal('show');
    ano.value = '';
    mes.value = '';
    dia .value = '';
    tipo.value = '';
    descricao.value = '';
    valor.value = '';
  }else{
    $('#erroGravacao').modal('show');
  }
    
}

function carregaDespesas(){
  let despesas = Array();

  despesas = bancoDados.recuperarRegistros();

  let listaDespesas = document.getElementById('listaDespesas');
  despesas.forEach(d =>{
    //Criando linhas e colunas na table 
    let linha = listaDespesas.insertRow();
    linha.insertCell(0).innerHTML = `${d.dia}/0${d.mes}/${d.ano}`;
    switch(parseInt(d.tipo)){
      case 1: d.tipo = 'Alimentação'
        break;
      case 2: d.tipo = 'Educação'
        break;
      case 3: d.tipo = 'Lazer'
        break;
      case 4: d.tipo = 'Saúde'
        break;
      case 5: d.tipo = 'Transporte'
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo;

    linha.insertCell(2).innerHTML = d.descricao;
    linha.insertCell(3).innerHTML = d.valor;
    
  })
  
}