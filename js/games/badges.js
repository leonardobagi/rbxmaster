if (window.location.pathname.startsWith("/games")) {
    document.addEventListener("DOMContentLoaded", async () => {
        if ((await chrome.storage.sync.get("mostrarBadges")).mostrarBadges) {
            const placeId = window.location.pathname.split("/")[2];
            const badges = await (
                await fetch(`https://robloxpromocodemaster-api.herokuapp.com/robloxapis/badges`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ placeId: placeId }),
                    method: "POST",
                }).catch(console.log)
            ).json();
            const badgesAtivas = badges.filter(badge => badge.enabled);

            const obtidas = await (
                await fetch(
                    `https://badges.roblox.com/v1/users/${
                        document.querySelector("meta[name=user-data]").dataset.userid
                    }/badges/awarded-dates?badgeIds=${badgesAtivas.map(x => x.id).join(",")}`
                )
            ).json();

            const contador = document.createElement("div");
            const porcentagem =
                (obtidas.data.length / badgesAtivas.length) * 100 !== 100
                    ? ((obtidas.data.length / badgesAtivas.length) * 100).toPrecision(2)
                    : "100";
            contador.classList.add("rbxm-contador-badges");
            contador.insertAdjacentHTML(
                "afterbegin",
                `<p>Você possui <strong>${obtidas.data.length} de ${badgesAtivas.length}</strong> badges de ${window.location.pathname
                    .split("/")
                    .pop()
                    .replace(/-/g, " ")}!</p>
            <div class="rbxm-badges-progresso"><div style="width: ${parseInt(porcentagem)}%">${porcentagem + "%"}</div></div>
                `
            );
            document.querySelector("#game-badges-container > game-badges-list > div > div").insertAdjacentElement("afterend", contador);
        }
    });
}
