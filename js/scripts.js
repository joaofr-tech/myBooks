const inputNome = document.querySelector("#nome-livro")
const inputAutor = document.querySelector("#autor-livro")
const inputAno = document.querySelector("#ano-livro")
const inputPag = document.querySelector("#pag-livro")
const inputTags = document.querySelector("#tags-livro")
const inputSobre = document.querySelector("#sobre-livro")
const btnCadastro = document.querySelector("#cadastro")
const cardsContainer = document.querySelector(".cards-container")

function carregarLivros() {
    const livrosSalvos = localStorage.getItem('livros')
    return livrosSalvos ? JSON.parse(livrosSalvos) : []
}

function salvarLivros(livros) {
    localStorage.setItem('livros', JSON.stringify(livros))
}

function criarCardLivro(livro) {
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

    divLivro.classList.add("cards-livros")
    divHeader.classList.add("card-header")
    divContent.classList.add("card-content")
    divCardInfo.classList.add("card-info")
    divTags.classList.add("tags")
    infoSpanAno.classList.add("info-item")
    infoSpanPag.classList.add("info-item")

    tituloContent.innerText = livro.nome
    autorStrong.innerText = "Autor: "
    autorContent.append(autorStrong, livro.autor)
    infoSpanAno.innerText = `📅 ${livro.ano}`
    infoSpanPag.innerText = `📄 ${livro.paginas} págs`

    if (livro.tags && livro.tags.length > 0) {
        livro.tags.forEach(tag => {
            const tagSpan = document.createElement("span")
            tagSpan.innerText = tag
            divTags.append(tagSpan)
        })
    }

    if (livro.sobre) {
        const sobreContent = document.createElement("p")
        sobreContent.classList.add("card-description")
        sobreContent.innerText = livro.sobre
        divContent.append(sobreContent)
    }

    divCardInfo.append(infoSpanAno, infoSpanPag)
    divContent.append(tituloContent, autorContent, divCardInfo)
    
    if (divTags.children.length > 0) {
        divContent.append(divTags)
    }
    
    divLivro.append(divHeader, divContent)
    return divLivro
}

function renderizarLivros() {
    cardsContainer.innerHTML = ''
    const livros = carregarLivros()
    
    livros.forEach(livro => {
        const card = criarCardLivro(livro)
        cardsContainer.append(card)
    })
}

btnCadastro.addEventListener("click", () => {
    if (!inputNome.value || !inputAutor.value || !inputAno.value || !inputPag.value) {
        alert("Por favor, preencha pelo menos Nome, Autor, Ano e Páginas!")
        return
    }

    let tagsArray = []
    if (inputTags.value.trim()) {
        tagsArray = inputTags.value.split(/[,\s]+/)
            .filter(tag => tag.trim())
            .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
    }

    const novoLivro = {
        nome: inputNome.value,
        autor: inputAutor.value,
        ano: inputAno.value,
        paginas: inputPag.value,
        tags: tagsArray,
        sobre: inputSobre.value.trim() || null,
        id: Date.now()
    }

    const livros = carregarLivros()
    livros.push(novoLivro)
    salvarLivros(livros)
    renderizarLivros()

    inputNome.value = ""
    inputAutor.value = ""
    inputAno.value = ""
    inputPag.value = ""
    inputTags.value = ""
    inputSobre.value = ""

    const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'))
    modal.hide()
})

document.addEventListener('DOMContentLoaded', () => {
    renderizarLivros()
})