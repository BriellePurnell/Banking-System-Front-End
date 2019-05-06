const config = {
    headers: { 'x-access-token' : getToken() }       
}

function getToken()
{
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

function getAccountOptions() {
    var resultElement = document.getElementById('depositOptions')
    resultElement.innerHTML = ''

    axios.get('http://localhost:3000/home', config)
        .then(response => {
            resultElement.innerHTML = generateAccountList(response)
        })
        .catch(error => {
            console.log(error)
            resultElement.innerHTML = generateErrorHTMLOutput(error)
        })
}

function generateAccountList(response) {
    var res = Object.assign({}, response.data)
    
    if (res.status === 'ok') {
        var result = '<option selected>Choose...</option>'
        var format = ''
        var type = ''

        for (i=0; i<res.message.length; i++) {

            if (res.message[i].account_type === 'c') {
                type = 'Checking'
            } else {
                type = 'Savings'
            }
            
            format = `<option value=${res.message[i].account_number}>
                ${type} - ${res.message[i].account_number} - 
                $${res.message[i].balance}</option>`
            
            result += format
        }

        return result
    } else {
        alert('Error: ' + res.message)
        window.location.replace('home.html')
    }
}

function generateErrorHTMLOutput(error) {
    alert('An error occurred:\n' + JSON.stringify(error))
    // window.location.replace('index.html')
}


function openAccount(type) {

    axios.post('http://localhost:3000/bank-account/open', {account_type: type}, config)
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
    var array = window.location.href.split('?')
    var key_value = array[1]
    var account = key_value.split('=')[1]
    
    axios.post('http://localhost:3000/bank-account', { account_number: account }, config)
        .then(response => {
            var res = Object.assign({}, response.data)
            console.log(res)
        })
        .catch(error => {
            console.log(error)
            // window.location.replace('index.html')
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
        console.log(data)
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

function getSourceOptions() {
    var resultElement = document.getElementById('transferSource')
    resultElement.innerHTML = ''

    axios.get('http://localhost:3000/home', config)
        .then(response => {
            resultElement.innerHTML = generateAccountList(response)
        })
        .catch(error => {
            console.log(error)
            resultElement.innerHTML = generateErrorHTMLOutput(error)
        })
}

function getDestinationOptions() {
    var resultElement = document.getElementById('transferDestination')
    resultElement.innerHTML = ''

    axios.get('http://localhost:3000/home', config)
        .then(response => {
            resultElement.innerHTML = generateAccountList(response)
        })
        .catch(error => {
            console.log(error)
            resultElement.innerHTML = generateErrorHTMLOutput(error)
        })
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
                }
                console.log(res)
            })
    } else {
        console.log('not ok')
    }
}