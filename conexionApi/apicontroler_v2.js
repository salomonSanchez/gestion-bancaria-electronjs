async function getToken() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2MDI1OTY5ODd9.vjJydTH1MRXZ7a_U4oxKKeuShBPeb2VEapAlbUhk3AY");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }
    const token = await fetch('https://microservicetransactionv2.herokuapp.com/api/v2/transaction/token', requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return token
}

async function loginToken() {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", "prueba@gmail.com");
    urlencoded.append("password", "123456789");

    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };
    const token = await fetch("https://apigesbanc.herokuapp.com/api/v1/login", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return token
}

async function CrearClientev2(cliente, elemento) {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", cliente.nombre);
    urlencoded.append("lastname", cliente.apellido);
    urlencoded.append("sex", cliente.sexo);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    fetch("https://apigesbanc.herokuapp.com/api/v1/createclient", requestOptions, elemento)
        .then(response => {
            validarRespuestaServidor(response, elemento)
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

async function getClientev2(cliente_id) {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const cliente = fetch(`https://apigesbanc.herokuapp.com/api/v1/showclient/${cliente_id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return cliente
}

async function getListClientesv2() {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);
    // console.log("header: ", `Bearer ${token.token}`)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const clientes = await fetch('https://apigesbanc.herokuapp.com/api/v1/listclients', requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

    return clientes
}

async function crearCuentav2(cuenta, elemento) {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var urlencoded = new URLSearchParams();
    urlencoded.append("number", cuenta.numero);
    urlencoded.append("type", cuenta.tipo);
    urlencoded.append("client_id", cuenta.cliente_id);
    urlencoded.append("amount", cuenta.monto);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://apigesbanc.herokuapp.com/api/v1/createaccount", requestOptions, elemento)
        .then(response => {
            validarRespuestaServidor(response, elemento)
        })
        .catch(error => console.log('error', error));
}

async function getCuentav2(cuenta_numero) {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const cuenta = await fetch(`https://apigesbanc.herokuapp.com/api/v1/showaccount/${cuenta_numero}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return cuenta
}

async function getListCuentasv2() {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const clientes = fetch('https://apigesbanc.herokuapp.com/api/v1/listaccounts', requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    return clientes
}

async function getSaldoCuentav2(cuenta_numero) {
    var token = await loginToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const saldo = fetch(`https://apigesbanc.herokuapp.com/api/v1/checkbalance/${cuenta_numero}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error))
    return saldo
}

async function DepositoTransaccionv2(transaccion, elemento) {
    var token = await getToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);


    var urlencoded = new URLSearchParams();
    urlencoded.append("account_id", transaccion.numero_cuenta);
    urlencoded.append("amount", transaccion.monto);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://microservicetransactionv2.herokuapp.com/api/v2/transaction/deposit", requestOptions, elemento)
        .then(response => {
            validarRespuestaServidor(response, elemento)
        })
        .catch(error => console.log('error', error));

}

async function RetirosTransaccionv2(transaccion, elemento) {
    var token = await getToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var urlencoded = new URLSearchParams();
    urlencoded.append("account_id", transaccion.numero_cuenta);
    urlencoded.append("amount", transaccion.monto);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://microservicetransactionv2.herokuapp.com/api/v2/transaction/retirement", requestOptions, elemento)
        .then(response => {
            validarRespuestaServidor(response, elemento)
        })
        .catch(error => console.log('error', error));
}

async function ListarTransaccion2(cuenta_numero) {
    var token = await getToken()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const transacc = fetch(`https://microservicetransactionv2.herokuapp.com/api/v2/transaction/List/${cuenta_numero}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error))

    return transacc
}


function validarRespuestaServidor(response, elemento) {
    var estado = false
    if (response.status == 200) {
        estado = true
        response.json()
    }
    if (response.status == 400) {
        submitContactFormMSG(estado, "No hay respuesta ", elemnto)
    }
    contactFormSuccess(estado, elemento)
}

function contactFormSuccess(estado, elemento) {
    if (estado == true) {
        submitContactFormMSG(estado, "Los datos han sido registrados exitosamente!", elemento);
    } else {
        submitContactFormMSG(estado, "Los datos no han sido registrados!", elemento);
    }
}

function submitContactFormMSG(valid, msg, elemnto) {
    if (valid == true) {
        var msgClasses = "h3 text-center text-success col-md-12";
    } else {
        var msgClasses = "h3 text-center text-danger col-md-12";
    }
    elemnto.className = "";
    elemnto.textContent = "";
    elemnto.className = msgClasses;
    elemnto.textContent += msg;
}




module.exports = {
    CrearClientev2,
    getClientev2,
    getListClientesv2,
    crearCuentav2,
    getCuentav2,
    getSaldoCuentav2,
    DepositoTransaccionv2,
    RetirosTransaccionv2,
    ListarTransaccion2,
    getListCuentasv2,
    getToken,
    loginToken
}