export async function containerzarPlaylists(jogos, especifico) {
    const jogosDiv = document.createElement("div");
    if (especifico) jogosDiv.classList.add("rbxm-playlist-games-specific");

    for (const jogo of jogos) {
        const div = document.createElement("div");
        div.addEventListener("click", () =>
            chrome.runtime.sendMessage({ item: "abrirPaginaJogos", linkJogo: `${location.origin}/games/${jogo}` })
        );
        div.classList.add("rbxm-list-game");

        const universo = await (await fetch(`https://robloxpromocodemaster-api.herokuapp.com/robloxapis/getUniverse/${jogo}`)).json();
        fetch(`https://thumbnails.roblox.com/v1/games/icons/?universeIds=${universo.id}&size=512x512&format=png`)
            .then(res => res.json())
            .then(data => {
                data = data.data[0];
                const img = document.createElement("img");
                img.src = data.imageUrl;
                img.classList.add("rbxm-list-img");
                div.prepend(img);
            });
        // console.log(universo);

        fetch(`https://games.roblox.com/v1/games?universeIds=${universo.id}`)
            .then(res => res.json())
            .then(data => {
                const infoJogo = data.data[0];

                const nome = document.createElement("span");
                nome.textContent = infoJogo.name;
                nome.classList.add("rbxm-list-game-name");

                const pessoasJogando = document.createElement("p");
                pessoasJogando.classList.add("rbxm-list-game-playing");
                pessoasJogando.textContent = infoJogo.playing + " jogando";

                div.append(nome, pessoasJogando);
            });
        // console.log(infoJogo);

        jogosDiv.append(div);
        if (especifico) document.getElementById("jogos").append(jogosDiv);
    }

    return jogosDiv;
}
