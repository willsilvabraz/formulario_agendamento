var from = document.getElementById('form');

const bt_motivo = document.getElementById('motivo');
const texto = document.querySelector("#texto");
const emaill = document.querySelector("#email");
const nome = document.querySelector("#nome");
const referencia = document.querySelector("#referencia");
const enviar = document.querySelector("#enviar");
const telefone = document.querySelector("#telefone");
const limpar = document.querySelector("#limpar");
const calendario = document.querySelector("#data");
const apenasNumeros = (str) => str.replace(/[^0-9]/g, '')
const operador = obterParametroDaURL("operador");
const supervisor = obterParametroDaURL("supervisor");
if (operador === "" || operador === null || supervisor === "" || supervisor === null) {
        window.location.href = "index.html"
}
var ativo;
var ref_locEscolhido;
var dataa;
var ref_espaco;
form.addEventListener("submit", function (e) {
    e.preventDefault();
});
limpar.addEventListener("click", function (e) {
    texto.value = "";
    motivo.value = "";
    nome.value = "";
    telefone.value = "";
    referencia.value = "";
    email.value = "";
    periodo.value = "";
    calendario.value = "";
    emaill.value = "";
});
enviar.addEventListener("click", function (e) {
    let periodo = document.querySelector("#periodo").value;


    if (motivo.value === "") {
        return;
    }
    
    if(!validar(nome) || !validar(telefone)){
        return;
    } 

    if (periodo === null) {
        periodo = ""
    }
    if (data() === "NaN/NaN/NaN" || bt_motivo.value !== "AGENDAMENTO") {
        dataa = "";
        periodo = ""
    } else {
        dataa = " PARA O DIA " + data();
    }


    if (bt_motivo.value === "AGENDAMENTO ATP") {
        if (data() === "NaN/NaN/NaN") {
            dataa = ""
            periodo = ""
        } else {
            dataa = data();
        }
    }
    if (bt_motivo.value === "JA DEVOLVEU TECNICO" || bt_motivo.value === "JA DEVOLVEU ATP" || bt_motivo.value === "AGENDAMENTO ATP") {
        if (data() === "NaN/NaN/NaN") {
            dataa = ""
            periodo = ""
        } else {
            dataa = " NO DIA " + data();
        }
    }
    if(referencia.value === ""){
        ref_espaco = ""
    }else{
        ref_espaco = " ";
    }
    

    if (motivo.value === "JA DEVOLVEU TECNICO") {
        if(!validar(calendario)){
            return
        }
        texto.value = "Ativo Backlog - Descrever motivo [JA DEVOLVEU] / VIA TECNICO OU ATP [TECNICO ] / DATA DA RETIRADA [" + data() + "]/ Orientado a enviar ordem de servico para o e-mail copiadeos@atendimento.com.br / numero contato " + telefone.value + " /Nome com quem agendou " + nome.value + ". Nome do Operador " + operador + " / Supervisor " + supervisor + " / CRT AGENDAMENTO / TEL + FSA. ";
        navigator.clipboard.writeText(texto.value);
        return;
    }
    if (motivo.value === "JA DEVOLVEU ATP") {
        if(!validar(calendario)){
            return
        }
        texto.value = "Ativo Backlog - Descrever motivo [JA DEVOLVEU] / VIA TECNICO OU ATP [ATP] / DATA DA RETIRADA [" + data() + "]/ Orientado a enviar ordem de servico para o e-mail copiadeos@atendimento.com.br / numero contato " + telefone.value + " /Nome com quem agendou " + nome.value + ". Nome do Operador " + operador + " / Supervisor " + supervisor + " / CRT AGENDAMENTO / TEL + FSA. ";
        navigator.clipboard.writeText(texto.value);
        return;
    }
    if (motivo.value === "POSSIVEL FRAUDE") {
        texto.value = "Ativo Back log - Descrever motivo [POSSIVEL FRAUDE] / Ativo Realizado / Numero contato " + telefone.value + " / CLIENTE INFORMOU DESCONHECER O CONTRATO/ ABERTA SP1-DC1.Nome com quem agendou " + nome.value + " / Ponto de referencia" + ref_espaco +referencia.value + ". Nome do Operador " + operador + " / Supervisor " + supervisor + " / CRT AGENDAMENTO / TEL + FSA. ";
        navigator.clipboard.writeText(texto.value);
        return;
    }
    if(motivo.value === "AGENDAMENTO CORREIOS"){
        if(!validar(referencia)){
            return;
        }
    }

    resultado = "Ativo Back log - Descrever motivo [" + ativo + dataa + periodo + "] / Ativo Realizado / Numero contato " + telefone.value + " / Nome com quem agendou " + nome.value + ref_locEscolhido + ref_espaco +referencia.value + email(emaill) + ". Nome do Operador " + operador + " / Supervisor " + supervisor + " / CRT AGENDAMENTO / TEL + FSA.";
    texto.value = resultado;
    navigator.clipboard.writeText(texto.value);
});
bt_motivo.addEventListener("input", function (e) {
    var datalist = document.getElementById('motivos');
    var options = datalist.getElementsByTagName('option');
    inputElement = document.getElementById('email');
    let motivo = document.querySelector("#motivo").value;
    let lbref = document.querySelector("#lbref");
    if (motivo === "AGENDAMENTO CORREIOS") {      
        abilitarInput(inputElement);
        lbref.innerHTML = "Local Escolhido:";
        ref_locEscolhido = " / Ponto correio escolhido";
    } else {
        desabilitarInput(inputElement);
        lbref.innerHTML = "Ponto de Referência:";
        inputElement.value = "";
        ref_locEscolhido = " / Ponto de referencia";
    }
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (bt_motivo.value === option.value) {
            ativo = (option.dataset.value);
            if (motivo === "AGENDAMENTO") {
                if(referencia.value === ""){
                    referencia.value = "nao possui"
                }
                ativo = "AGENDAMENTO REALIZADO"
            }
            return;
        } else {
            ativo = motivo;
        }
    }
});
bt_motivo.addEventListener("click", function (e) {
    bt_motivo.value = "";
});
telefone.addEventListener("input", function (e) {
    telefone.value = apenasNumeros(telefone.value);
});
function email(email) {
    if (email.value !== "") {
        return " / Email do cliente " + email.value;
    }
    return "";
}
function abilitarInput(inputElement) {
    inputElement.disabled = false;
}
function desabilitarInput(inputElement) {
    inputElement.disabled = true;
}
function data() {
    let agenda = document.getElementById("data").value;
    dataFomatar = new Date(agenda + " 00:00:00");
    let data = new Date(agenda).toLocaleDateString('pt-BR');
    let ano = dataFomatar.getFullYear();
    let mes = dataFomatar.getMonth() + 1;
    let dia = dataFomatar.getDate();
    let brDate = (dia + "/" + mes + "/" + ano)
    if (dia < 10 && mes > 9) {
        brDate = ("0" + dia + "/" + mes + "/" + ano)
    } else
        if (mes < 10 && dia > 9) {
            brDate = (dia + "/0" + mes + "/" + ano)
        } else
            if (mes < 10 && dia < 10) {
                brDate = ("0" + dia + "/0" + mes + "/" + ano)
            }
    return brDate;
}

function validar(imput) {
    if (imput.value=== "" || imput.value === null || imput.value === "NaN/NaN/NaN") {
        imput.style.border = "1.5px solid red";
        texto.value = "falta informação."
        return false;
    }
    imput.style.border = "none";
    return true;
}

function obterParametroDaURL(e) {
    var urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(e);
}