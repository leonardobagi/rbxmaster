if (window.location.pathname.startsWith("/games")) {
    document.addEventListener("DOMContentLoaded", async () => {
        const { playlists } = await chrome.storage.sync.get();

        (() => {
            const el = document.createElement("img");
            el.src = chrome.runtime.getURL("img/playlistJogo.svg");
            el.id = "playlistJogo";
            el.style.float = "right";
            el.width = "30";
            el.style.cursor = "pointer";
            el.style.filter = "invert(1)";
            document.querySelector(".game-title-container").prepend(el);
        })();

        const lista = await (await fetch(chrome.runtime.getURL("html/playlistsList.html"))).text();
        document.body.insertAdjacentHTML("beforeend", lista);

        const listaEl = document.querySelector(".rbxm-playlists-list");

        let rmv = false;

        document.getElementById("playlistJogo").addEventListener("click", () => {
            aDudaEIncrivel();
            listaEl.classList.toggle("active");
            document.querySelector(".simplemodal-overlay3").classList.toggle("active");
        });

        listaEl.firstElementChild.addEventListener("click", () => {
            listaEl.classList.remove("active");
            document.querySelector(".simplemodal-overlay3").classList.toggle("active");
        });

        function aDudaEIncrivel() {
            if (!listaEl.classList.contains("active")) return;
            if (document.getElementById("playlistSelect").children[0]) document.getElementById("playlistSelect").replaceChildren();
            for (const playlist of playlists) {
                if (playlist.jogos.includes(Number(location.pathname.split("/")[2])) && !rmv) continue;
                else if (!playlist.jogos.includes(Number(location.pathname.split("/")[2])) && rmv) continue;
                const opt = document.createElement("option");
                opt.value = playlist.nome;
                opt.textContent = playlist.nome;
                document.getElementById("playlistSelect").append(opt);
            }
        }

        document.querySelector("#rbx-body > form > p:nth-child(5)").addEventListener("click", () => {
            if (rmv) {
                rmv = false;
                listaEl.children[2].children[0].textContent = "Adicionar à playlist";
                document.querySelector("#rbx-body > form > p:nth-child(5)").textContent = "Remover da playlist";
                aDudaEIncrivel();
            } else {
                rmv = true;
                listaEl.children[2].children[0].textContent = "Remover da playlist";
                document.querySelector("#rbx-body > form > p:nth-child(5)").textContent = "Adicionar à playlist";
                aDudaEIncrivel();
            }
        });

        listaEl.addEventListener("submit", e => {
            e.preventDefault();
            const nome = document.querySelector("#playlistSelect").selectedOptions[0].value;
            const lista = playlists.findIndex(e => e.nome == nome);

            rmv
                ? playlists[lista].jogos.splice(playlists[lista].jogos.indexOf(Number(location.pathname.split("/")[2])), 1)
                : playlists[lista].jogos.push(Number(location.pathname.split("/")[2]));

            chrome.storage.sync
                .set({ playlists })
                .then(() => {
                    alert("Playlist atualizada!");
                    aDudaEIncrivel();
                })
                .catch(console.log);
        });
    });
}
