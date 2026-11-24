
// =====================================
// LOGIN DE USUÁRIO
// =====================================

// Selecionando os elementos do formulário

const loginForm = document.querySelector("#login-form");

const loginMensagem = document.querySelector("#mensagem");


// =====================================
// EVENTO DE LOGIN
// =====================================

loginForm.addEventListener("submit", (event) => {

    // Impede o recarregamento da página
    event.preventDefault();


    // Capturando os dados digitados

    const email = document.querySelector("#email")
        .value.trim().toLowerCase();

    const senha = document.querySelector("#senha").value;


    // =====================================
    // BUSCANDO USUÁRIOS CADASTRADOS
    // =====================================

    const usuarios = JSON.parse(
        localStorage.getItem("conecta_usuarios") || "[]"
    );


    // =====================================
    // VERIFICANDO OS DADOS DE LOGIN
    // =====================================

    const usuario = usuarios.find((item) => {

        return item.email === email && item.senha === senha;

    });


    // =====================================
    // VALIDANDO O LOGIN
    // =====================================

    if (!usuario) {

        loginMensagem.textContent =
            "E-mail ou senha incorretos.";

        loginMensagem.style.color = "red";

        return;
    }


    // =====================================
    // INICIANDO A SESSÃO
    // =====================================

    localStorage.setItem(
        "conecta_usuario_logado",

        JSON.stringify({

            id: usuario.id,

            nome: usuario.nome,

            email: usuario.email

        })
    );


    // =====================================
    // REDIRECIONANDO PARA O FEED
    // =====================================

    window.location.href = "feed.html";

});
