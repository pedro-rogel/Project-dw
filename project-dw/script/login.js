const url = "https://go-wash-api.onrender.com/api/login";
const botao = document.getElementById("botao-input");
const login = async () => {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("password").value;

  if (!email) {
    alert("Passe um valor para o campo email");
    return;
  }

  if (!senha) {
    alert("Passe um valor para o campo senha");
    return;
  }

  let api = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      user_type_id: 1,
      password: senha,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (api.ok) {
    let resp = await api.json();
    console.log(resp);
    localStorage.setItem("user", JSON.stringify(resp));
    alert('Login bem sucedido');
    window.location.href = "../view/home.html";
  } else {
    let respErro = await api.json();
    alert(respErro.data.errors);
  }
};

const cadastroEndereco = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user.access_token);
};

botao.addEventListener("click", login);
