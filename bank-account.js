const config = {
    headers: { 'x-access-token' : getToken() }       
}

function getToken(){
    let s = ''
    var list = document.cookie.split(';')

    for (var i=0; i<list.length; i++) {
        s = list[i]
        if (s.includes('token=')) {
            var index = s.search('token=') + 6
            return s.substring(index)
        }
    }
}

function getAccountOptions(elementId) {
    var resultElement = document.getElementById(elementId)
    resultElement.innerHTML = ''

    axios.get('http://localhost:3000/home', config)
        .then(response => {
            var res = Object.assign({}, response.data)

            if (res.status == 'ok') {
                resultElement.innerHTML = generateAccountList(res)
            }
            else if (res.status == 'bad-token') {
                alert('Not authorized to view this page.')
                window.location.replace('index.html')
            } else {
                alert(res.message)
            }
        })
        .catch(error => {
            console.error(error)
            alert('Something went wrong.')
            window.location.replace('index.html')
        })
}

function generateAccountList(response) {
    var result = '<option selected>Choose...</option>'
    var format = ''
    var type = ''

    for (i=0; i<response.message.length; i++) {

        if (response.message[i].account_type === 'c') {
            type = 'Checking'
        } else {
            type = 'Savings'
        }
        
        format = `<option value=${response.message[i].account_number}>
            ${type} - ${response.message[i].account_number} - 
            $${response.message[i].balance}</option>`
        
        result += format
    }

    return result
}

function openAccount(name, type) {

    axios.post('http://localhost:3000/bank-account/open', {
        name: name,
        type: type
    }, config)
        .then(response =>{
            var res = Object.assign({}, response.data)
            
            if (res.status === 'ok') {
                alert('Successfully opened account')
                location.reload()
            } else {
                alert(res.message)
                location.reload()
            }
        })
        .catch(error =>{
            console.log(error)
            // window.location.replace('index.html')
        })
}

function goToAccount(account_number) {
    window.location.replace(`account.html?num=${account_number}`)
}

function getTransactions() {
    var titleElement = document.getElementById('accountTitle')
    var balanceElement = document.getElementById('accountBalance')
    var transactionElement = document.getElementById('transactionHistory')
    var editAccountElement = document.getElementById('editAccount')

    titleElement.innerHTML = ''
    balanceElement.innerHTML = ''
    transactionElement.innerHTML = ''
    editAccountElement.innerHTML = ''

    var array = window.location.href.split('?')
    var key_value = array[1]
    var account = key_value.split('=')[1]
    
    axios.post('http://localhost:3000/bank-account', { account_number: account }, config)
        .then(response => {
            var res = Object.assign({}, response.data)
            
            if (res.status === 'ok') {
                titleElement.innerHTML = getAccountTitle(res.message[0])
                balanceElement.innerHTML = getAccountBalance(res.message[0])
                transactionElement.innerHTML = getTransactionHistory(res.message)
                editAccountElement.innerHTML = getAccountInfo(res.message[0])
            }
            else if(res.status == 'bad-token') {
                alert('Not authorized to view this page.')
                window.location.replace('index.html')
            }else {
                alert(res.message)
                window.location.replace('home.html')
            }
        })
        .catch(error => {
            console.log(error)
            alert('Something went wrong.')
            window.location.replace('index.html')
        })
}

