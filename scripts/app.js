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


budgetItemAddBtn.addEventListener('click', () => {
    budgetItemName = budgetItemNameInput.value;
    budgetItemAmount = budgetItemAmountInput.value;

    let budgetSave = {budgetTotal, budgetItemName, budgetItemAmount}
    saveToStorage(budgetSave);
    GetBudgetItems();
    //the items are duplicating when I add another item

    budgetAmount -= budgetItemAmount;
    budgetAmountText.innerText = `Budget $${budgetTotal} Left: $${budgetAmount}`; 

    budgetItemNameInput.value = '';
    budgetItemAmountInput.value = '';
})

budgetAmountBtn.addEventListener('click', () => {
    budgetAmount = budgetAmountInput.value;
    budgetTotal =  budgetAmountInput.value;
    //when items are deleted then more are added it removes the previous amout AND the new amount
    budgetAmountText.innerText = `Budget $${budgetTotal} Left: $${budgetAmount}`;
    budgetAmountInput.value = '';
}) 

const GetBudgetItems = () => {
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
            let budgetItemBack = item.budgetItemAmount;
            
            let budgetBack = Number(budgetItemBack.trim());
            budgetAmount *= 1;

            budgetAmountText.innerText = `Budget $${budgetTotal} Left: $${ budgetAmount + budgetBack}`;
        })

        p.appendChild(removeBtn);

        budgetItemText.appendChild(p);
    })
}
