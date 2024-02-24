let userForm = document.getElementById('user_form')
const operationsMenuWindow = document.getElementById('operations_menu_window');
const userDb = [
    {
        usuario: 'Miguel Barrios',
        contraseña: 'barrios2030',
        saldo: 200
    },
    {
        usuario: 'Esthela Tamayo',
        contraseña: 'tamayo4050',
        saldo: 290
    },
    {
        usuario: 'Mara Bernal',
        contraseña: 'bernal6070',
        saldo: 67
    }
]
console.log(userDb);

//Mostrar error de ingreso de usuario
function showUserError (data){
    let showError = document.getElementById('user_error')
    showError.classList.remove('hide_error')
    showError.classList.add('show_error')
    showError.innerHTML = data

    setTimeout(()=>{
        showError.classList.remove('show_error')
        showError.classList.add('hide_error')
        showError.innerHTML = ''
    }, 3000)
}

//Validar usuario
function userValidation(user,password){
    console.log('userValidation',user,password);

    for(let index = 0; index < userDb.length; index++){
        if(user == userDb[index].usuario && password == userDb[index].contraseña){
            console.log('Bienvenido');
            createWindow()
        }
        else if(user == '' & password == ''){
            console.log('Sin datos');
            showUserError('Ingrese sus datos')
        }
        else if(user != userDb[index].usuario){
            console.log('Wrong user');
            showUserError('Su usuario es incorrecto, intente de nuevo')
        }
        else if(password != userDb[index].contraseña){
            console.log('Wrong password');
            showUserError('Su contraseña es incorrecta, intente de nuevo')
        }
        else{
            console.log('No existe');
        }
    }
}

//Botón de ingreso
userForm.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    let userInput = document.getElementById('user_input').value
    let passwordInput = document.getElementById('password_input').value

    console.log('Submited',userInput,passwordInput);

    userValidation(userInput, passwordInput)
})

/*------------------------ Consultas ------------------------------*/

//Botón de consulta
const showBalance = document.getElementById('show_balance');
let userInput = document.getElementById('user_input').value;
let actualBalance = document.getElementById('actual_balance');
let balanceQuantity = userDb.find(item => item.usuario === userInput);

showBalance.addEventListener('click', (e) =>{
    e.preventDefault()
    popUpConsult()
    actualBalance.innerHTML = 'Su balance actual es de $' + balanceQuantity.saldo
    console.log('User input' + userInput);
})

//Botón para regresar de consulta
const returnFromBalance = document.getElementById('return_from_balance');
returnFromBalance.addEventListener('click', (e) =>{
    e.preventDefault()
    popUpMenuFromConsult()
})

/* ---------------------  Depósitos -------------------*/
//Botón de depósitos
const showDeposit = document.getElementById('show_deposit')
showDeposit.addEventListener('click', (e) =>{
    e.preventDefault()
    popUpDeposit()
})

//Cálculo de depósitos
function depositTransaction (insert){
    let addition = parseInt(balanceQuantity.saldo) + insert;
    console.log(addition);
    if(addition >= 10 && addition <= 990){
        userDb.map(function(dato){
            if(dato.usuario == userInput){
                dato.saldo = addition;
            }
            return dato;
        })
        alert('Su nuevo saldo es de $' + addition)
    }else{
        alert('Lo siento, su saldo no puede superar los $990. Ingrese otra cantidad')
    }
    
}


//Botón depositar
const depositForm = document.getElementById('deposit_form');
depositForm.addEventListener('submit', (evento) =>{
    evento.preventDefault()
    let depositInput = parseInt(document.getElementById('deposit_input').value);
    depositTransaction(depositInput)
    console.log('deposit input ' + depositInput);
    console.log( typeof(depositInput) );
    
})

//Botón para regresar de depósitos
const returnFromDeposit = document.getElementById('return_from_deposit');
returnFromDeposit.addEventListener('click', (e) =>{
    e.preventDefault()
    popUpMenuFromDeposit()
})


/* ----------------------------- Retiros --------------------------- */
//Botón de retiros
const showWithdraw = document.getElementById('show_withdraw');
showWithdraw.addEventListener('click', (e) =>{
    e.preventDefault()
    popUpWithdraw()
})

