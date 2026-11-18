// Lista das notícias do portal
const listaMaterias = ["materia-principal", "materia1", "materia2"];

document.addEventListener("DOMContentLoaded", () => {
    carregarLikes();
    carregarComentarios();
});



//----------------------------------------------------------------
// SISTEMA DE CURTIDAS
//----------------------------------------------------------------

function carregarLikes() {
    // Percorre todos os botões de like da página
    const botoes = document.querySelectorAll(".btn-like");

    botoes.forEach((btn, index) => {
        const idMateria = listaMaterias[index];
        if (!idMateria) return;

        // Chave exclusiva no "banco" para cada notícia
        const totalLikes = parseInt(localStorage.getItem(`db_likes_${idMateria}`) || "0", 10);
        const jaCurtiu = localStorage.getItem(`db_userLike_${idMateria}`) === "true";

        const icone = btn.querySelector(".icone-coracao");
        const contador = btn.querySelector(".contador-likes");

        if (contador) contador.innerText = totalLikes;

        if (jaCurtiu && btn && icone) {
            btn.classList.add("curtido");
            icone.innerText = "❤️";
        }
    });
}

function gerenciarLikes(idMateria, btnClicado) {
    // Busca os dados específicos DESTA matéria no localStorage
    let totalLikes = parseInt(localStorage.getItem(`db_likes_${idMateria}`) || "0", 10);
    let jaCurtiu = localStorage.getItem(`db_userLike_${idMateria}`) === "true";

    // Pega o ícone e o contador que estão DENTRO do botão que foi clicado
    const icone = btnClicado.querySelector(".icone-coracao");
    const contador = btnClicado.querySelector(".contador-likes");

    if (!jaCurtiu) {
        totalLikes += 1;
        jaCurtiu = true;
        if (icone) icone.innerText = "❤️";
        btnClicado.classList.add("curtido");
    } else {
        totalLikes = Math.max(0, totalLikes - 1);
        jaCurtiu = false;
        if (icone) icone.innerText = "🤍";
        btnClicado.classList.remove("curtido");
    }

    // Salva no banco separadamente para essa matéria
    localStorage.setItem(`db_likes_${idMateria}`, totalLikes.toString());
    localStorage.setItem(`db_userLike_${idMateria}`, jaCurtiu.toString());

    if (contador) contador.innerText = totalLikes;
}

//----------------------------------------------------------------
// SISTEMA DE COMENTARIOS
//----------------------------------------------------------------

function carregarComentarios() {
    listaMaterias.forEach((idMateria) => {
        const blocoMateria = document.getElementById(idMateria);
        if(!blocoMateria) return;

        const containerLista = blocoMateria.querySelector(".lista-comentarios");
        const chaveBanco = `db_comentarios_${idMateria}`;
        const listaComentarios = JSON.parse(localStorage.getItem(chaveBanco) || "[]");
    
        desenharComentarios(containerLista, listaComentarios);

    });
}

function salvarComentario(idMateria, formElement){

    const inputAutor = formElement.querySelector(".input-autor");
    const inputTexto = formElement.querySelector(".input-texto");

    const autor = inputAutor.value.trim();
    const texto = inputTexto.value.trim();

    if(autor === "" || texto === "") return;

    const chaveBanco = `db_comentarios_${idMateria}`;
    const listaComentarios = JSON.parse(localStorage.getItem(chaveBanco) || "[]");

    const novoComentario = {
        autor: autor,
        texto: texto,
        hora: new Date().toLocaleString([], {hour: "2-digit", minute: "2-digit"}),
    };

    listaComentarios.unshift(novoComentario);

    localStorage.setItem(chaveBanco, JSON.stringify(listaComentarios));

    inputAutor.value = "";
    inputTexto.value = "";

    const blocoMateria = formElement.closeset(".materia-completa");
    const containerLista = blocoMateria.querySelector(".lista-comentarios");

    desenharComentarios(containerLista, listaComentarios);

}

function desenharComentarios(container, lista){
    if(!container) return;

    container.innerHTML = "";

    if(lista.length === 0){
        container.innerHTML = '<span class="tempo-commentario">Seja o primeiro a comentar!</span>';
        return;
    }

    lista.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("item-comentario");

        const strongAutor = document.createElement("strong");
        strongAutor.textContent = item.autor;

        const pTexto = document.createElement("p");
        pTexto.textContent = item.texto;

        const spanHora = document.createElement("span");
        spanHora.classList.add("tempo-comentario");
        spanHora.textContent = `às ${item.hora}`;

        card.append(strongAutor, pTexto, spanHora);
        container.appendChild(card);
    });
}


//----------------------------------------------------------------
// TROCA DE TEMA -------------------------------------------------
function trocarTema(){
    const corpo = document.body;
    const icone = document.getElementById("icone-tema");

    document.body.classList.toggle("mode-dark");

    if(corpo.classList.contains("mode-dark")){
        icone.innerText = "☀︎";
    }else{
        icone.innerText = "⏾";
    }
}