// coisas que vao mudar na pagina de configuracoes
if (window.location.pathname == "/my/account") {
    document.addEventListener("DOMContentLoaded", async () => {
        const optionLi = document.createElement("li");
        optionLi.classList.add("menu-option", "rbxmaster");
        optionLi.innerHTML = `<a class="menu-option-content" href="#"> <span class="font-caption-header ng-binding" ng-bind="tab.label">RBXMaster</span> </a>`;
        const { waitForEl } = await import("./util/func.js");
        const data = await chrome.storage.sync.get();

        const opcoesValidas = ["mostrarArroba", "mostrarId", "mostrarBadges"];

        await waitForEl("#vertical-menu");
        document.getElementById("vertical-menu").appendChild(optionLi);

        const cfg = document.querySelector("#vertical-menu > .rbxmaster");
        const url = chrome.runtime.getURL("html/settings.html");
        const menuTxt = await (await fetch(url)).text();
        document.querySelector("#settings-container > div.tab-content.rbx-tab-content.ng-scope").insertAdjacentHTML("afterend", menuTxt);
        const menu = document.getElementById("rbxm");
        menu.style.display = "none";

        const formCfg = document.getElementById("rbxm-configuracoes-form");

        for (const [key, value] of Object.entries(data)) {
            console.log("🚀 ~ file: settings.js ~ line 23 ~ document.addEventListener ~ value", value);
            console.log("🚀 ~ file: settings.js ~ line 23 ~ document.addEventListener ~ key", key);
            if (key == "playlist" || key == "playlists") continue;
            if (value) {
                document.getElementById(key).checked = true;
            }
        }

        let aberto = false;

        formCfg.addEventListener("submit", async e => {
            e.preventDefault();

            const formData = Object.fromEntries(new FormData(formCfg));

            for (const key of opcoesValidas) {
                if (!formData[key]) formData[key] = false;
            }
            for (const [key, value] of Object.entries(formData)) {
                if (value == "on") {
                    formData[key] = true;
                }
                if (value == "true") {
                    formData[key] = true;
                }
                if (value == "false") {
                    formData[key] = false;
                }
                if (value == "off") {
                    formData[key] = false;
                }
            }
            console.log(formData);

            try {
                await chrome.storage.sync.set(formData);
                alert("Configurações salvas!");
            } catch (err) {
                console.error(err);
            }
        });

        cfg.addEventListener("click", () => {
            if (aberto) {
                document.querySelector("#settings-container > div.tab-content.rbx-tab-content.ng-scope").style.display = "block";
                menu.style.display = "none";
                menu.classList.remove("active");
                aberto = false;
            } else {
                document.querySelector("#settings-container > div.tab-content.rbx-tab-content.ng-scope").style.display = "none";
                menu.style.display = "block";
                document.querySelector("#vertical-menu > .active").classList.remove("active");
                menu.classList.add("active");
                aberto = true;
            }
        });
    });
}
