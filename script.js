let income = 0;
let expense = 0;
let goal = 0;

const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");
const list = document.getElementById("list");
const progressBar = document.getElementById("progressBar");
const goalText = document.getElementById("goalText");

const ctx = document.getElementById("budgetChart").getContext("2d");

const chart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            data: [0, 0],
            backgroundColor: [
                "#4CAF50",
                "#F44336"
            ]
        }]
    },
    options: {
        responsive: true
    }
});

function updateDashboard() {

    incomeDisplay.innerHTML = "₹" + income;

    expenseDisplay.innerHTML = "₹" + expense;

    const balance = income - expense;

    balanceDisplay.innerHTML = "₹" + balance;

    chart.data.datasets[0].data = [income, expense];

    chart.update();

    if(goal > 0){

        let percent = (balance / goal) * 100;

        if(percent > 100){
            percent = 100;
        }

        progressBar.style.width = percent + "%";

    }

}

function addIncome(){

    const name = document.getElementById("incomeName").value;

    const amount = Number(document.getElementById("incomeAmount").value);

    if(name=="" || amount<=0){

        alert("Enter valid income");

        return;

    }

    income += amount;

    const li = document.createElement("li");
    li.innerHTML =
`💰 ${name}
<span>+ ₹${amount}</span>
<button class="delete">❌</button>`;

li.querySelector(".delete").onclick=function(){

income-=amount;

li.remove();

updateDashboard();

}

    list.prepend(li);

    document.getElementById("incomeName").value = "";

    document.getElementById("incomeAmount").value = "";

    updateDashboard();

}

function addExpense(){

    const name = document.getElementById("expenseName").value;

    const amount = Number(document.getElementById("expenseAmount").value);

    if(name=="" || amount<=0){

        alert("Enter valid expense");

        return;

    }

    expense += amount;

    const li = document.createElement("li");

    li.innerHTML = "🛒 " + name + "<span>- ₹" + amount + "</span>";

    list.prepend(li);

    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";

    updateDashboard();

}

function setGoal(){

    goal = Number(document.getElementById("goal").value);

    goalText.innerHTML = "Goal: ₹" + goal;

    updateDashboard();

}
document.getElementById("darkBtn").onclick = function(){

document.body.classList.toggle("dark");

}