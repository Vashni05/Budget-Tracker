// ================= VARIABLES =================

let income = Number(localStorage.getItem("income")) || 0;
let expense = Number(localStorage.getItem("expense")) || 0;
let goal = Number(localStorage.getItem("goal")) || 0;

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");

const list = document.getElementById("list");

const progressBar = document.getElementById("progressBar");
const goalText = document.getElementById("goalText");

// ================= CHART =================

const ctx = document.getElementById("budgetChart").getContext("2d");

const chart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            data: [income, expense],
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

// ================= UPDATE DASHBOARD =================

function updateDashboard(){

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

        if(percent < 0){
            percent = 0;
        }

        progressBar.style.width = percent + "%";
    }

    goalText.innerHTML = "Goal: ₹" + goal;

    localStorage.setItem("income", income);
    localStorage.setItem("expense", expense);
    localStorage.setItem("goal", goal);
    localStorage.setItem("transactions", JSON.stringify(transactions));

}

// ================= DISPLAY TRANSACTIONS =================

function displayTransactions(){

    list.innerHTML = "";

    transactions.forEach((item,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
            ${item.icon} ${item.name}
            <span>${item.sign} ₹${item.amount}</span>
            <button class="delete" onclick="deleteTransaction(${index})">❌</button>
        `;

        list.appendChild(li);

    });

}

// ================= ADD INCOME =================

function addIncome(){

    const name=document.getElementById("incomeName").value.trim();

    const amount=Number(document.getElementById("incomeAmount").value);

    if(name==="" || amount<=0){

        alert("Please enter valid income.");

        return;

    }

    income+=amount;

    transactions.unshift({
        type:"income",
        icon:"💰",
        sign:"+",
        name:name,
        amount:amount
    });

    document.getElementById("incomeName").value="";
    document.getElementById("incomeAmount").value="";

    updateDashboard();
    displayTransactions();

}

// ================= ADD EXPENSE =================

function addExpense(){

    const name=document.getElementById("expenseName").value.trim();

    const amount=Number(document.getElementById("expenseAmount").value);

    if(name==="" || amount<=0){

        alert("Please enter valid expense.");

        return;

    }

    expense+=amount;

    transactions.unshift({
        type:"expense",
        icon:"🛒",
        sign:"-",
        name:name,
        amount:amount
    });

    document.getElementById("expenseName").value="";
    document.getElementById("expenseAmount").value="";

    updateDashboard();
    displayTransactions();

}

// ================= DELETE TRANSACTION =================

function deleteTransaction(index){

    if(transactions[index].type==="income"){

        income-=transactions[index].amount;

    }else{

        expense-=transactions[index].amount;

    }

    transactions.splice(index,1);

    updateDashboard();
    displayTransactions();

}

// ================= GOAL =================

function setGoal(){

    goal=Number(document.getElementById("goal").value);

    updateDashboard();

}

// ================= DARK MODE =================

const darkBtn=document.getElementById("darkBtn");

if(darkBtn){

    darkBtn.onclick=function(){

        document.body.classList.toggle("dark");

    }

}

// ================= INITIAL LOAD =================

updateDashboard();
displayTransactions();
