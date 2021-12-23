var verPromocodes = document.createElement("a");

verPromocodes.setAttribute("id", "btn-verPromocodes");
verPromocodes.innerHTML = "Promocodes Ativos V";
verPromocodes.style.fontSize = "20px";
verPromocodes.style.fontWeight = "bold";
document.getElementById("instructions").append(verPromocodes);
verPromocodes.insertAdjacentHTML("beforebegin", "<br><br>")

var elementosDiv = document.createElement("div");
elementosDiv.setAttribute("id", "itens-promocodigos");
document.getElementById("instructions").append(elementosDiv);

elementosDiv.style.display = "none";

verPromocodes.addEventListener("click", () => {
    if(verPromocodes.innerHTML == "Promocodes Ativos V"){
        verPromocodes.innerHTML = "Promocodes Ativos ꓥ";
        elementosDiv.style.display = "block";
    }else{
        verPromocodes.innerHTML = "Promocodes Ativos V";
        elementosDiv.style.display = "none";
    }
})


var promocodesScript2 = document.createElement("script");
promocodesScript2.setAttribute("src", chrome.runtime.getURL("carregar.js"));
document.querySelector("body").append(promocodesScript2);

document.querySelectorAll(".header.font-bold")[0].remove();
document.querySelectorAll("div.list-item")[0].remove();