function deposit() {
    var amount = parseFloat(document.getElementById('depositAmount').value)
    var account = parseInt(document.getElementById('depositOptions').value)

    if (!isNaN(account) && !isNaN(amount)) {
        const data = {
            account_number: account,
            amount: amount,
            description: 'ATM deposit'
        }

        axios.post('http://localhost:3000/bank-account/deposit', data, config)
            .then(response => {
                var res = Object.assign({}, response.data)
                
                if(res.status === 'ok') {
                    alert(res.message)
                    window.location.replace(`home.html`)
                } else {
                    alert(res.message)
                }
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        alert('Invalid account or deposit amount.')
    }
}

function internalTransfer() {
    var source = parseInt(document.getElementById('transferSource').value)
    var destination = parseInt(document.getElementById('transferDestination').value)
    var amount = parseFloat(document.getElementById('transferAmount').value)
    const data = {
        source: source,
        destination: destination,
        amount: amount
    }

    if (!isNaN(source) && !isNaN(destination) && !isNaN(amount) && source != destination) {
        axios.post('http://localhost:3000/bank-account/transfer', data, config)
            .then(response => {
                var res = Object.assign({}, response.data)
                
                if (res.status === 'ok') {
                    alert(res.message)
                    window.location.replace(`home.html`)
                } else {
                    alert(res.message)
                }
            })
            .catch(error => {
                console.error(error)
                alert('Something went wrong.')
                window.location.replace('home.html')
            })
    } else {
        console.log('not ok')
        alert('Invalid input')
    }
}

function getAccountTitle(account) {
    return `<h2 class="font-weight-bold" style="margin-left: 4rem; margin-top: 2rem; 
    display: inline-block">${account.name} - ${account.account_number}</h2>`
}

function getAccountBalance(account) {
    return `<h5 style="width: 18rem; margin-left:4rem; margin-top: 2rem">
    Available Balance: <span style="margin-left:2rem">$${account.balance}</span></h5>`
}

function getAccountInfo(account) {
    const table_head = `
    <thead class="thead-light">
        <tr>
        <th scope="col">Account #</th>
        <th scope="col">Account Type</th>
        <th scope="col">Custom Account Nickname</th>
        </tr>
    </thead>`

    var type = ''

    if (account.account_type === 'c') {
        type = 'Checking'
    } else {
        type = 'Savings'
    }

    var table_body = `
    <tbody>
    <tr>
    <td>${account.account_number}</td>
    <td>${type}</td>
    <td>
        <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" id="newName" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
    </td>
    </tr>
    </tbody>`

    return '<table class="table">' + table_head + table_body + '</table>'
}

function dateFormat(date) {
    var year = date.substring(0, 4)
    var month = date.substring(5, 7)
    var day = date.substring(8, 10)
    return month + '/' + day + '/' + year
}

function getTransactionHistory(message) {
    var result = 
    `<table class="table table-striped">
        <thead>
        <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
        </tr>
        </thead>
        <tbody>`

    var format = ''

    for (i=1; i<message.length; i++) {
        format = 
        `<tr>
        <td>${dateFormat(message[i].date)}</td>
        <td>${message[i].description}</td>
        <td>$${message[i].amount}</td>
        <td>$${message[i].balance}</td>
        </tr>`
    
        result += format
    }

    return result + '</tbody></table>'
}

function freezeAccount() {
    var array = window.location.href.split('?')
    var key_value = array[1]
    var account = key_value.split('=')[1]

    axios.put('http://localhost:3000/bank-account/close', 
        { account_number : account }, config)
        .then(response => {
            var res = Object.assign({}, response.data)
            
            if (res.status === 'ok') {
                alert(res.message)
                window.location.replace('home.html')
            } else {
                alert(res.message)
            }
        })
        .catch(error => {
            console.log(error.stack)
            alert('Unable to close account.')
            window.location.replace('home.html')
        })
}

function editCustomName() {
    var name = document.getElementById('newName').value
    var array = window.location.href.split('?')
    var key_value = array[1]
    var account = key_value.split('=')[1]
    const data = { number: account, name: name}

    axios.put('http://localhost:3000/bank-account/name', data, config)
        .then(response => {
            var res = Object.assign({}, response.data)
            
            if (res.status === 'ok') {
                alert('Bank account name updated.')
                location.reload()
            } else {
                console.log(res.message)
                alert(res.message)
                window.location.replace('home.html')            
            }
        })
        .catch(error =>{
            console.error(error)
            alert('Unable to change account name.')
            window.location.replace('home.html')            
        })
}

function payBill() {
    var description = getRadioVal(document.getElementById('paymentDescription'), 'bill')
    var account = document.getElementById('payOptions').value
    var amount = document.getElementById('payAmount').value

    const data = {
        account_number: account,
        amount: amount,
        description: description
    }

    if (amount > 0) {
        axios.post('http://localhost:3000/bank-account/withdrawal', data, config)
            .then(response => {
                var res = Object.assign({}, response.data)
                
                if (res.status == 'ok') {
                    alert('Payment was successful.')
                    window.location.replace('home.html')
                } else {
                    alert(res.message)
                }
            })
            .catch(error => {
                console.error(error)
                alert('Something went wrong')
                window.location.replace('index.html')
            })
    } else {
        alert('Invalid amount.')
    }
}

// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

// function showTab(n) {
//     // This function will display the specified tab of the form ...
//     var x = document.getElementsByClassName("tab");
//     x[n].style.display = "block";
//     // ... and fix the Previous/Next buttons:
//     if (n == 0) {
//         document.getElementById("prevBtn").style.display = "none";
//     } else {
//         document.getElementById("prevBtn").style.display = "inline";
//     }
//     if (n == (x.length - 1)) {
//         document.getElementById("nextBtn").innerHTML = "Submit";
//     } else {
//         document.getElementById("nextBtn").innerHTML = "Next";
//     }
//     // ... and run a function that displays the correct step indicator:
//     fixStepIndicator(n)
// }

// function nextPrev(n) {
//     // This function will figure out which tab to display
//     var x = document.getElementsByClassName("tab");
//     // Exit the function if any field in the current tab is invalid:
//     if (n == 1 && !validateForm()) return false;
//     // Hide the current tab:
//     x[currentTab].style.display = "none";
//     // Increase or decrease the current tab by 1:
//     currentTab = currentTab + n;
//     // if you have reached the end of the form... :
//     if (currentTab >= x.length) {
//         //...the form gets submitted:
//         document.getElementById("paymentDescription").submit();
//         return false;
//     }
//     // Otherwise, display the correct tab:
//     showTab(currentTab);
// }

// function validateForm() {
//     // This function deals with validation of the form fields
//     var x, y, i, valid = true;
//     x = document.getElementsByClassName("tab");
//     y = x[currentTab].getElementsByTagName("input");
//     // A loop that checks every input field in the current tab:
//     for (i = 0; i < y.length; i++) {
//         // If a field is empty...
//         if (y[i].value == "") {
//             // add an "invalid" class to the field:
//             y[i].className += " invalid";
//             // and set the current valid status to false:
//             valid = false;
//         }
//     }
//     // If the valid status is true, mark the step as finished and valid:
//     if (valid) {
//         document.getElementsByClassName("step")[currentTab].className += " finish";
//     }
//     return valid; // return the valid status
// }

// function fixStepIndicator(n) {
//     // This function removes the "active" class of all steps...
//     var i, x = document.getElementsByClassName("step");
//     for (i = 0; i < x.length; i++) {
//         x[i].className = x[i].className.replace(" active", "");
//     }
//     //... and adds the "active" class to the current step:
//     x[n].className += " active";
// }

// function getRadioVal(form, name) {
//     var val;
//     // get list of radio buttons with specified name
//     var radios = form.elements[name];
    
//     // loop through list of radio buttons
//     for (var i=0, len=radios.length; i<len; i++) {
//         if ( radios[i].checked ) { // radio checked?
//             val = radios[i].value; // if so, hold its value in val
//             break; // and break out of for loop
//         }
//     }   
//     return val; // return value of checked radio or undefined if none checked
// }