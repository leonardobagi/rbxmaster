document.addEventListener("DOMContentLoaded", async () => {
    //#region
    const { waitForEl } = await import("../util/func.js");

    await waitForEl("#navigation > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > ul > li");
    const barraLateralInventario = document.querySelectorAll(
        "#navigation > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > ul > li"
    )[5];

    const li = document.createElement("li");
    li.innerHTML = `<a class="dynamic-overflow-container text-nav" href="/home?rbxmPlaylists=1" id="nav-playlists"><div>
    <img src=${chrome.runtime.getURL("img/playlistBarra.svg")} width="28" height="28" style="${
        document.body.classList.contains("dark-theme") ? "filter: invert(1)" : ""
    }"></img></div><span class="font-header-2 dynamic-ellipsis-item">Playlists</span></a>`;

    barraLateralInventario.insertAdjacentElement("afterend", li);

    //#endregion
});
