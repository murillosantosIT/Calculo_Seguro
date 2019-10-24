let alteraBotao = () => {
    let btnGuardar = $("#btnGuardar");
    let btnModificar = $("#btnModificar");

    btnGuardar.show();
    btnModificar.hide();

    let id = $("#id");
    let nome = $("#nome");
    let sexo = $("#sexo");
    let dtNascimento = $("#dtNascimento");
    let vlVeiculo = $("#vlVeiculo");

    id.val("");
    nome.val("");
    sexo.val("");
    dtNascimento.val("");
    vlVeiculo.val("");
}

function guardar() {

    let dados = localStorage.info == null ? [] : JSON.parse(localStorage.info);

    let id = $("#id").val();
    let nome = $("#nome").val();
    let sexo = $("#sexo").val();
    let dtNascimento = $("#dtNascimento").val();
    let vlVeiculo = $("#vlVeiculo").val();

    $.ajax({
        url: "calcula_seguro.php",
        method: "post",
        data: { sexo: `${sexo}`, dtNascimento: `${dtNascimento}`, vlVeiculo: `${vlVeiculo}` }, //{[nome_do_parametro_post]: [valor_do_parametro]}
        dataType: "json",
        success: function (data) {
            //console.log(data)
            if (data == true) {
                alert("Revise a data, menores de idade não podem simular seguro!");
            }
            else {
                let vlSeguro = data;

                if (id != "" && nome != "" && sexo != "" && dtNascimento != "" && vlVeiculo != "") {
                    dados.push({
                        'id': id,
                        'nome': nome,
                        'sexo': sexo,
                        'dtNascimento': dtNascimento,
                        'vlVeiculo': vlVeiculo,
                        'vlSeguro': vlSeguro
                    });

                    localStorage.info = JSON.stringify(dados);

                    listar();
                    alert("Cálculo realizado com sucesso!");
                } else {
                    alert("Revise os campos!");
                }
            }
        }
    });
}


let listar = () => {
    let dados = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    let tabela = $("#tblDados");
    tabela.html("");
    dados.forEach(element => {
        tabela.append(`
            <tr>
                <td>${element.id}</td>
                <td>${element.nome}</td>
                <td>${element.sexo}</td>
                <td>${element.dtNascimento}</td>
                <td>${element.vlVeiculo}</td>
                <td>${element.vlSeguro}</td>
                <td>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modal" onclick="editar(${element.id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar(${element.id})">Eliminar</button>
                </td>    
            </tr>
        `);
    });
}

let listarPorID = () => {
    let dados = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    let idBusca = $("#idBusca").val();
    if (idBusca == "") {
        alert("Preencha o ID");
    }
    else {
        let tabela = $("#tblDados");
        tabela.html("");
        dados.forEach(element => {

            let id = element.id;
            if (id == idBusca) {
                tabela.append(`
                <tr>
                    <td>${element.id}</td>
                    <td>${element.nome}</td>
                    <td>${element.sexo}</td>
                    <td>${element.dtNascimento}</td>
                    <td>${element.vlVeiculo}</td>
                    <td>${element.vlSeguro}</td>
                    <td>
                        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modal" onclick="editar(${element.id})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminar(${element.id})">Eliminar</button>
                    </td>    
                </tr>
            `);
            }
        });
    }
}

let editar = (doc) => {

    let dados = localStorage.info == null ? [] : JSON.parse(localStorage.info);

    let id = $("#id");
    let nome = $("#nome");
    let sexo = $("#sexo");
    let dtNascimento = $("#dtNascimento");
    let vlVeiculo = $("#vlVeiculo");
    let identificar = $("#txtId");

    let btnGuardar = $("#btnGuardar");
    let btnModificar = $("#btnModificar");

    let resultado = dados.find(e => e.id == doc);
    let resultadoIndex = dados.findIndex(e => e.id == doc);

    if (resultado != undefined) {

        btnGuardar.hide();
        btnModificar.show();

        id.val(resultado.id);
        nome.val(resultado.nome);
        sexo.val(resultado.sexo);
        dtNascimento.val(resultado.dtNascimento);
        vlVeiculo.val(resultado.vlVeiculo);

        identificar.val(resultadoIndex);
    }
}


let modificar = () => {

    let dados = localStorage.info == null ? [] : JSON.parse(localStorage.info);

    let id = $("#id").val();
    let nome = $("#nome").val();
    let sexo = $("#sexo").val();
    let dtNascimento = $("#dtNascimento").val();
    let vlVeiculo = $("#vlVeiculo").val();

    let identificar = $("#txtId").val();

    $.ajax({
        url: "calcula_seguro.php",
        method: "post",
        data: { sexo: `${sexo}`, dtNascimento: `${dtNascimento}`, vlVeiculo: `${vlVeiculo}` }, //{[nome_do_parametro_post]: [valor_do_parametro]}
        dataType: "json",
        success: function (data) {
            //console.log(data)
            if (data == true) {
                alert("Revise a data, menores de idade não podem simular seguro!");
            }
            else {
                let vlSeguro = data;

                if (id != "" && nome != "" && sexo != "" && dtNascimento != "" && vlVeiculo != "") {
                    dados[identificar].id = id;
                    dados[identificar].nome = nome;
                    dados[identificar].sexo = sexo;
                    dados[identificar].dtNascimento = dtNascimento;
                    dados[identificar].vlVeiculo = vlVeiculo;
                    dados[identificar].vlSeguro = vlSeguro;

                    localStorage.info = JSON.stringify(dados);

                    listar();
                    alert("Modificado com sucesso!");
                } else {
                    alert("Revise os campos!");
                }
            }
        }
    });
}


let eliminar = (doc) => {
    let confirmarExclusao = confirm("Deseja realmente exlcuir este cálculo?");

    if (confirmarExclusao == true) {
        let dados = localStorage.info == null ? [] : JSON.parse(localStorage.info);

        let resultadoIndex = dados.findIndex(e => e.id == doc);

        if (resultadoIndex != -1) {

            dados.splice(resultadoIndex, 1);

            localStorage.info = JSON.stringify(dados);

            listar();
        }
    }
}