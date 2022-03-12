document.addEventListener("DOMContentLoaded", async () => {
    const { jsonPromocodes, waitForEl } = await import("../util/func.js");
    var promocodes = await fetch("https://robloxpromocodemaster-api.herokuapp.com/codigos");
    var promocodes = await promocodes.json();
    const promocodesFormatados = jsonPromocodes(promocodes);

    var iconePromocodes = document.createElement("li");
    iconePromocodes.id = "rpmLista";
    await waitForEl("#navbar-robux");
    document.getElementById("navbar-robux").insertAdjacentElement("beforebegin", iconePromocodes);
    var iconePromocodes = document.getElementById("rpmLista");

    var listaPromocodes = document.createElement("div");
    listaPromocodes.id = "rpmListaConteudo";

    const cabecalho = document.createElement("div");
    cabecalho.id = "rpmListaCabecalho";
    cabecalho.innerHTML =
        "<a class='cabecalho-left'>Promocodes Ativos</a><a class='cabecalho-right' href='https://roblox.com/redeem'>Mais detalhes</a>";
    listaPromocodes.append(cabecalho);

    promocodesFormatados.id = "promocodesLista";
    listaPromocodes.append(promocodesFormatados);
    listaPromocodes.className = "listaPromocodes fechada";
    document.querySelector(".content").insertAdjacentElement("beforebegin", listaPromocodes);

    var listaPromocodes = document.getElementById("rpmListaConteudo");

    if (document.body.getAttribute("class").includes("dark-theme")) {
        const imagem = document.createElement("img");
        imagem.src = chrome.runtime.getURL("img/icone.svg");
        imagem.style.filter = "invert(1)";
        imagem.width = 40;
        imagem.height = 40;

        iconePromocodes.appendChild(imagem);
    } else {
        const imagem = document.createElement("img");
        imagem.src = chrome.runtime.getURL("img/icone.svg");
        imagem.width = 40;
        imagem.height = 40;

        iconePromocodes.appendChild(imagem);
    }

    document.querySelector("#rpmLista > img").addEventListener("click", () => {
        if (listaPromocodes.className.includes("fechada")) {
            listaPromocodes.className = "listaPromocodes aberta";
        } else {
            listaPromocodes.className = "listaPromocodes fechada";
        }
    });
});
