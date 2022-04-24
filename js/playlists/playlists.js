const usp = new URLSearchParams(window.location.search);
if (usp.has("rbxmPlaylists")) {
    document.addEventListener("DOMContentLoaded", async () => {
        const { waitForEl } = await import("../util/func.js");
        const { containerzarPlaylists } = await import("../util/playlistsContainer.js");

        // conseguir playlists do banco de dados
        const playlists = (await chrome.storage.sync.get("playlists")).playlists || [];
        await waitForEl("#listas");

        // loop pelas playlists
        for (const lista of playlists) {
            const liLista = document.createElement("li");

            const titulo = document.createElement("h3");
            titulo.textContent = lista.nome;

            // botao de editar playlists na pagina inicial
            const editarLink = document.createElement("a");
            editarLink.classList.add("editarPlaylist");
            editarLink.textContent = "Mais >";
            editarLink.setAttribute("playlist", lista.nome);

            titulo.append(editarLink);

            liLista.append(titulo);

            // container de jogos

            containerzarPlaylists(lista.jogos, false).then(container => liLista.append(container));

            // por o cotainer na lista
            document.getElementById("listas").appendChild(liLista);
        }

        // document.getElementById("carregando").remove();

        document.getElementById("adicionar").addEventListener("click", () => {
            [document.querySelector(".addPlaylist"), document.getElementById("simplemodal-overlay")].forEach(el => (el.style.display = "flex"));
        });

        document.querySelector(".addPlaylist > p").addEventListener("click", () => {
            [document.querySelector(".addPlaylist"), document.getElementById("simplemodal-overlay")].forEach(el => (el.style.display = "none"));
        });

        document.querySelector("form#addPlaylist").addEventListener("submit", e => {
            e.preventDefault();

            const formData = new FormData(document.querySelector("form#addPlaylist"));
            const data = Object.fromEntries(formData);

            if (playlists.some(playlist => playlist.nome == data.nomePlaylist)) return alert("Já existe uma playlist com este nome!");
            playlists.push({
                nome: data.nomePlaylist,
                descricao: data.descricaoPlaylist,
                jogos: [],
            });

            chrome.storage.sync.set({ playlists: playlists }).then(() => alert("Playlist criada!"));
        });

        document.querySelectorAll(".editarPlaylist").forEach(el => {
            el.addEventListener("click", async () => {
                const playlist = el.getAttribute("playlist");

                const data = (await chrome.storage.sync.get("playlists")).playlists.find(lista => lista.nome == playlist);

                document.getElementById("rbxm-playlists-container").style.display = "none";

                const playlistInfoHtml = await (await fetch(chrome.runtime.getURL("html/playlistsInfo.html"))).text();
                document.getElementById("rbxm-playlists-container").insertAdjacentHTML("afterend", playlistInfoHtml);

                document.querySelector(".nomePlaylist").textContent = data.nome;

                const editarPlaylist = document.createElement("h3");
                editarPlaylist.style.cursor = "pointer";
                editarPlaylist.textContent = "Editar playlist";
                editarPlaylist.style.float = "right";
                document.querySelector(".nomePlaylist").append(editarPlaylist);
                document.querySelector(".nomePlaylist").dataset.nome = data.nome;

                document.querySelector(".descricaoPlaylist").textContent = data.descricao || "Sem descrição...";
                document.querySelector(".descricaoPlaylist").dataset.descricao = data.descricao;

                const voltar = document.createElement("h4");

                // se apertar o botao de voltar, remover a pagina de informações e voltar a inicial
                voltar.addEventListener("click", () => {
                    document.getElementById("rbxm-playlists-container").style.display = "block";
                    document.querySelector(".playlistInfo").remove();
                });
                voltar.textContent = "< Voltar";

                document.querySelector(".playlistInfo").prepend(voltar);

                editarPlaylist.addEventListener("click", () => {
                    document.querySelector(".simplemodal-overlay2").style.display = "block";
                    document.querySelector(".editarPlaylistContainer").style.display = "flex";
                });

                document.querySelector(".editarPlaylistContainer > p").addEventListener("click", () => {
                    document.querySelector(".simplemodal-overlay2").style.display = "none";
                    document.querySelector(".editarPlaylistContainer").style.display = "none";
                });

                document.getElementById("editarPlaylist").addEventListener("submit", e => {
                    e.preventDefault();

                    const playlistDatas = {
                        nome: document.querySelector(".nomePlaylist").dataset.nome,
                    };
                    const formData = new FormData(document.getElementById("editarPlaylist"));
                    const data = Object.fromEntries(formData);
                    if (playlists.some(list => list.nome == data.nome)) return alert("Já existe uma playlist com este nome!");

                    const playlist = playlists.find(e => e.nome == playlistDatas.nome);

                    playlists.splice(playlists.indexOf(playlist), 1);

                    playlist.nome = data.novoNomePlaylist || playlist.nome;
                    playlist.descricao = data.novaDescricaoPlaylist || playlist.descricao;

                    playlists.push(playlist);

                    chrome.storage.sync.set({ playlists }).then(() => alert("Playlist atualizada!"));
                });

                if (data.jogos.length) containerzarPlaylists(data.jogos, true).then(jogos => document.getElementById("jogos").append(jogos));
                else {
                    const nada = document.createElement("div").insertAdjacentHTML("afterbegin", "<br><br><h3>Nada aqui...</h3>");
                    document.getElementById("jogos").append(nada);
                }
            });
        });
    });
}
