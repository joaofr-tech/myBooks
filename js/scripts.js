
const inputNome = document.querySelector("#nome-livro")
const inputAutor = document.querySelector("#autor-livro")
const inputAno = document.querySelector("#ano-livro")
const inputPag = document.querySelector("#pag-livro")
const btnCadastro = document.querySelector("#cadastro")

btnCadastro.addEventListener("click", () => {
    // Validação básica
    if (!inputNome.value || !inputAutor.value || !inputAno.value || !inputPag.value) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const divLivro = document.createElement("div")
    const divHeader = document.createElement("div")
    const divContent = document.createElement("div")
    const tituloContent = document.createElement("h3")

    const autorContent = document.createElement("p")
    const autorStrong = document.createElement("strong")

    const divCardInfo = document.createElement("div")
    const infoSpanAno = document.createElement("span")
    const infoSpanPag = document.createElement("span")

    const divTags = document.createElement("div")

    // Adicionar classes
    divLivro.classList.add("cards-livros")
    divHeader.classList.add("card-header")
    divContent.classList.add("card-content")
    divCardInfo.classList.add("card-info")
    divTags.classList.add("tags")
    infoSpanAno.classList.add("info-item")
    infoSpanPag.classList.add("info-item")

    // Preencher conteúdo
    tituloContent.innerText = inputNome.value

    autorStrong.innerText = "Autor: "
    autorContent.append(autorStrong, inputAutor.value)

    infoSpanAno.innerText = `📅 ${inputAno.value}`
    infoSpanPag.innerText = `📄 ${inputPag.value} págs`

    // Montar estrutura
    divCardInfo.append(infoSpanAno, infoSpanPag)
    divContent.append(tituloContent, autorContent, divCardInfo, divTags)
    divLivro.append(divHeader, divContent)

    // Adicionar ao container
    document.querySelector(".cards-container").append(divLivro)

    // Limpar campos
    inputNome.value = ""
    inputAutor.value = ""
    inputAno.value = ""
    inputPag.value = ""

    // Fechar modal (Bootstrap)
    const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'))
    modal.hide()
})
