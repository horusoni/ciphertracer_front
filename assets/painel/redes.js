const resRedes = document.querySelector("#res-redes")

document.querySelector("#buscar-redes").addEventListener("click", async () => {

    resRedes.innerHTML = `
        <p>Este módulo pode levar alguns minutos para concluir. Aproveite para pegar um café ☕ enquanto isso.</p>
        <br>
        <span class="loader"></span>
    `

    listarBuscaRedes()

})

async function buscarRedes() {

    let socialName = document.querySelector("#social-name").value

    const res = await fetch(domain + "/redes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ userName: socialName })
    })

    const data = await res.json()

    return data
}

async function listarBuscaRedes() {

    const data = await buscarRedes()

    if (!data.ativo && data.message) {
        resRedes.innerText = data.message
        return
    }

    if (data.erro) {
        resRedes.innerHTML = data.erro
        return
    }

    resFunc(data)

}

function resFunc(dados) {

    const username = dados.userName || dados.email || "Desconhecido"

    let html = `
        <p>
        <br>
        <i>USERNAME: ${username}</i>
        </p>
    `

    for (let rede in dados.resultados) {

        const url = dados.resultados[rede]

        if (url !== null && url !== undefined) {

            html += `
                <div>
                    <p>
                        <strong>${rede.toUpperCase()}</strong><br>
                        <a target="_blank" href="${url}">
                            ${url}
                        </a>
                    </p>
                    <br>
                </div>
            `
        }
    }

    resRedes.innerHTML = html

}