const urlBase = "https://go-wash-api.onrender.com/api/auth/address/";
const params = new URLSearchParams(window.location.search);
const addressId = params.get("id");
const url = `${urlBase}${addressId}`;
const user = JSON.parse(localStorage.getItem("user"));

const aparecerEndereco = async () => {
  const getEndereco = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  if (getEndereco.ok) {
    const resposta = await getEndereco.json();
    document.querySelector("#title").value = resposta.data.title;
    document.querySelector("#CEP").value = resposta.data.cep;
    document.querySelector("#address").value = resposta.data.address;
    document.querySelector("#number").value = resposta.data.number;
    document.querySelector("#complement").value = resposta.data.complement;
  } else {
    alert("Erro ao carregar dados do endereço.");
  }
};
window.addEventListener("load", aparecerEndereco);


const atualizarEndereco = async () => {
  const title = document.querySelector("#title").value;
  const cep = document.querySelector("#CEP").value;
  const address = document.querySelector("#address").value;
  const number = document.querySelector("#number").value;
  const complement = document.querySelector("#complement").value;

  if (!title && !cep && !address && !number) {
    alert("Passe valores para os campos solicitados.");
    return;
  }
  if (!title) {
    alert("Passe um valor para o campo Título!");
    return;
  }
  if (!cep) {
    alert("Passe um valor para o campo CEP!");
    return;
  }
  if (!address) {
    alert("Passe um valor para o campo Address!");
    return;
  }
  if (!number) {
    alert("Passe um valor para o campo Number!");
    return;
  }

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      cep: cep,
      address: address,
      number: number,
      complement: complement,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  });

  if (resp.ok) {
    alert("Endereço atualizado com sucesso.");
    window.location.href = "../view/home.html";
  } else {
    alert("Erro ao atualizar endereço.");
  };
};
const atualizar = document.querySelector("#botao-input");
atualizar.addEventListener("click", atualizarEndereco);