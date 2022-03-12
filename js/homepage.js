if (window.location.pathname == "/home") {
    // coisas que vao mudar na homepage
    const usp = new URLSearchParams(window.location.search);

    // fazer o código só executar quando tudo na pagina carregar
    document.addEventListener("DOMContentLoaded", async () => {
        (async () => {
            if (usp.has("rbxmPlaylists")) {
                const playlistsHtml = await (await fetch(chrome.runtime.getURL("html/playlists.html"))).text();

                const { waitForEl } = await import("./util/func.js");
                await waitForEl(".content");
                document.querySelector(".content").replaceChildren();
                document.querySelector(".content").insertAdjacentHTML("afterbegin", playlistsHtml);
            }
        })();
        // conseguir dados armazenados no armazenamento
        const data = await chrome.storage.sync.get();

        // const { waitForEl, listaDeAmigos } = await import("./func.js");

        // conseguir dados do usuario
        const userData = document.querySelector("meta[name=user-data]").dataset;

        // verificar se deve mostrar id ou @

        if (data.mostrarArroba) {
            const el = document.createElement("p");
            el.innerHTML = `@${userData.name}`;
            document.querySelector("h1.user-name-container").appendChild(el);
        }
        if (data.mostrarId) {
            const el = document.createElement("p");
            el.innerHTML = `ID: ${userData.userid}`;
            document.querySelector("h1.user-name-container").appendChild(el);
        }

        // const listaAmigos = document.querySelector(".hlist");

        // await waitForEl(".hlist > li");

        // if (listaAmigos.offsetWidth == 970) {
        //     listaAmigos.replaceChildren();
        // }
    });
}
