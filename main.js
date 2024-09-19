let currentStorage = localStorage;
function updateTable(){
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ''; 
    const keys = Object.keys(currentStorage);

    if (keys.length === 0){
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.setAttribute('colspan', '3');
        emptyCell.textContent = 'Данных нет';
        emptyRow.appendChild(emptyCell);
        tbody.appendChild(emptyRow);
    } 
    else{
        keys.forEach(key => {
            const value = currentStorage.getItem(key);
            const row = document.createElement('tr');
            const keyCell = document.createElement('td');
            keyCell.textContent = key;
            const valueCell = document.createElement('td');
            valueCell.textContent = value;
            const deleteCell = document.createElement('td');
            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = 'X';
            deleteSpan.className = 'delete-btn';
            deleteSpan.onclick = () => deleteItem(key);
            deleteCell.appendChild(deleteSpan);
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            row.appendChild(deleteCell);
            tbody.appendChild(row);
        });
    }
}

function getStorage(storageType){
    currentStorage = (storageType === 'localStorage') ? localStorage : sessionStorage;
    updateTable();
}

function saveItem(key, value){
    currentStorage.setItem(key, value);
    updateTable();
}

function deleteItem(key){
    const confirmed = confirm('Вы уверены, что хотите удалить эту запись?');
    if (confirmed){
        currentStorage.removeItem(key);
        updateTable();
    }
}

function clearStorage(){
    const confirmed = confirm('Вы уверены, что хотите полностью очистить хранилище?');
    if (confirmed){
        currentStorage.clear();
        updateTable();
    }
}

window.onload = function(){
    updateTable();
    const form = document.getElementById('data-form');
    form.onsubmit = function(event){
        event.preventDefault();
        const key = document.getElementById('key').value;
        const value = document.getElementById('value').value;
        saveItem(key, value);
        form.reset();
    };
};
