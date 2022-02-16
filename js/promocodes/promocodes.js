if (window.location.pathname == "/redeem") {
    document.addEventListener("DOMContentLoaded", async () => {
        const { waitForEl } = await import("../util/func.js");

        await waitForEl(".gift-card-instructions-container");

        var verPromocodes = document.createElement("a");

        verPromocodes.setAttribute("id", "btn-verPromocodes");
        verPromocodes.innerHTML = "Promocodes Ativos V";
        verPromocodes.style.fontSize = "20px";
        verPromocodes.style.fontWeight = "bold";
        document.querySelector(".gift-card-instructions-container").append(verPromocodes);
        verPromocodes.insertAdjacentHTML("beforebegin", "<br><hr><br>");

        var elementosDiv = document.createElement("div");
        elementosDiv.setAttribute("id", "itens-promocodigos");
        document.querySelector(".gift-card-instructions-container").append(elementosDiv);

        elementosDiv.style.display = "none";

        verPromocodes.addEventListener("click", () => {
            if (verPromocodes.innerHTML == "Promocodes Ativos V") {
                verPromocodes.innerHTML = "Promocodes Ativos ꓥ";
                elementosDiv.style.display = "block";
            } else {
                verPromocodes.innerHTML = "Promocodes Ativos V";
                elementosDiv.style.display = "none";
            }
        });

        // document.querySelectorAll(".header.font-bold")[0].remove();
        // document.querySelectorAll("div.list-item")[0].remove();

        var promocodes = await fetch("https://robloxpromocodemaster-api.herokuapp.com/codigos/");
        var promocodes = await promocodes.json();

        /* let promocodesNovos = promocodes.filter(el => el.codigoNovo);
            promocodesNovos.forEach(el => {
    
                let promocodesNovosEl = document.createElement("div");
                promocodesNovosEl.id = "promocodesNovos";
                document.getElementById("itens-promocodigos").append(promocodesNovosEl);
                
                var titulo = document.createElement("h5");
                titulo.setAttribute("class", "titulo-promocode");
                titulo.innerHTML = el.nome;
                document.getElementById(`promocodesNovos`).appendChild(titulo);
    
                var desc = document.createElement("ul");
                desc.setAttribute("id", "li-items" + i);
                document.getElementById(`promocodesNovos`).appendChild(desc);
    
                var categoria = document.createElement("li");
                categoria.setAttribute("class", "li-item");
                categoria.innerHTML = "Categoria: " + el.categoria;
    
                var codigo = document.createElement("li");
                codigo.setAttribute("class", "li-item");
                codigo.innerHTML = `<a href="#" id="${el.codigo}">Código: ${el.codigo}</a>`;
    
                var lancamento = document.createElement("li");
                lancamento.setAttribute("class", "li-item");
                lancamento.innerHTML = "Lançamento: " + el.lancamento;
    
                var expiracao = document.createElement("li");
                expiracao.setAttribute("class", "li-item");
                expiracao.innerHTML = "Expiração: " + el.expiracao;
    
                var link = document.createElement("li");
                link.setAttribute("class", "li-item");
                link.innerHTML = `Item: <a href="${el.linkDoItem}" target="blank"><strong>Ir até o item</strong></a>`;
         
                document.getElementById("li-items" + i).appendChild(categoria);
                document.getElementById("li-items" + i).appendChild(codigo);
                if (el.empresaParceria) {
                    var parceriaLi = document.createElement("li");
                    parceriaLi.innerHTML = `Parceria: <a href="${el.linkDaEmpresa}" target="blank" style="text-decoration: underline;"><strong>${el.empresaParceria}</strong></a>`;
                    parceriaLi.setAttribute("class", "li-item");
                    document.getElementById("li-items" + i).appendChild(parceriaLi);
                }
                document.getElementById("li-items" + i).appendChild(lancamento);
                document.getElementById("li-items" + i).appendChild(expiracao);
                document.getElementById("li-items" + i).appendChild(link);
    
                document.getElementById(`${el.codigo}`).addEventListener("click", () => {
                    document.getElementById("pin").value = el.codigo;
                    document.querySelectorAll("button")[2].click();
                });
                
                i += 1;
            });
     */

        for (let i = 0; i < promocodes.length; i++) {
            var item = document.createElement("div");
            item.setAttribute("id", `promocode${i}`);
            document.getElementById("itens-promocodigos").append(item);

            var titulo = document.createElement("h5");
            titulo.setAttribute("class", "titulo-promocode");
            titulo.innerHTML = promocodes[i].nome;
            document.getElementById(`promocode${i}`).appendChild(titulo);

            var desc = document.createElement("ul");
            desc.setAttribute("id", "li-items" + i);
            document.getElementById(`promocode${i}`).appendChild(desc);

            var categoria = document.createElement("li");
            categoria.setAttribute("class", "li-item");
            categoria.innerHTML = "Categoria: " + promocodes[i].categoria;

            var codigo = document.createElement("li");
            codigo.setAttribute("class", "li-item");
            codigo.innerHTML = `<a href="#" id="${promocodes[i].codigo}">Código: ${promocodes[i].codigo}</a>`;

            var lancamento = document.createElement("li");
            lancamento.setAttribute("class", "li-item");
            lancamento.innerHTML = "Lançamento: " + promocodes[i].lancamento;

            var expiracao = document.createElement("li");
            expiracao.setAttribute("class", "li-item");
            expiracao.innerHTML = "Expiração: " + promocodes[i].expiracao;

            var link = document.createElement("li");
            link.setAttribute("class", "li-item");
            link.innerHTML = `Item: <a href="${promocodes[i].linkDoItem}" target="blank"><strong>Ir até o item</strong></a>`;

            document.getElementById("li-items" + i).appendChild(categoria);
            document.getElementById("li-items" + i).appendChild(codigo);
            if (promocodes[i].empresaParceria) {
                var parceriaLi = document.createElement("li");
                parceriaLi.innerHTML = `Parceria: <a href="${promocodes[i].linkDaEmpresa}" target="blank" style="text-decoration: underline;"><strong>${promocodes[i].empresaParceria}</strong></a>`;
                parceriaLi.setAttribute("class", "li-item");
                document.getElementById("li-items" + i).appendChild(parceriaLi);
            }
            document.getElementById("li-items" + i).appendChild(lancamento);
            document.getElementById("li-items" + i).appendChild(expiracao);
            document.getElementById("li-items" + i).appendChild(link);

            /*             let clicarCodigo = document.getElementById(`${promocodes[i].codigo}`);
            clicarCodigo.addEventListener("click", () => {
                document.getElementById("pin").value = clicarCodigo.id;
                document.querySelectorAll("button")[2].click();
            }); */
        }
        /*         var testarTodos = document.createElement("h6");
        testarTodos.setAttribute("id", "testarTodosPromocodes");
        testarTodos.innerHTML = "Resgatar todos os promocodes ativos";
        document.querySelector(".gift-card-instructions-container").appendChild(testarTodos);

        document.getElementById("testarTodosPromocodes").addEventListener("click", async () => {
            for (let it = 0; it < promocodes.length; it++) {
                document.querySelector(".form-control.input-field.code-input.pin").value = promocodes[it].codigo;
                document.querySelectorAll("button")[2].click();
                await new Promise(resolve => {
                    setTimeout(() => {
                        resolve("a");
                    }, 2000);
                });
            }
            document.getElementById("success").style.display = "block";
            document.getElementById("success").style.visibility = "visible";
            document.getElementById("success-message").innerHTML = "Todos os promocodes resgatados!";
            setTimeout(() => {
                document.getElementById("success").removeAttribute("style");
                document.getElementById("error").removeAttribute("style");
                document.getElementById("success-message").innerHTML = "";
            }, 5000);
            if (document.getElementById("error").style.display == "block") document.getElementById("error").style.visibility = "hidden";
            document.getElementById("error").style.display = "none";
        }); */
    });
}
