const email = document.querySelector("#email")
const pass = document.querySelector("#pass")

const nomeCreate = document.querySelector("#nome-create")
const emailCreate = document.querySelector("#email-create")
const numeroCreate = document.querySelector("#numero-create")
const senhaCreate = document.querySelector("#senha-create")
const senhaCreateT = document.querySelector("#senhaT-create")

const resCad = document.querySelector("#res-cad")
document.addEventListener("click", async (e)=>{
  
    if(e.target.id === "login"){ login(e) }
    if(e.target.id === "email" || e.target.id == "pass" ) { res("") }

    if(e.target.id === "active-btn"){
      register()
    }
  
})

pass.addEventListener("keypress", async(e)=>{  
    if(e.key === "Enter"){ login(e) }

})

const login = async ( e ) =>{
    res(`<span class="loader"></span>`)
    
    let dados = {
        email : email.value,
        pass : pass.value,
        action: e.target.textContent || "ENTER",
        screen_w: window.innerWidth,
        screen_h: window.innerHeight
    }

    const response = await fetch(domain+"/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(dados)
    })
    const data = await response.json();

    if(!response.ok){ 
        console.log("Dados nao preenchidos corretamente")
        res(data.message)
     };
    

    if(response.ok){ window.location.href = "/painel/";}
   
    return data;
}

function res(msg){
    document.querySelector("#res").innerHTML = msg
}


async function checkIfLogged() {
  try {
    const response = await fetch(domain+"/auth-check", {
      credentials: "include"
    });

    if (response.ok) {
      window.location.href = "/painel/";
    }
  } catch (err) {
    // se der erro, apenas permanece no login
  }
}

checkIfLogged();


const register = async () =>{
  resCad.innerHTML = `<span class="loader"></span>`

  let usuario = {
    nome : nomeCreate.value,
    email : emailCreate.value,
    numero : numeroCreate.value,
    senha : senhaCreate.value,
    senhaT: senhaCreateT.value
  }
  const response = await fetch(domain+"/cadastro",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(usuario)
  })
  if(!response.ok){console.error("problema no servidor")}

  const data = await response.json()
  console.log(data)

  resCad.innerHTML = data.valid.msg

  if(data.cad){
    resCad.innerHTML =  `<span class="loader"></span>`
    resCad.innerHTML = `<div class="overlay" id="overlay">
  <div class="popup">
    <span class="close" onclick="fecharPopup()">✕</span>

    <h2 class="titulo">SECURE_ACCESS</h2>

    <p class="mensagem">
       SISTEMA<br>
      Conta criada com sucesso.<br>
      Faça login para continuar.
    </p>

    <button onclick="fecharPopup()">CONTINUAR</button>
  </div>
</div>`

setTimeout(() => {
  location.reload()
}, 3000);
    
  }
  console.log(data)
  
}
