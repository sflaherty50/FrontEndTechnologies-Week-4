class Order {
    constructor(mealsize,drink,sideorder) {
        this.mealsize = mealsize;
        this.drink = drink;
        this.sideorder = sideorder;
    }
}

class ValueMeal{
    constructor(id, mealtype) {
    this.id = id;
    this.mealtype = mealtype;
    this.orders = [];
    }

    addOrder(order) {
        this.orders.push(order);
    }

    deleteOrder(order) {
        let index = this.orders.indexOf(order);
        this.orders.splice(index, 1);
    }
}

let valuemeals = [];
let valuemealId = 0;

onClick('new-valuemeal', () => {
    valuemeals.push(new ValueMeal(valuemealId++, getValue('new-valuemeal-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let valuemealDiv = document.getElementById('valuemeals');
    clearElement(valuemealDiv);
    for (valuemeal of valuemeals) {
        let table = createValueMealTable(valuemeal);
        let title = document.createElement('h2');
        title.innerHTML = valuemeal.mealtype;
        title.appendChild(createDeleteValueMealButton(valuemeal));
        valuemealDiv.appendChild(title);
        valuemealDiv.appendChild(table);
        for (order of valuemeal.orders) {
            createOrderRow(valuemeal, table, order);
        }
    }
}

function createOrderRow(valuemeal, table, order) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = order.mealsize;
    row.insertCell(1).innerHTML = order.drink;
    row.insertCell(2).innerHTML = order.sideorder;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(valuemeal, order));
}

function createDeleteRowButton(valuemeal, order) {
    let btn = document.createElement('button');
    btn.classMealSize = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = valuemeal.orders.indexOf(order);
        valuemeal.orders.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteValueMealButton(valuemeal) {
    let btn = document.createElement('button');
    btn.classMealSize = 'btn btn-primary';
    btn.innerHTML = 'Delete ValueMeal';
    btn.onclick = () => {
        let index = valuemeals.indexOf(valuemeal);
        valuemeals.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewOrderButton(valuemeal){
    let btn = document.createElement('button');
    btn.classMealSize = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        valuemeal.orders. push(new Order(getValue (`mealsize-input-${valuemeal.id}`), getValue (`drink-input-${valuemeal.id}`), getValue (`sideorder-input-${valuemeal.id}`)));
        drawDOM();
    };
    return btn;
}

function createValueMealTable(valuemeal) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-stripped');
    let row = table.insertRow(0);
    let mealsizeColumn = document.createElement('th');
    let drinkColumn = document.createElement('th');
    let sideorderColumn = document.createElement('th');
    mealsizeColumn.innerHTML = 'MealSize';
    drinkColumn.innerHTML = 'Drink';
    sideorderColumn.innerHTML = 'SideOrder';
    row.appendChild(mealsizeColumn);
    row.appendChild(drinkColumn);
    row.appendChild(sideorderColumn);
    let formRow = table.insertRow(1);
    let mealsizeTh = document.createElement('th');
    let drinkTh = document.createElement('th');
    let sideorderTh = document.createElement('th');
    let createTh = document.createElement('th');
    let mealsizeInput = document.createElement('input');
    mealsizeInput.setAttribute('id',`mealsize-input-${valuemeal.id}`);
    mealsizeInput.setAttribute('type', 'text');
    mealsizeInput.setAttribute('class', 'form-control');
    let drinkInput = document.createElement('input');
    drinkInput.setAttribute('id',`drink-input-${valuemeal.id}`);
    drinkInput.setAttribute('type', 'text');
    drinkInput.setAttribute('class', 'form-control');
    let sideorderInput = document.createElement('input');
    sideorderInput.setAttribute('id',`sideorder-input-${valuemeal.id}`);
    sideorderInput.setAttribute('type', 'text');
    sideorderInput.setAttribute('class', 'form-control');
    let newOrderButton = createNewOrderButton(valuemeal);
    mealsizeTh.appendChild(mealsizeInput);
    drinkTh.appendChild(drinkInput);
    sideorderTh.appendChild(sideorderInput);
    createTh.appendChild(newOrderButton);
    formRow.appendChild(mealsizeTh);
    formRow.appendChild(drinkTh);
    formRow.appendChild(sideorderTh);
    formRow.appendChild(createTh);
    return table;

}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}