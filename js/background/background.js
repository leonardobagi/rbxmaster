chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.item == ".robloSecurityCookie") {
        chrome.cookies.get(
            {
                url: "https://www.roblox.com",
                name: ".ROBLOSECURITY",
            },
            cookie => sendResponse({ cookie })
        );
        return true;
    }
    if (request.item == "abrirPaginaJogos") {
        chrome.tabs.create({
            url: request.linkJogo,
        });
    }
});
