document.querySelector("#exit").addEventListener("click",()=>{
    logout()
})

async function buscarUsuario() {
    const response = await fetch(domain+"/user",{
        method:"GET",
        credentials:"include"
    })
    const data = await response.json()
    return data
}

async function buscarLogs() {
    const response = await fetch(domain+"/logs",{
        method:"GET",
        credentials:"include"
    })
    const data = await response.json()
    return data
}

async function listInfoUser(){
    const user = await buscarUsuario()
    console.log(user)
    let nome = user.user.nome.split(" ")[0] 
    let ip = user.atualIp
    let statusPlan = user.plano
    let dataExp = user.paymentUser[0].data_exp
    document.querySelector("#username").textContent = `${nome}`
    document.querySelector("#ip").textContent = ip
    document.querySelectorAll(".plan")[0].innerText = dataExp.split("T")[0]
    document.querySelectorAll(".plan")[1].innerText = statusPlan
}
listInfoUser()

async function listLogs(){
    const logTable = document.querySelector("#log-table");

    let data = await buscarLogs();
    let logs = data.logs
    for(i in logs){
        logTable.innerHTML += ` <tbody>
                                <tr>
                                    <td>${logs[i].data.replace("T", "|").replace(".", " ").split(" ")[0]}</td>
                                    <td></td>
                                    <td style="color:#0f0; cursor: pointer;">${logs[i].ip}</td>
                                    <td>${logs[i].userAgent}</td>
                                </tr>
                                 </tbody>
    `
    }
}
listLogs()



async function logout() {
    const res = await fetch(domain+ "/exit",{
        headers:{"Content-Type":"application/json"},
        credentials:"include"
    })

    const data = await res.json()
    if(res.ok){
        setTimeout(()=>{
            location.reload()
        },1000)
    }

    return data
    
}
