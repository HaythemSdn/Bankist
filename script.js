

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200,-100];
let Name=prompt("please enter your name")

const date = new Date();
let mounth=date.getMonth()+1 >= 10 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
let day=date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
let Year=date.getFullYear() >= 10 ? date.getFullYear() : `0${date.getFullYear()}`;



let balance
labelWelcome.textContent = `Welcome ${Name}`
labelDate.textContent= `${day}/${mounth}/${Year}`
updateUI()


/////////////////////////////////////////////////


function displayMovements(movementsTable) {
  containerMovements.innerHTML = ""
  movementsTable.forEach((mov) => {
    const type = mov > 0 ? "deposit" : "withdrawal"
    // console.log(mov, type);
    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}"> ${type}</div>
    <div class="movements__value">${mov}.00€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("beforeend" ,html)
  })
}
function caclDisplaySummary(movementsTable) {
  // Cacl & Display Incomes
  let incomes = 0;
  movementsTable.forEach((mov) => {mov > 0 ? incomes += mov  : incomes+= 0})
  labelSumIn.textContent = `${incomes}.00€`

  // Calc & Display Outcomes

  const outcomes = Math.abs(movementsTable.filter((mov) => mov < 0).reduce((acc, curr, _ ) => acc + curr ));
  // console.log(outcomes);
  labelSumOut.textContent = `${outcomes}.00€`;
  labelSumInterest.textContent=`${incomes-outcomes}.00€`

}

function updateUI() {
  console.log(movements);
  displayMovements(movements)
  caclBalance();
  caclDisplaySummary(movements);
}


function caclBalance () {
  const currentBalance = movements.reduce((acc, curr) => acc + curr)
  labelBalance.textContent = `${currentBalance}.00€`;
  balance = currentBalance;
}
// accounts.forEach((acc) => {
//  caclBalance(acc)
// })

// 




btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const transferAmount = inputTransferAmount.value;

  inputTransferTo.value = inputTransferAmount.value = ""

  // Enlever transferAMount form the current account's movement
  movements.unshift(-transferAmount);
  updateUI()
})


btnLoan.addEventListener("click", function(e){
  e.preventDefault();
  const loanAmount = inputLoanAmount.value;

  
movements.unshift(+loanAmount);
  setTimeout(function(){
    inputLoanAmount.value=''
    updateUI()
  },1000)
 
 
})


// const tableTest = "abd-xyz-qsdf".split("-");
// const stringTest = ["qsdf", "abd", "xyz"].join("-");

// const mapTest = ["qsdf", "abd", "xyz"].map((str) => str[0]);
// const mapTest2 =  ["qsdf", "abd", "xyz"].forEach((str) => str[0]);
