/**
 * 
 * @param {Object} input cpf input value
 * @returns {Object} with correct cpf format
*/
function formatCpf (input) {
    cpf = input.value

    cpf = cpf.replace(/\D/g,"")
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    input.value = cpf

    return input
}

/**
 * 
 * @param {number}
 * @returns {string} returns string with money format
*/
function numberToMoney (number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return formatter.format(number)
}

/**
 * @returns {Object} product card to insert in HTML
*/
let currentPage = 1
async function insertProduct () {
    const productArea = document.getElementById('product-area')
    
    let nextPage = currentPage + 1
    let response = await fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${currentPage}`)
    response = await response.json()
    
    response.products.forEach(product => {
        
        let productCard = `
            <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <p class="product-name">${product.name}</p>
            <p class="product-description">${product.description}</p>
            <p class="product-old-price">De: ${numberToMoney(product.oldPrice)}</p>
            <p class="product-price">Por: ${numberToMoney(product.price)}</p>
            <p class="product-installment">ou ${product.installments.count}x de ${numberToMoney(product.installments.value)}</p>
            <button>Comprar</button>
            </div>
        `
        
        productArea.innerHTML += productCard
    });

    currentPage = nextPage
}

