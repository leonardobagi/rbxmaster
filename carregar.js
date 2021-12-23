fetch("https://robloxpromocodemaster-api.herokuapp.com/codigos/")
  .then((res) => res.json())
  .then((data) => {
    const promocodes = data;

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
      link.innerHTML = `Item: <a href="${promocodes[i].link}" target="blank"><strong>Ir até o item</strong></a>`;

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

      document
        .getElementById(`${promocodes[i].codigo}`)
        .addEventListener("click", () => {
          document.getElementById("pin").value = promocodes[i].codigo;
          document.querySelectorAll("button")[2].click();
        });
    }
    var testarTodos = document.createElement("h6");
    testarTodos.setAttribute("id", "testarTodosPromocodes");
    testarTodos.innerHTML = "Resgatar todos os promocodes ativos";
    document.getElementById("instructions").appendChild(testarTodos);

    document
      .getElementById("testarTodosPromocodes")
      .addEventListener("click", async () => {
        for (let it = 0; it < promocodes.length; it++) {
          document.getElementById("pin").value = promocodes[it].codigo;
          document.querySelectorAll("button")[2].click();
          const timeout = () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve("a");
              }, 2000);
            });
          };
          await timeout();
        }
        document.getElementById("success").style.display = "block";
        document.getElementById("success").style.visibility = "visible";
        document.getElementById("success-message").innerHTML =
          "Todos os promocodes resgatados!";
        setTimeout(() => {
          document.getElementById("success").style.display = "none";
          document.getElementById("success").style.visibility = "hidden";
          document.getElementById("success-message").innerHTML = "";
        }, 5000);
        if (document.getElementById("error").style.display == "block")
          document.getElementById("error").style.visibility = "hidden";
        document.getElementById("error").style.display = "none";
      });
  });
