import { saveToStorage, getFromStorage, removeFromStorage } from "./localStorage.js";

const budgetAmountInput = document.getElementById("budgetAmountInput");
const budgetAmountBtn = document.getElementById("budgetAmountBtn");
const budgetAmountText = document.getElementById("budgetAmountText");

const budgetItemNameInput = document.getElementById("budgetItemNameInput");
const budgetItemAmountInput = document.getElementById("budgetItemAmountInput");
const budgetItemText = document.getElementById("budgetItemText");
const budgetItemAddBtn = document.getElementById("budgetItemAddBtn");

let budgetAmount = 0;
let budgetItemName = '';
let budgetItemAmount = 0;

budgetAmountBtn.addEventListener('click', () => {
    budgetAmount = budgetAmountInput.value;
    budgetAmountText.innerText = `Budget $${budgetAmount}`;
    budgetAmountInput.value = '';
}) 

budgetItemAddBtn.addEventListener('click', () => {
    budgetItemName = budgetItemNameInput.value;
    budgetItemAmount = budgetItemAmountInput.value;

    let budgetSave = {budgetItemName, budgetItemAmount}
    saveToStorage(budgetSave);
    GetBudgetItems();

    budgetItemNameInput.value = '';
    budgetItemAmountInput.value = '';
})


const GetBudgetItems = async () => {
    let storedItem = getFromStorage();

    storedItem.map(item => {
        console.log(item);

        let p = document.createElement('p');
        p.className = "m-5";
        p.innerText = `${item.budgetItemName} $${item.budgetItemAmount}`;

        let removeBtn = document.createElement('i');
        removeBtn.type = 'button';
        removeBtn.className = 'removeBtn p-2 m-2';
        removeBtn.innerText = 'delete';

        removeBtn.addEventListener('click', () => {
            removeFromStorage(item);
            p.remove();
        })

        p.appendChild(removeBtn);

        budgetItemText.appendChild(p);
    })
}

GetBudgetItems();