
class Bd {
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id',0)
        }
    }

    GetproximoId(){
        let proximoId = localStorage.getItem('id')
       return parseInt(proximoId) + 1
    }
    gravar(dados){
       
       let id = this.GetproximoId()

       localStorage.setItem(id, JSON.stringify(dados))

       localStorage.setItem('id', id)

    }
    recuperarTarefa(){

     let Arreytarefas = Array()

     let id = localStorage.getItem('id')

     

     for(let i = 1; i <= id ; i++){
        let tarefa = JSON.parse(localStorage.getItem(i))
        
        if(tarefa === null){
            continue
        }

        tarefa.id = i
        Arreytarefas.push(tarefa)

        
     }
     
     return Arreytarefas
     
    }

    remove(id){
        localStorage.removeItem(id)
    }
   
}

class Tarefa {
    constructor(){  
        

    }

    start(){
      let dados = this.recebeDados() 
      if(this.validaCampo(dados)){
        bd.gravar(dados)
      }

      this.limpar()
      
    }
    carregaColsulta(){
        let tarefas = Array()
        tarefas = bd.recuperarTarefa()
        let tbody = document.getElementById('tbody')
        let idF = 0

        const today = new Date().getDate();
        
        const mes = new Date().getMonth() + 1;
        
        const ano = new Date().getFullYear();
        
              

        tarefas.forEach(function(d){
          idF++
          let tr = tbody.insertRow()

           tr.insertCell(0).innerHTML = idF
           tr.insertCell(1).innerHTML = `${today < 10 ? '0'+today : today}/${mes < 10 ? '0'+mes : mes}/${ano}`
           tr.insertCell(2).innerHTML = d.nome
           tr.insertCell(3).innerHTML = `${d.diaG}/${d.mesG}/${d.anoG}`
           let detalhes = tr.insertCell(4)
           let i = document.createElement('i')
           let iL = document.createElement('i')
           let btn = document.createElement('button')
           let btnL = document.createElement('button')
           
                  
           btnL.appendChild(i)
           i.classList.add('fa-solid')
           i.classList.add('fa-circle-info')
           i.classList.add('fa-xl')

           btnL.id = d.id
          
           detalhes.appendChild(btnL)
           btnL.onclick = function(){
            
            let tela = document.getElementById('container').innerHTML = `<strong> NOME: </strong> <br/>  ${d.nome} <br/> <br/>  <strong> DATA: </strong> <br/> ${today < 10 ? '0'+today : today}/${mes < 10 ? '0'+mes : mes}/${ano} <br/> <br/> <strong> AGENTADO PARA: </strong>  <br/> ${d.diaG}/${d.mesG}/${d.anoG} <br/> <br/>  <strong> DESCRIÇÃO: </strong>  <br/> ${d.desc}`
            
            let telaSec = document.getElementById('vol')
            let btn = document.createElement('a')
            telaSec.appendChild(btn)  
            btn.innerText = 'Voltar'     
            btn.href ='index.html'             
            telaSec.innerHTML += btn
           }

           btn.classList.add('btn')
           btnL.classList.add('btn')

           btn.appendChild(iL)
           iL.classList.add('fa-solid')
           iL.classList.add('fa-trash-can')
           iL.classList.add('fa-xl')

           detalhes.appendChild(btn)
           btn.id = `tarefa_${d.id}`


           btn.onclick = function(){

            let id = this.id.replace('tarefa_','')
            
            bd.remove(id)
            window.location.reload()
            
           }
          

        })
        
    }
    
    limpar(){
         document.getElementById('descricao').value = ''
         document.getElementById('nome').value =''
         document.getElementById('diag').value =''
         document.getElementById('mesg').value =''
         document.getElementById('anog').value =''
    }
   
    recebeDados(){
        let dados = {
            desc: document.getElementById('descricao').value,
            nome: document.getElementById('nome').value,
            diaG: document.getElementById('diag').value,
            mesG: document.getElementById('mesg').value,
            anoG: document.getElementById('anog').value,
            
        }

        return dados
    }
    validaCampo(dados){
        let msg = ''

        if(dados.nome == ''){
            msg += 'Nome não indentificado \n'
        }
       
        if((dados.diaG == '')||(dados.mesG == '')||(dados.anoG == '')){
            msg += 'Data de Agendamento não indentificada \n'
        }

        if(dados.desc == ''){
            msg += 'Descrição não indentificada \n'
        }
      

        if(msg != ''){
            alert(msg)
            return false

        }

        return true
    }
}
let bd = new Bd()
let tarefa = new Tarefa()
