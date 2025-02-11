import { saveToStorage, getFromStorage, removeFromStorage } from "./localStorage.js";

const budgetAmountInput = document.getElementById("budgetAmountInput");
const budgetAmountBtn = document.getElementById("budgetAmountBtn");
const budgetAmountText = document.getElementById("budgetAmountText");

const budgetItemNameInput = document.getElementById("budgetItemNameInput");
const budgetItemAmountInput = document.getElementById("budgetItemAmountInput");
const budgetItemText = document.getElementById("budgetItemText");
const budgetItemAddBtn = document.getElementById("budgetItemAddBtn");

let budgetAmount = 0;
let budgetTotal = 0;
let budgetItemName = '';
let budgetItemAmount = 0;

budgetAmountBtn.addEventListener('click', () => {
    budgetAmount = budgetAmountInput.value;
    budgetTotal =  budgetAmountInput.value
    budgetAmountText.innerText = `Budget $${budgetTotal} Left: $${budgetAmount}`;
    budgetAmountInput.value = '';
}) 

budgetItemAddBtn.addEventListener('click', () => {
    budgetItemName = budgetItemNameInput.value;
    budgetItemAmount = budgetItemAmountInput.value;

    let budgetSave = {budgetAmount, budgetItemName, budgetItemAmount}
    saveToStorage(budgetSave);
    GetBudgetItems();

    budgetAmountText.innerText = `Budget $${budgetAmount - budgetItemAmount}`;

    budgetItemNameInput.value = '';
    budgetItemAmountInput.value = '';
})


const GetBudgetItems = async () => {
    let storedItem = getFromStorage();

    storedItem.map(item => {
        console.log(item);

        let p = document.createElement('p');
        p.className = "m-4 ";
        p.innerText = `${item.budgetItemName} $${item.budgetItemAmount}`;

        let removeBtn = document.createElement('i');
        removeBtn.type = 'button';
        removeBtn.className = 'removeBtn p-2 m-2';
        removeBtn.innerText = 'delete';

        removeBtn.addEventListener('click', () => {
            removeFromStorage(item);
            p.remove();
            const budgetBack = parseFloat(item.budgetItemAmount);
            budgetAmountText.innerText = `Budget $${budgetAmount + budgetBack}`;
        })

        p.appendChild(removeBtn);

        budgetItemText.appendChild(p);
    })
}

GetBudgetItems();