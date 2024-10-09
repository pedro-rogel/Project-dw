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
    li.innerHTML = ` <div class="informacoes">
        <span>${endereco.title}</span>
        <span>${endereco.number}</span>
      </div>
      <img src="../img/img-fundo-index.jpg" alt="${endereco.title}" class="img" />
      <ul class="edicao">
        <li class="excluir-end">
          Excluir
          <a href="">
            <img src="../img/trash.svg" alt="Lixeira Excluir" />
          </a>
        </li>
        <li class="editar-end">
          Editar
          <a href=""><img src="../img/pencil.svg" alt="login Edição" /></a>
        </li>
      </ul>
      <p class="descricao">${endereco.address} - ${endereco.cep}</p>
    `;
    listaEndereco.appendChild(li);
  });

  const liAdd = document.createElement("li");
  liAdd.classList.add("cartao-endereco_add");
  liAdd.innerHTML = ` <div class="informacoes_add">
      <span>Adicionar Endereço</span>
    </div>


  <a  href="endereco.html">
      <svg
      class="svg"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
      />
    </svg>`;

  listaEndereco.appendChild(liAdd);
};

const urlGet = "https://go-wash-api.onrender.com/api/auth/address";
const getEndereco = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access_token) {
    alert("Usuário não está autenticado. Faça o login novamente.");
    return;
  }

  let api = await fetch(urlGet, {
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
    alert("erro");
  }
};

document.addEventListener("DOMContentLoaded", getEndereco);
