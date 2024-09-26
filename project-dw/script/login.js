const url = "https://go-wash-api.onrender.com/api/login";
const login = async () => {
  let email = document.getElementsByClassName("emai");
  let senha = document.getElementsByClassName("senha");

  if (!email) {
    alert("Passe um valor para o campo email");
    return;
  }

  if (!senha) {
    alert("Passe um valor para o campo senha");
    return;
  }

  let api = fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: "xxxxxxxxxxx",
      email: "xxxxxxxxx@gmail.com",
      user_type_id: 1,
      password: "123456",
      cpf_cnpj: "62418247406",
      terms: 1,
      birthday: "2000-10-12",
    }),
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  let resp = await api.json() 

  if(pass)
    pass

};
