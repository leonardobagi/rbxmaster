function waitForEl(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

function jsonPromocodes(promocodes) {

    var promocodesDiv = document.createElement("div");

    var promocodesNovos = promocodes.filter(el => el.codigoNovo);
    var promocodesNovosEl = document.createElement("div");
    promocodesNovosEl.id = "promocodesNovos";
    promocodesNovos.forEach(el => {
        const nome = el.nome;
        const linkImagem = el.imagem;
        const codigo = el.codigo;

        const nomeEl = document.createElement("li");
        nomeEl.innerHTML = nome;
        nomeEl.setAttribute("class", "nomePromocode");

        const novoImg = document.createElement("img");
        novoImg.src = chrome.runtime.getURL("img/promocodeNovo.svg");
        novoImg.width = "40";
        novoImg.style.right = "5px";
        novoImg.style.position = "relative";

        const linkEl = document.createElement("img");
        linkEl.src = linkImagem;
        linkEl.width = "150";
        linkEl.style.transform = "translateX(-30%)";

        const codigoEl = document.createElement("li");
        codigoEl.innerHTML = codigo;
        codigoEl.setAttribute("class", "codigoPromocode")

        const promocodesUl = document.createElement("ul");
        promocodesUl.id = codigo;
        promocodesUl.setAttribute("class", "promocodeLista");

        promocodesUl.appendChild(novoImg);
        promocodesUl.appendChild(linkEl);

        const conteudoPromocode = document.createElement("div");
        conteudoPromocode.id = "promocodeConteudo";
        [nomeEl, codigoEl].forEach(el => conteudoPromocode.appendChild(el));

        promocodesNovosEl.appendChild(promocodesUl);
        promocodesUl.appendChild(conteudoPromocode);
        promocodesDiv.append(promocodesNovosEl);

        promocodes.splice(promocodes.indexOf(el), 1);
    })
    for (i = 0; i < promocodes.length; i++) {
        const nome = promocodes[i].nome;
        const linkImagem = promocodes[i].imagem;
        const codigo = promocodes[i].codigo;

        const nomeEl = document.createElement("li");
        nomeEl.innerHTML = nome;
        nomeEl.setAttribute("class", "nomePromocode");

        const linkEl = document.createElement("img");
        linkEl.src = linkImagem;
        linkEl.width = "150";

        const codigoEl = document.createElement("li");
        codigoEl.innerHTML = codigo;
        codigoEl.setAttribute("class", "codigoPromocode")

        const promocodesUl = document.createElement("ul");
        promocodesUl.id = codigo;
        promocodesUl.setAttribute("class", "promocodeLista");

        promocodesUl.appendChild(linkEl);

        const conteudoPromocode = document.createElement("div");
        conteudoPromocode.id = "promocodeConteudo";
        [nomeEl, codigoEl].forEach(el => conteudoPromocode.appendChild(el));

        promocodesDiv.appendChild(promocodesUl);
        promocodesUl.appendChild(conteudoPromocode);
    }
    return promocodesDiv;
}

(async () => {
    var promocodes = await fetch("https://robloxpromocodemaster-api.herokuapp.com/codigos");
    var promocodes = await promocodes.json();
    const promocodesFormatados = jsonPromocodes(promocodes);

    var iconePromocodes = document.createElement("li");
    iconePromocodes.id = "rpmLista";
    document.getElementById("navbar-robux").insertAdjacentHTML("beforebegin", iconePromocodes.outerHTML);
    var iconePromocodes = document.getElementById("rpmLista");

    var listaPromocodes = document.createElement("div");
    listaPromocodes.id = "rpmListaConteudo";

    const cabecalho = document.createElement("div");
    cabecalho.id = "rpmListaCabecalho";
    cabecalho.innerHTML = "<a class='cabecalho-left'>Promocodes Ativos</a><a class='cabecalho-right' href='https://roblox.com/promocodes'>Mais detalhes</a>";
    listaPromocodes.append(cabecalho);

    promocodesFormatados.id = "promocodesLista";
    listaPromocodes.append(promocodesFormatados);
    listaPromocodes.className = "listaPromocodes fechada";
    document.querySelector(".content").insertAdjacentHTML("beforebegin", listaPromocodes.outerHTML);

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
        if(listaPromocodes.className.includes("fechada")){
            listaPromocodes.className = "listaPromocodes aberta";
        }else{
            listaPromocodes.className = "listaPromocodes fechada";
        }
    })
})();
