document.addEventListener("DOMContentLoaded", () => {
    carregarLikes();
});

// Lista das notícias do portal
const listaMaterias = ["materia-principal", "materia1", "materia2"];

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