
// =====================================
// CADASTRO DE USUÁRIO
// =====================================

// Selecionando os elementos do formulário

const cadastroForm = document.querySelector("#cadastro-form");

const cadastroMensagem = document.querySelector("#mensagem");


// =====================================
// EVENTO DE CADASTRO
// =====================================

cadastroForm.addEventListener("submit", (event) => {

    // Impede o recarregamento da página
    event.preventDefault();


    // Capturando os dados digitados

    const nome = document.querySelector("#nome").value.trim();

    const email = document.querySelector("#email").value.trim().toLowerCase();

    const senha = document.querySelector("#senha").value;


    // =====================================
    // BUSCANDO USUÁRIOS CADASTRADOS
    // =====================================

    const usuarios = JSON.parse(
        localStorage.getItem("conecta_usuarios") || "[]"
    );


    // =====================================
    // VERIFICANDO E-MAIL
    // =====================================

    const usuarioExistente = usuarios.some(
        (usuario) => usuario.email === email
    );


    if (usuarioExistente) {

        cadastroMensagem.textContent =
            "Este e-mail já está cadastrado.";

        return;
    }


    // =====================================
    // CRIANDO NOVO USUÁRIO
    // =====================================

    const novoUsuario = {

        id: Date.now(),

        nome: nome,

        email: email,

        senha: senha

    };


    // =====================================
    // SALVANDO O CADASTRO
    // =====================================

    usuarios.push(novoUsuario);

    localStorage.setItem(
        "conecta_usuarios",
        JSON.stringify(usuarios)
    );


    // =====================================
    // MENSAGEM DE SUCESSO
    // =====================================

    cadastroMensagem.textContent =
        "Conta criada! Redirecionando para o login...";

    cadastroMensagem.style.color = "green";


    // Limpando os campos

    cadastroForm.reset();


    // =====================================
    // REDIRECIONAMENTO
    // =====================================

    setTimeout(() => {

        window.location.href = "login.html";

    }, 900);

});
