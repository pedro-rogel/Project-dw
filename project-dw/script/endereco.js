const url = "https://go-wash-api.onrender.com/api/auth/address";

const cadastroEndereco = async () => {
  let title = document.querySelector("#title").value;
  let cep = document.querySelector("#CEP").value;
  let address = document.querySelector("#address").value;
  let number = document.querySelector("#number").value;
  let complement = document.querySelector("#complement").value;

  if (!title) {
    alert("Passe um valor para o campo title!");
    return;
  }
  if (!cep) {
    alert("Passe um valor para o campo cep!");
    return;
  }
  if (!address) {
    alert("Passe um valor para o campo address!");
    return;
  }
  if (!number) {
    alert("Passe um valor para o campo number!");
    return;
  }

  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access_token) {
    alert("Usuário não está autenticado. Faça o login novamente. ");
  }

  let api = await fetch(url, {
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
  if (api.ok) {
    let resp = await api.json();
    console.log(resp);
    alert("Endereço Cadastrado com sucesso.");
    window.location.href = "../view/home.html";
  } else {
    let respErro = await api.json();
    if (respErro.data.errors) {
      if (respErro.data.errors.cep) {
        alert(respErro.data.errors.cep);
        console.log(respErro.data.errors.cep);
      }
      if (respErro.data.errors.address) {
        alert(respErro.data.errors.address);
        console.log(respErro.data.errors.address);
      }
      if (respErro.data.errors.number) {
        alert(respErro.data.errors.number);
        console.log(respErro.data.errors.number);
      }
      if (respErro.data.errors.title) {
        alert(respErro.data.errors.title);
        console.log(respErro.data.errors.title);
      }
    }
  }
};
const botaoEnviar = document.querySelector(".botao");
botaoEnviar.addEventListener('click', cadastroEndereco);

