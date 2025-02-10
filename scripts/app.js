
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
})



const saveToStorage = (item) => {
    let itemArr = getFromStorage();

    if(!itemArr.includes(item)){
        itemArr.push(item);
    }
    localStorage.setItem('SavedItem', JSON.stringify(itemArr));
}

const getFromStorage = () => {
    let localStorageData = localStorage.getItem('SavedItem');

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

const removeFromStorage = (item) => {
    let localStorageData = getFromStorage();
    let itemIndex = localStorageData.indexOf(item);

    localStorageData.splice(itemIndex, 1);

    localStorage.setItem('SavedItem', JSON.stringify(localStorageData));
}