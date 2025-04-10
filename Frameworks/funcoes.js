var ctxCabecalho;
var ctxLinks;
var ctxConteudo;
var ctxRodape;
var vetLinks = [];



function downloadHTMLCSS() {
    download('codeHTML', 'index.html');
    download('codeCSS', 'estilo.css');
}

// Função para adicionar título à página
function alterarTituloPagina() {
    let titulo = document.getElementById("tituloPagina").value;
    ctxHTML = ctxHTML.replace(/<title>[^<]*<\/title>/, `<title>${titulo}</title>`);
    gerarCodigo();
}



function adicionaLink() {
    let divLinks = document.getElementById('linksCriados');
    divLink = document.createElement("div");
    divLink.classList.add("d-flex", "flex-row", "justify-content-evenly", "border-bottom");

    input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'href');
    input.setAttribute('id', 'href');

    link = document.createElement("input");
    link.setAttribute('type', 'text');
    link.setAttribute('name', 'links');
    link.classList.add("form-control", "has-validation");

    let button = document.createElement("button");
    let icon = document.createElement("i")
    icon.classList.add("bi", "bi-archive");
    button.appendChild(icon);
    button.classList.add("btn", "btn-danger");
    button.onclick = function (event) {
        event.preventDefault();
        divLinks.removeChild(this.parentNode);
    };
    divLink.appendChild(link);
    divLink.appendChild(input);
    divLink.appendChild(button);

    divLinks.appendChild(divLink);
}

function configEstiloCabecalho() {
    bg = document.getElementById("corFundo").value;
    corFonte = document.getElementById("corFonte").value;
    tamFonte = document.getElementById("tamFonte").value;
    let alturaCabecalho = "100px";  // altura fixa para o cabeçalho
    let larguraCabecalho = "100%";  //  largura 100% para o cabeçalho
    ctxCabecalho = "#cabecalho{\n background-color:" + bg + ";\n";
    ctxCabecalho += " color:" + corFonte + ";\n";
    ctxCabecalho += " font-size:" + tamFonte + "pt;\n";
    ctxCabecalho += " height:" + alturaCabecalho + ";\n";
    ctxCabecalho += " width:" + larguraCabecalho + ";\n";
    ctxCabecalho += "}\n";
    return ctxCabecalho;
}

function configEstiloLinks() {
    corLink = document.getElementById("corLinks").value;
    estiloLinks = document.querySelector('input[name="estiloLinks"]:checked').value;
    let larguraLinks = "200px";  // largura fixa para os links
    ctxLinks = "a{\n color:" + corLink + ";\n";
    let aux = estiloLinks == "0" ? "none" : "underline";
    ctxLinks += " text-decoration:" + aux + ";\n";
    ctxLinks += " width:" + larguraLinks + ";\n";  // Largura para os links

    // Adicionando efeito hover
    ctxLinks += "a:hover {\n color: #FF6347;\n}";

    ctxLinks += "\n}\n";
    return ctxLinks;
}


function gerarCodigo() {
    let codeCSS = document.querySelector("#codeCSS");
    let css = configEstiloCabecalho();
    css += configEstiloLinks();
    codeCSS.value = css;

    let codeHTML = document.querySelector("#codeHTML");

    ctxHTML = "<html>\n<head>\n" +
        "<link rel='stylesheet' href='estilo.css'>\n" +
        "<title>" + document.getElementById("tituloPagina").value + "</title>\n" +
        "</head>\n<body>" +
        "<div id='cabecalho'>" + configHTMLCabecalho() + "</div>\n" +
        "<nav id='links'>\n" + configHtmlLinks() + "\n</nav>\n" +
        "<div id='conteudo'></div>\n" +
        "</body>\n</html>";

    codeHTML.value = ctxHTML;
}


function download(campo, arquivo) {
    if (arquivo.trim() === '')
        arquivo = document.getElementById("nomeHTML").value + ".html";
    var text = document.getElementById(campo).value;
    var blob = new Blob([text], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = arquivo.trim();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function configHTMLCabecalho() {
    let aux = document.querySelector("#textoCabecalho").value;
    ctxCabecalho = '<h1>' + aux + '</h1>';
    return ctxCabecalho;
}

function configHtmlLinks() {
    let links = document.getElementsByName("links");
    href = document.getElementsByName("href");
    ctxLinks = "";
    for (let index = 0; index < links.length; index++) {
        hrefa = href[index].value.split('\\');
        ctxLinks += '<a href="' + hrefa[hrefa.length - 1] + '">' + links[index].value + ' </a>';
    }
    return ctxLinks;
}
