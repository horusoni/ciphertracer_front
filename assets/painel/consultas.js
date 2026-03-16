const resEl = document.querySelector("#res-dados")
const loadCont = document.querySelector("#load-cont")


document.addEventListener("click", async (e)=>{
   
    if(e.target.id === "dados-btn"){
        loadCont.innerHTML = '<span class="loader"></span>'
        
        let respostaDados = await sendDado()
        let dados = respostaDados
       
        listarDados(dados)
    }
})


async function sendDado(){
    let dadoInput = document.querySelector("#dado")

    let dados = {
        valor : dadoInput.value
    }

    const response = await fetch(domain+"/dados",{
        method:"POST",
        headers:{ "Content-Type": "application/json"},
        credentials:"include",
        body:JSON.stringify(dados)
    })

    if(!response.ok) return {message:"Erro ao buscar dados, tente novamente mais tarde."}
    const data = await response.json()
    
    return data
}


function listarDados(dados){
    loadCont.innerHTML = ""
    resEl.innerHTML = ""

    if(!dados.length) return resEl.innerHTML = `<p style='text-align:center; color:red;' class='forbidden'>${dados.message}</p>`
    for(let i in dados){
        resEl.innerHTML += `
               <div class="card" style="grid-column: 1 / -1;">
    <div class="dossieContent">

        <div class="data-row">
            <span class="data-label">NOME_COMPLETO: ${dados[i].Nome_Completo}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">CPF: ${dados[i].CPF}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">DATA_NASCIMENTO: ${dados[i].Data_Nascimento}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">SEXO_GENERO: ${dados[i].Sexo_Genero}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">CNS: ${dados[i].cns ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">MAE: ${dados[i].mae ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">PAI: ${dados[i].pai ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">LOGRADOURO: ${dados[i].logradouro?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">NUMERO: ${dados[i].numero?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">BAIRRO: ${dados[i].bairro?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">CEP: ${dados[i].cep?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">MUNICIPIO: ${dados[i].municipio ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">MUNICIPIO_NASCIMENTO: ${dados[i].municipioNascimento ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">TELEFONE: ${dados[i].telefone ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">TELEFONE_SECUNDARIO: ${dados[i].telefoneSecundario ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">RG_NUMERO: ${dados[i].rgNumero ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">RG_ORGAO_EMISOR: ${dados[i].rgOrgaoEmisor ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">RG_UF: ${dados[i].rgUf ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

        <div class="data-row">
            <span class="data-label">RG_DATA_EMISSAO: ${dados[i].rgDataEmissao ?? "Não informado"}</span>
            <span class="status-tag"></span>
        </div>

    </div>
</div>
         
        `
    }
}