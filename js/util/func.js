export function waitForEl(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
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

export function jsonPromocodes(promocodes) {
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
        codigoEl.setAttribute("class", "codigoPromocode");
        codigoEl.style.transform = "translateX(-30%)";

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
    });
    for (let i = 0; i < promocodes.length; i++) {
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
        codigoEl.setAttribute("class", "codigoPromocode");

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