//Botón para regresar de retiros
const returnFromWithdraw = document.getElementById('return_from_withdraw');
returnFromWithdraw.addEventListener('click', (e) =>{
    e.preventDefault()
    popUpMenuFromWithdraw()
})

//Cálculo de retiros
function withdrawTransaction(insert){
    let subtraction = parseInt(balanceQuantity.saldo) - insert;
    console.log(subtraction);
    if(subtraction >= 10 && subtraction <= 990){
        userDb.map(function(dato){
            if(dato.usuario == userInput){
                dato.saldo = subtraction;
            }
            return dato;
        })
        alert('Su nuevo saldo es de $' + subtraction)
    }else{
        alert('Lo siento, su saldo no puede ser menor a $10. Ingrese otra cantidad')
    }
}

//Botón para retirar
const withdrawForm = document.getElementById('withdraw_form');
withdrawForm.addEventListener('submit', (evento) =>{
    evento.preventDefault()
    let withdrawInput = parseInt(document.getElementById('withdraw_input').value)
    withdrawTransaction(withdrawInput)
})

/*----------------  Entrar a banca ------------------*/

//Cerrar ventana de inicio de usuario y abrir menú de la banca
function createWindow(){
    let userInput = document.getElementById('user_input').value;
    const userGreeting = document.getElementById('user_greeting');
    const bankInterface = document.getElementById('bank_interface');

    userForm.classList.remove('form_input')
    userForm.classList.add('hide_error')

    bankInterface.classList.remove('hide_error')
    bankInterface.classList.add('bank_interface_style')

    userGreeting.innerHTML = 'Bienvenido ' + userInput

}

/*-------------- Ventanas de operaciones -------------------*/

//Abrir y cerrar ventana de consulta de saldo
function popUpConsult(){
    const balanceWindow = document.getElementById('balance_window');

    balanceWindow.classList.remove('hide_error')
    balanceWindow.classList.add('operation_window')

    operationsMenuWindow.classList.remove('operation_menu')
    operationsMenuWindow.classList.add('hide_error')
}
function popUpMenuFromConsult(){
    const balanceWindow = document.getElementById('balance_window');

    balanceWindow.classList.add('hide_error')
    balanceWindow.classList.remove('operation_window')

    operationsMenuWindow.classList.add('operation_menu')
    operationsMenuWindow.classList.remove('hide_error')
}


//Abrir y cerrar ventana de depósitos
function popUpDeposit(){
    const depositWindow = document.getElementById('deposit_window');

    depositWindow.classList.remove('hide_error')
    depositWindow.classList.add('operation_window')

    operationsMenuWindow.classList.remove('operation_menu')
    operationsMenuWindow.classList.add('hide_error')
}
function popUpMenuFromDeposit(){
    const depositWindow = document.getElementById('deposit_window');

    depositWindow.classList.add('hide_error')
    depositWindow.classList.remove('operation_window')

    operationsMenuWindow.classList.add('operation_menu')
    operationsMenuWindow.classList.remove('hide_error')
}


//Abrir y verrar ventana de retiros
function popUpWithdraw(){
    const withdrawWindow = document.getElementById('withdraw_window');

    withdrawWindow.classList.remove('hide_error')
    withdrawWindow.classList.add('operation_window')

    operationsMenuWindow.classList.remove('operation_menu')
    operationsMenuWindow.classList.add('hide_error')
}
function popUpMenuFromWithdraw(){
    const withdrawWindow = document.getElementById('withdraw_window');

    withdrawWindow.classList.add('hide_error')
    withdrawWindow.classList.remove('operation_window')

    operationsMenuWindow.classList.add('operation_menu')
    operationsMenuWindow.classList.remove('hide_error')
}

/*----------------- Salir ----------------*/
const exitFromMenu = document.getElementById('exit_from_menu');
const bankInterface = document.getElementById('bank_interface');
exitFromMenu.addEventListener('click', (e) =>{
    e.preventDefault()

    bankInterface.classList.remove('bank_interface_style')
    bankInterface.classList.add('hide_error')

    userForm.classList.remove('hide_error')
    userForm.classList.add('form_input')

    alert('Gracias por su visita ' + userInput + ', vuelva pronto.')


})