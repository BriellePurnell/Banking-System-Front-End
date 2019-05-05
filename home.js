function getAccounts() {
    var resultElement = document.getElementById('allAccounts');
    resultElement.innerHTML = ''

    const config = {
        headers: {'x-access-token': getToken()}    
    }

    axios.get('http://localhost:3000/home', config)
    .then(response => {
        resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(error => {
        console.log(error)
        resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

function generateSuccessHTMLOutput(response){
    response = Object.assign({}, response.data)
    console.log(response)
    var account_type = ''

    var result = ''
    var format = ''
    
    for(i=0; i<response.message.length; i++){
        if(response.message[i].account_type === 'c'){
            account_type = 'Checking'
        } else {
            account_type = 'Savings'
        }
        
        format=`<div class="card" style="width: 18rem; margin-left:4rem; margin-top: 2rem; display: inline-block">
        <div class="card-body">
            <h5 class="card-title">${account_type} <span style="float: right">$${response.message[i].balance}</span></h5>
            <p class="card-text">Account number ${response.message[i].account_number}</p>
            <a href="checking.html" class="btn btn-primary">Go to ${account_type} Account</a>
        </div>
        </div>`

        result+=format
    }
    return result
}

function generateErrorHTMLOutput(error) {
    alert('An error occurred:\n' + JSON.stringify(error))
    window.location.replace('index.html')
}

function getToken(cookie)
{
    let str = ''
    var cookie = document.cookie
    var cookiearray = cookie.split(';')

    for (var i=0; i<cookiearray.length; i++)
    {
        str = cookiearray[i]
        if (str.includes('token=')) {
            var index = str.search('token=') + 6
            return str.substring(index)
        }
    }
}
