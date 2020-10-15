const apiControlv2 = require("../conexionApi/apicontroler_v2")
    //formulario registro clientes
const clienteForm = document.querySelector("#clienteForm");
//formulario registro cuentas
const cuentaForm = document.querySelector("#cuentasForm");
//formulario registro transacciones
const transaccionForm = document.querySelector("#transaccionForm");



if (clienteForm) {
    const clienteNombre = document.querySelector("#nombre");
    const clienteApellido = document.querySelector("#apellido");
    const clientSexo = document.querySelector("#sexo_id");
    const clientMsgSubmit = document.querySelector("#msgContactSubmit");
    const clientTablebody = document.querySelector("#tablabody_cliente");
    // alert(token.token)

    llenar_tabla_clientes()
    clienteForm.addEventListener("submit", async(e) => {
        try {
            e.preventDefault();
            const cliente = {
                nombre: clienteNombre.value,
                apellido: clienteApellido.value,
                sexo: clientSexo.value,
            };
            console.log("send cliente: ", cliente)
            apiControlv2.CrearClientev2(cliente, clientMsgSubmit);
            clienteForm.reset();
            llenar_tabla_clientes();
            //actualizar()
        } catch (error) {
            console.log(error);
        }
    });

    function llenar_tabla_clientes() {
        const clientbuscarlabel = document.querySelector("#msgTablacliente");

        var h_clientes = apiControlv2.getListClientesv2();
        h_clientes.then(res => {
            if (res.length !== 0) {
                clientTablebody.innerHTML = "";
                for (var i = 0; i < res.length; i++) {
                    var row = `<tr> 
                                    <td>${res[i].id}</td>
                                    <td>${res[i].name}</td>
                                    <td>${res[i].lastname}</td>
                                    <td>${res[i].sex}</td>
                                    <td>${res[i].created_at}</td>
                                </tr>`
                    clientTablebody.innerHTML += row;
                }
                // pintarLabel(lb_ncuenta, "");
                paginarTabla('#id_bcliente', '#tabla_cliente')

            } else {
                agregarMensaje(clientbuscarlabel, "no hay datos para mostrar")
            }
        });
    }

}


