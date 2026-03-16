
const paymentModal = document.querySelector("#paymentModal")
const loadPix = document.querySelector(".load-pix")
const pixCont = document.querySelector(".pix-cont")

const infoCad = document.querySelector("#info-cad")

document.addEventListener("click",(e)=>{
    if(e.target.id ==="plan-btn"){
        paymentModal.style.display = "inherit"
        cadPlan()
        
    }

    if(e.target.id === "close-pix-btn"){
        paymentModal.style.display = "none"
        location.reload()
    }
})

async function cadPlan(){
    const response = await fetch(domain+"/payment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({plan:"/plan"})
    })

    const data = await response.json()
    
    controlModal(data)
    return data
}


function controlModal(data){
      
    if(data.erro){
        return infoCad.innerText = data.msg
    }

    const monitorPix = setInterval(() => {
        verificarPix(monitorPix)
    }, 2000);


    paymentModal.innerHTML = `
        <div class="pix-cont">
               <button id="close-pix-btn">✕</button>

                <div id="pix-title">
                    <h2>
                        <p>Semanal</p>
                        <p>R$49,90</p>
                    </h2>
                </div>

                <div id="qrcode-cont" >
                    <img width="40%" style="border-radius: 10px;"
                        src="data:image/png;base64,${data.qrcode_64}">

                </div>

                <div id="copy-cont">
                    <p>${data.qr_code}</p>
                </div>
                <button id="copy-btn">COPIAR</button>

            </div>
    
    `

}

async function verificarPix(monitorPix){
    const res = await fetch(domain+"/check-pix",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"

    })

    const data = await res.json()

    if(data.ativo){
        clearInterval(monitorPix)
        alert("Pago com sucesso! vamos te redirecionar")
        location.reload()
    }
    
    
}


