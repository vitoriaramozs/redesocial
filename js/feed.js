
// =====================================
// FEED DA REDE SOCIAL
// =====================================


// =====================================
// VERIFICANDO O USUÁRIO LOGADO
// =====================================

const usuarioAtual = JSON.parse(
    localStorage.getItem("conecta_usuario_logado") || "null"
);


// Se não estiver logado, retorna ao login

if (!usuarioAtual) {

    window.location.href = "login.html";

}


// =====================================
// SELECIONANDO ELEMENTOS HTML
// =====================================

const usuarioNome = document.querySelector("#usuario-logado");

const sairButton = document.querySelector("#sair");

const postForm = document.querySelector("#post-form");

const textoPost = document.querySelector("#texto-post");

const listaPosts = document.querySelector("#lista-posts");

const totalPosts = document.querySelector("#total-posts");

const postMensagem = document.querySelector("#post-mensagem");


// =====================================
// EXIBINDO O NOME DO USUÁRIO
// =====================================

usuarioNome.textContent = usuarioAtual
    ? `Olá, ${usuarioAtual.nome}`
    : "";


// =====================================
// CARREGANDO PUBLICAÇÕES
// =====================================

function carregarPosts() {

    const posts = JSON.parse(
        localStorage.getItem("conecta_posts") || "[]"
    );

    // Limpa a lista antes de exibir

    listaPosts.innerHTML = "";

    totalPosts.textContent =
        `${posts.length} publicação(ões)`;


    // =====================================
    // FEED VAZIO
    // =====================================

    if (posts.length === 0) {

        listaPosts.innerHTML = `
            <div class="empty-state">
                Ainda não há publicações.
                Que tal fazer a primeira?
            </div>
        `;

        return;

    }


    // =====================================
    // ORDENANDO PUBLICAÇÕES
    // =====================================

    posts.sort((a, b) => b.data - a.data);


    // =====================================
    // EXIBINDO CADA PUBLICAÇÃO
    // =====================================

    posts.forEach((post) => {

        const curtidas = Array.isArray(post.curtidas)
            ? post.curtidas
            : [];

        const curtiu = curtidas.includes(usuarioAtual.id);


        // Criando o cartão da publicação

        const article = document.createElement("article");

        article.className = "post-card";


        // =====================================
        // CABEÇALHO DA PUBLICAÇÃO
        // =====================================

        const header = document.createElement("div");

        header.className = "post-header";


        // Nome do autor

        const author = document.createElement("span");

        author.className = "post-author";

        author.textContent = post.nome;


        // Data da publicação

        const date = document.createElement("time");

        date.className = "post-date";

        date.textContent = new Date(post.data)
            .toLocaleString("pt-BR");


        header.append(author, date);


        // =====================================
        // TEXTO DA PUBLICAÇÃO
        // =====================================

        const content = document.createElement("p");

        content.className = "post-text";

        content.textContent = post.texto;


        // =====================================
        // BOTÃO DE CURTIDA
        // =====================================

        const like = document.createElement("button");

        like.type = "button";

        like.className = `like-button${curtiu ? " liked" : ""}`;

        like.textContent = `${curtiu ? "♥ Curtido" : "♡ Curtir"} · ${curtidas.length}`;


        // Evento de curtida

        like.addEventListener("click", () => {

            alternarCurtida(post.id);

        });


        // =====================================
        // MONTANDO O CARTÃO
        // =====================================

        article.append(header, content, like);

        listaPosts.append(article);

    });

}


// =====================================
// CURTIR E DESCURTIR
// =====================================

function alternarCurtida(postId) {

    const posts = JSON.parse(
        localStorage.getItem("conecta_posts") || "[]"
    );


    // Localiza a publicação

    const post = posts.find((item) => item.id === postId);


    if (!post) return;


    // Garante que exista uma lista de curtidas

    post.curtidas = Array.isArray(post.curtidas)
        ? post.curtidas
        : [];


    // Verifica se o usuário já curtiu

    const index = post.curtidas.indexOf(usuarioAtual.id);


    if (index >= 0) {

        // Remove a curtida

        post.curtidas.splice(index, 1);

    } else {

        // Adiciona a curtida

        post.curtidas.push(usuarioAtual.id);

    }


    // Salva as alterações

    localStorage.setItem(
        "conecta_posts",
        JSON.stringify(posts)
    );


    // Atualiza o feed

    carregarPosts();

}


// =====================================
// CRIANDO NOVA PUBLICAÇÃO
// =====================================

postForm.addEventListener("submit", (event) => {

    // Impede o recarregamento da página

    event.preventDefault();


    // Captura o texto

    const texto = textoPost.value.trim();


    // =====================================
    // VALIDANDO A PUBLICAÇÃO
    // =====================================

    if (!texto) {

        postMensagem.textContent =
            "Digite algo antes de publicar.";

        return;

    }


    // =====================================
    // BUSCANDO PUBLICAÇÕES EXISTENTES
    // =====================================

    const posts = JSON.parse(
        localStorage.getItem("conecta_posts") || "[]"
    );


    // =====================================
    // CRIANDO A PUBLICAÇÃO
    // =====================================

    const novaPostagem = {

        id: Date.now(),

        usuarioId: usuarioAtual.id,

        nome: usuarioAtual.nome,

        texto: texto,

        data: Date.now(),

        curtidas: []

    };


    // =====================================
    // SALVANDO A PUBLICAÇÃO
    // =====================================

    posts.push(novaPostagem);

    localStorage.setItem(
        "conecta_posts",
        JSON.stringify(posts)
    );


    // =====================================
    // LIMPEZA E ATUALIZAÇÃO
    // =====================================

    textoPost.value = "";

    postMensagem.textContent = "Publicação criada!";

    carregarPosts();

});


// =====================================
// ENCERRANDO A SESSÃO
// =====================================

sairButton.addEventListener("click", () => {

    localStorage.removeItem("conecta_usuario_logado");

    window.location.href = "login.html";

});


// =====================================
// INICIALIZANDO O FEED
// =====================================

carregarPosts();
