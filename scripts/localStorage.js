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

export { saveToStorage, getFromStorage, removeFromStorage}