function BuscarEntabla(idTabla, idBusqueda) {
    var tableReg = document.querySelector(idTabla);
    var searchText = document.querySelector(idBusqueda).value.toLowerCase();
    var cellsOfRow = "";
    var found = false;
    var compareWith = "";

    for (var i = 1; i < tableReg.rows.length; i++) {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}


if (cuentaForm) {
    const cuentaNumero = document.querySelector("#n_cuenta");
    const cuentaTipo = document.querySelector("#tcuenta_id");
    const cuentaId_Cliente = document.querySelector("#cliente_id");
    const cuentaMonto = document.querySelector("#monto");
    const clientMsgSubmit = document.querySelector("#msgContactSubmitcuenta");
    const cuentaTablebody = document.querySelector("#tabla_body_cuenta");

    llenar_tabla_cuentas();

    cuentaForm.addEventListener("submit", async(e) => {
        try {
            e.preventDefault()
            var datos = apiControlv2.getClientev2(parseInt(cuentaId_Cliente.value));

            datos.then(res => {
                if (res.id) {
                    if (cuentaNumero.value.length == 14) {
                        const cuenta = {
                            numero: cuentaNumero.value,
                            tipo: cuentaTipo.value,
                            cliente_id: cuentaId_Cliente.value,
                            monto: cuentaMonto.value,
                        };
                        apiControlv2.crearCuentav2(cuenta, clientMsgSubmit);
                        pintarLabel(cuentaId_Cliente, "");
                        pintarLabel(cuentaNumero, "");
                        cuentaForm.reset();
                        llenar_tabla_cuentas();
                        // actualizar()
                    } else {
                        pintarLabel(cuentaNumero, "red");
                        pintarLabel(cuentaId_Cliente, "");
                        agregarMensaje(clientMsgSubmit, "el numero de cuenta debe contener 14 digitos");
                    }

                } else {
                    pintarLabel(cuentaId_Cliente, "red");
                    agregarMensaje(clientMsgSubmit, "el cliente no esta registrado");
                }
            });

        } catch (error) {
            console.log(error);
        }
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function llenar_tabla_cuentas() {
        const cuentabuscarlabel = document.querySelector("#msgTablacuenta");

        var h_cuentas = apiControlv2.getListCuentasv2();
        h_cuentas.then(res => {
            if (res.length !== 0) {
                cuentaTablebody.innerHTML = "";
                for (var i = 0; i < res.length; i++) {
                    var row = `<tr>  
                                    <td>${res[i].number}</td>
                                    <td>${res[i].type}</td>
                                    <td>${res[i].client_id}</td>
                                    <td>${res[i].amount}</td>
                                    <td>${res[i].created_at}</td>
                                </tr>`
                    cuentaTablebody.innerHTML += row;
                }
                // pintarLabel(lb_ncuenta, "");
                paginarTabla('#el_bcuenta', '#tabla_cuenta')

            } else {
                agregarMensaje(cuentabuscarlabel, "no hay datos para mostrar")
            }
        });
    }
}

if (transaccionForm) {
    const transaccionMonto = document.querySelector("#tmonto");
    const transaccionNcuenta = document.querySelector("#ncuenta");
    const transaccionTipo = document.querySelector("#transaccion_id");
    const clientMsgSubmit = document.querySelector("#msgContactSubmittransacc");
    const tablaBodyTransac = document.querySelector("#tablabody");


    transaccionForm.addEventListener("submit", async(e) => {
        try {
            e.preventDefault();

            //var datos = apiControl.getCuentas(transaccionNcuenta.value);
            var cuenta = apiControlv2.getCuentav2(parseInt(transaccionNcuenta.value));
            var saldo = apiControlv2.getSaldoCuentav2(parseInt(transaccionNcuenta.value));

            cuenta.then(res => {
                if (res[0]) {
                    if (transaccionTipo.value == "0") {
                        transaccionMonto.style.color = '';
                        transaccionNcuenta.style.color = '';
                        RealizarDepositos()
                        transaccionForm.reset();
                        //actualizar()
                    } else {
                        saldo.then(saldo_cuenta => {
                            if (parseInt(saldo_cuenta.amount) >= parseInt(transaccionMonto.value)) {
                                RealizarRetiros()
                                transaccionForm.reset();
                                // actualizar()
                            } else {
                                transaccionNcuenta.style.color = '';
                                transaccionMonto.style.color = 'red';
                                agregarMensaje(clientMsgSubmit, "fondos isuficienetes: disponible $" + saldo_cuenta.amount);

                            }
                        })

                    }
                } else {
                    pintarLabel(transaccionNcuenta, "red");
                    agregarMensaje(clientMsgSubmit, "la cuenta no existe");
                }
            })

        } catch (error) {
            console.log(error);
        }
    });

    function RealizarDepositos() {
        const transaccion = {
            monto: parseInt(transaccionMonto.value),
            numero_cuenta: parseInt(transaccionNcuenta.value),
            tipo_transaccion: transaccionTipo.value,
        };
        //apiControlv2.actualizarMontov2(transaccion.numero_cuenta, transaccion, clientMsgSubmit);
        apiControlv2.DepositoTransaccionv2(transaccion, clientMsgSubmit);
        llenarTabla(transaccionNcuenta.value, transaccionMonto)
    }

    function RealizarRetiros() {
        const transaccion = {
            monto: parseInt(transaccionMonto.value),
            numero_cuenta: parseInt(transaccionNcuenta.value),
            tipo_transaccion: transaccionTipo.value,
        };
        //apiControlv2.actualizarMontov2(transaccion.numero_cuenta, transaccion, clientMsgSubmit);
        apiControlv2.RetirosTransaccionv2(transaccion, clientMsgSubmit);
        llenarTabla(transaccionNcuenta.value, transaccionMonto)
        transaccionMonto.style.color = '';
    }

    document.querySelector("#buscacuenta").onclick = function(e) {
        e.preventDefault();
        var numero_Cuenta = document.querySelector("#nbcuenta");
        var his_TransaccForm = document.querySelector("#buscraTransaccForm");
        console.log("lo que busca: ", numero_Cuenta.value)
        llenarTabla(numero_Cuenta.value, numero_Cuenta)
        his_TransaccForm.reset()
    };

    function llenarTabla(numero_cuenta, lb_ncuenta) {
        var mensajerror = document.querySelector("#msgTablaTransaccion");
        var h_transaccion = apiControlv2.ListarTransaccion2(parseInt(numero_cuenta));
        agregarMensaje(mensajerror, "Buscando ...")
        paginarTabla('#nbcuenta', '#Tabla_Transaccion');
        h_transaccion.then(res => {
            if (res.length !== 0) {
                tablaBodyTransac.innerHTML = "";
                console.log("lo que trae: ", res)
                mensajerror.textContent = "";
                for (var i = 0; i < res.length; i++) {
                    var row = `<tr> 
                                    <td>${res[i].account_id}</td>
                                    <td>${res[i].amount}</td>
                                    <td>${res[i].movement}</td>
                                    <td>${res[i].Created}</td>
                                </tr>`
                    tablaBodyTransac.innerHTML += row;
                }
                pintarLabel(lb_ncuenta, "");
                paginarTabla('#nbcuenta', '#Tabla_Transaccion');

            } else {
                agregarMensaje(mensajerror, "cuenta no encontrada")
                pintarLabel(lb_ncuenta, "red");
                tablaBodyTransac.innerHTML = "";
            }
        });
    }
}

function actualizar() {
    location.reload(true);
}

function pintarLabel(elemneto, color) {
    elemneto.style.color = color
}

function agregarMensaje(elemento, mensaje) {
    var msgClasses = "h5 text-center text-danger col-md-12";
    elemento.className = "";
    elemento.textContent = "";
    elemento.className = msgClasses;
    elemento.textContent = mensaje;
}

function paginarTabla(el_idBuscador, el_idTabla) {
    let options = {
        numberPerPage: 8,
        goBar: true,
        pageCounter: false,
    };
    let filterOptions = {
        el: el_idBuscador
    };
    paginate.init(el_idTabla, options, filterOptions);
}