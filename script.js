const transactionUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expanseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

let dummyTransactions = [
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 2, name: 'Salário', amount: 300},
    {id: 3, name: 'Torta de frango', amount: -10},
    {id: 4, name: 'Violão', amount: 150}
]

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID);
    init();
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${transaction.name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
            x
        </button>
    `;
    
    transactionUl.append(li);
}

const updateBalanceValues = () => {
    const transactionAmounts = dummyTransactions
        .map(transaction => transaction.amount);
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);

    //valor das receitas
    const income = transactionAmounts
        .filter(values => values > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);

    //valor das despesas
    const expanse = Math.abs(transactionAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2);
    
    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expanseDisplay.textContent = `R$ ${expanse}`;
}

//itera pelos arrays das transacoes, e para cada item desse array ela insere item que é uma transacao no DOM
const init = () => {
    transactionUl.innerHTML = ''; //limpar para nao repetir todo conteudo do objeto
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
}

init();

//gera uma propriedade de nummero aleatorio de 1 a 1000
const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener("submit", event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if(transactionName === '' || transactionAmount === ''){
        alert('Por favor, preencha tanto o nome quanto o valor da transação');
        return;
    }

    const transaction = { 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) //poderiamos colocar o operador +, ficando +transactionAmount, que significa unario que converte string em numero 
    };

    //inserir ultimo item do array
    dummyTransactions.push(transaction);

    //adicionar item na lista de transacoes e atualizar os valores da receita e despesa
    init();

    //limpar os inputs
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
});