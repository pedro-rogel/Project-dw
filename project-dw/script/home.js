const urlBase = "https://go-wash-api.onrender.com/api/auth/address/";
const params = new URLSearchParams(window.location.search);
const addressId = params.get("id");
const url = `${urlBase}${addressId}`;

const addEndereco = document.querySelector(".svg");
addEndereco.addEventListener("click", () => {
  window.open("../view/endereco.html", "_blank");
});

const renderizarEnderecos = (end) => {
  const listaEndereco = document.querySelector(".listagem-endereco");

  listaEndereco.innerHTML = "";

  end.forEach((endereco) => {
    const li = document.createElement("li");
    li.classList.add("cartao-endereco");
    li.innerHTML = `
      <div class="informacoes">
        <span>${endereco.title}</span>
        <span>${endereco.number}</span>
      </div>
      <img src="../img/img-fundo-index.jpg" alt="${endereco.title}" class="img" />
      <ul class="edicao" id="${endereco.id}">
        <li class="excluir-end" data-id="${endereco.id}">
          Excluir
          <a href="#">
            <img src="../img/trash.svg" alt="Lixeira Excluir" />
          </a>
        </li>
        <li class="editar-end">
          <a href="../view/update-address.html?id=${endereco.id}">
            Editar 
            <img src="../img/pencil.svg" alt="login Edição" />
          </a>
        </li>
      </ul>
      <p class="descricao">${endereco.address} - ${endereco.cep}</p>
    `;
    listaEndereco.appendChild(li);
  });

  const liAdd = document.createElement("li");
  liAdd.classList.add("cartao-endereco_add");
  liAdd.innerHTML = ` 
    <div class="informacoes_add">
      <span>Adicionar Endereço</span>
    </div>
    <a href="endereco.html">
      <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
      </svg>
    </a>
  `;

  listaEndereco.appendChild(liAdd);

  
  const output = document.querySelector(".output");

  document.querySelectorAll(".excluir-end").forEach((botao) => {
    botao.addEventListener("click", async () => {
      let addressId = botao.getAttribute("data-id");

      output.classList.toggle("ativo");

      output.innerHTML = `<div class="card">
      <p>Deseja mesmo excluir esse endereço?</p>
      <div class="opcoes">
      <button id="sim">Sim</button>
      <button id="nao">Não</button>
      </div>
      </div>`;

      document.getElementById("sim").addEventListener("click", async () => {
        
        await deleteAddress(addressId);
        output.classList.toggle("ativo");
        output.innerHTML = "";
        
      });

      document.getElementById("nao").addEventListener("click", () => {
        output.innerHTML = "";
        output.classList.toggle("ativo")
      });
    }); 
  });
};

const getEndereco = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access_token) {
    alert("Usuário não está autenticado. Faça o login novamente.");
    window.location.href = '../view/login.html'
    return;
  }

  let api = await fetch(urlBase, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });

  if (api.ok) {
    let resp = await api.json();
    console.log(resp);
    renderizarEnderecos(resp.data);
  } else {
    alert("Erro ao carregar endereços.");
  }
};



const deleteAddress = async (addressId) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access_token){
    alert("Usuário não está autenticado. Faça o login novamente")
    window.location.href = '../view/login.html'
    return;
  }
  let response = await fetch(`${urlBase}${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });

  if (response.ok) {
    alert("Endereço excluído com sucesso!");
    getEndereco();    
  } else {
    alert("Erro ao excluir endereço!");
  }
};
document.addEventListener("DOMContentLoaded", getEndereco);