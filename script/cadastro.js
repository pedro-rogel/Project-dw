const url = "https://go-wash-api.onrender.com/api/user";
async function cadastro() {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let cpf = document.querySelector("#cpf-cnpj").value;
  let senha = document.querySelector("#password").value;
  let data = document.querySelector("#date").value;
  let termos = document.querySelector("#terms").checked;

  if (!name) {
    alert("O campo nome está vazio, passe um algun valor válido");
    return;
  } else if (!email) {
    alert("O campo email está vazio, passe algum valor válido.");
    return;
  } else if (!senha) {
    alert("O campo Senha está vazio, passe algum valor válido.");
    return;
  } else if (!cpf) {
    alert("O campo CPF/CNPJ está vazio, passe algum valor válido.");
    return;
  } else if (!data) {
    alert("O campo Data está vazio, passe algum valor válido.");
    return;
  } else if (!termos) {
    alert("Aceite os termos para prosseguir. ");
    return;
  } else {
    let api = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        user_type_id: 1,
        password: senha,
        cpf_cnpj: cpf,
        terms: termos,
        birthday: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resp = await api.json();

    if (resp.data.errors) {
      if (resp.data.errors.cpf_cnpj) {
        alert(resp.data.errors.cpf_cnpj);
        console.log(resp.data.errors.cpf_cnpj);
        return;
      } else {
        if (resp.data.errors == "cpf_cnpj invalid") {
          alert(resp.data.errors);
          console.log(resp.data.errors);
          return;
        }
      }
      if (resp.data.errors.email) {
        alert(resp.data.errors.email);
        console.log(resp.data.errors.email);
        return;
      }
      if (resp.data.errors.birthday) {
        alert(resp.data.errors.birthday);
        console.log(resp.data.errors.birthday);
        return;
      }
      if (resp.data.errors.password) {
        alert(resp.data.errors.password);
        console.log(resp.data.errors.password);
        return;
      }

      if (resp.data.errors.name) {
        alert(resp.data.errors.name);
        console.log(resp.data.errors.name);
        return;
      }
      if (resp.data.errors.terms) {
        alert(resp.data.errors.terms);
        console.log(resp.data.errors.terms);
        return;
      }
    } else {
      if (resp.data) {
        alert(resp.data);
        window.location.href = "../view/login.html";
        return;
      }
    }
  }
}
