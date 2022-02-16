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

export function listaDeAmigos(amigos, thumbnails) {
    const ul = document.createElement("ul");
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement("li");

        li.innerHTML = `<li id=people-${amigos[i].id} rbx-user-id=${amigos[i].id} class="list-item friend ng-scope">
    <div ng-controller="peopleController" people>
        <div class="avatar-container"> <a href=/users/${amigos[i].id}/profile
                class="text-link friend-link ng-isolate-scope" ng-click="clickAvatar(friend, $index)"
                popover-trigger=" 'none' "
                popover-class=people-info-card-container card-with-game people-info-${amigos[i].id}
                popover-placement="bottom" popover-append-to-body="true" popover-is-open="hoverPopoverParams.isOpen"
                hover-popover-params="hoverPopoverParams" hover-popover="" uib-popover-template="'people-info-card'">
                <div class="avatar avatar-card-fullbody"> <span
                        class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot"
                        ng-class="{'icon-placeholder-avatar-headshot': !friend.avatar.imageUrl}">
                        <thumbnail-2d class="avatar-card-image ng-isolate-scope"
                            thumbnail-type="layout.thumbnailTypes.avatarHeadshot" thumbnail-target-id="friend.id"><span
                                ng-class="$ctrl.getCssClasses()" class="thumbnail-2d-container"
                                thumbnail-type="AvatarHeadshot" thumbnail-target-id=${amigos[i].id}>
                                <!-- ngIf: $ctrl.thumbnailUrl && !$ctrl.isLazyLoadingEnabled() --><img
                                    ng-if="$ctrl.thumbnailUrl &amp;&amp; !$ctrl.isLazyLoadingEnabled()"
                                    ng-src=${thumbnails[i].imageUrl}
                                    thumbnail-error="$ctrl.setThumbnailLoadFailed"
                                    ng-class="{'loading': $ctrl.thumbnailUrl &amp;&amp; !isLoaded }" image-load=""
                                    alt="" title="" class="ng-scope ng-isolate-scope"
                                    src=${thumbnails[i].imageUrl}>
                                <!-- end ngIf: $ctrl.thumbnailUrl && !$ctrl.isLazyLoadingEnabled() -->
                                <!-- ngIf: $ctrl.thumbnailUrl && $ctrl.isLazyLoadingEnabled() -->
                            </span> </thumbnail-2d>
                    </span> </div> <span class="text-overflow friend-name font-caption-header ng-binding"
                    ng-bind="friend.nameToDisplay" title=${amigos[i].usuario}>amigos[i].usuario</span>
                <!-- ngIf: friend.presence.placeUrl -->
                <div class="text-overflow xsmall text-label place-name ng-binding ng-scope"
                    ng-if="friend.presence.placeUrl" ng-bind="library.placesDict[friend.presence.rootPlaceId].name">${amigos[i].nomeDoJogo}</div><!-- end ngIf: friend.presence.placeUrl -->
            </a> <!-- ngIf: friend.presence.placeUrl --><a class="friend-status place-link ng-scope"
                ng-href=${amigos[i].jogo.url} ng-if="friend.presence.placeUrl"
                ng-click="clickPlaceLink(friend, $index)" href=${amigos[i].jogo.url}> <span
                    class="avatar-status friend-status icon-game" title=${amigos[i].nomeDoJogo}></span> </a>
            <!-- end ngIf: friend.presence.placeUrl -->
            <!-- ngIf: !friend.presence.placeUrl -->
        </div>
    </div>
</li>`;

        ul.append(li);
    }
    return ul;
}
