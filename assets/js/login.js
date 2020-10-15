const loginForm = document.querySelector("#form-login");
const loginClosed = document.querySelector("#close");

if (loginForm) {
    const loginUsuario = document.querySelector("#user");
    const loginContrasenia = document.querySelector("#password");
    loginForm.addEventListener("submit", async(e) => {
        try {
            e.preventDefault();
            console.log("user pass : ", loginUsuario.value, loginContrasenia.value)
            if (loginUsuario.value == 'admin' && loginContrasenia.value == 'admin') {
                window.location = 'view/home.html';
            } else {
                alert('El usuario que ingreso es incorrecto');
            }
            loginForm.reset();
        } catch (error) {
            console.log(error);
        }
    });
}

function closedLogin() {
    try {
        window.location = '../index.html';
    } catch (error) {
        console.log(error);
    }
}


function reserv() {
    if (response.status == 200) {
        estado = true
        response.json()
    }
    if (response.status == 400) {
        submitContactFormMSG(estado, "No hay respuesta ", elemnto)
        console.log("estatus: ", typeof(response.status))
    }
}