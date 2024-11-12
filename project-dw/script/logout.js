const urlapi = 'https://go-wash-api.onrender.com/api/auth/logout'
const user = JSON.parse(localStorage.getItem("user"));
const logout = async () => {
    if (!user || !user.access_token) {
        alert("Usuário não está autenticado.");
        window.location.href = '/project-dw/index.html';
        return;
      };
    let apiLogout = await fetch(urlapi,{
        method: 'POST',
        headers: {
            'Content-Type':"application/json",
            Authorization: `Bearer ${user.access_token}`,
        },
    });

    if (apiLogout.ok) {
        let resp = await apiLogout.json();
        console.log(resp);
        alert(resp.data);
        localStorage.removeItem('user');
        window.location.href = '../index.html'
        return;

    } else {
        let repERRO = await apiLogout.json();
        alert(repERRO.data)
        return;
    };
};
