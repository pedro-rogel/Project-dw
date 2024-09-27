const url = "https://go-wash-api.onrender.com/api/login";
const login = async () => {
  let email = document.getElementById("emai");
  let senha = document.getElementById("senha");

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
      name: "xxxxxxxxxxx",
      email: email,
      user_type_id: 1,
      password: senha, 
      cpf_cnpj: "62418247406",
      terms: 1,
      birthday: "2000-10-12",
    }),
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj'
    },
  });
  
  let resp = await api.json();
  

  if(pass)
    passd

};
