const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const comeDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmout = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountxx = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML =  
        `${transaction.name} 
        <span>${operator} R$ ${amountxx}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})" >
        x
        </button>`
    
    transactionsUl.append(li)
}

const updateBalanceValues = () =>{
    const transactionsAmount = transactions 
    .map(transaction => transaction.amount)
    const total = transactionsAmount
    .reduce((accmulator, transaction) => accmulator + transaction, 0)
    .toFixed(2)
    const income = transactionsAmount
    .filter(value => value > 0)
    .reduce((accmulator, value) => accmulator + value, 0)
    .toFixed(2)
    const come = Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accmulator, value) => accmulator + value, 0))
    .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    comeDisplay.textContent = `R$ ${come}`

}
const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener( 'submit', event => {
    event.preventDefault()

    const transactionAmount = inputTransactionAmout.value.trim()
    const transactionName = inputTransactionName.value.trim()

    if(transactionName === '' || transactionAmount === ''){
        alert('Preencha todos os campos')
        return
    }

    const transaction = {
        id: generateID(), 
        name: transactionName,
        amount: Number(transactionAmount)        
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()


    inputTransactionName.value = ''
    inputTransactionAmout.value = ''

})
