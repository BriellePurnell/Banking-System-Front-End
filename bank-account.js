const config = {
    headers: { 'x-access-token' : getToken() }       
}

function getAccountOptions() {
    var resultElement = document.getElementById('depositOptions')
    resultElement.innerHTML = ''

    axios.get('http://localhost:3000/home', config)
        .then(response => 
        {
            resultElement.innerHTML = generateAccountList(response)
        })
        .catch(error =>
        {
            console.log(error)
            resultElement.innerHTML = generateErrorHTMLOutput(error)
        })
}

function generateAccountList(response) {
    var res = Object.assign({}, response.data)

    // console.log(res)
    
    if (res.status === 'ok') {
        var result = ''
        var format = ''
        var type = ''

        for (i=0; i<res.message.length; i++) {

            if (res.message[i].account_type === 'c') {
                type = 'Checking'
            } else {
                type = 'Savings'
            }
            
            format = `<option value=${res.message[i].account_number}>
                ${type} - ${res.message[i].account_number}
                </option>`
            
            result += format
        }

        return result
    } else {
        alert('Error: ' + res.message)
        window.location.replace('accounts.html')
    }
}

function generateErrorHTMLOutput(error) {
    alert('An error occurred:\n' + JSON.stringify(error))
    // window.location.replace('index.html')
}

function getToken()
{
    let s = ''
    var list = document.cookie.split(';')

    for (var i=0; i<list.length; i++)
    {
        s = list[i]
        if (s.includes('token=')) {
            var index = s.search('token=') + 6
            return s.substring(index)
        }
    }
}