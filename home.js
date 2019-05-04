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
    return JSON.stringify(response.message)
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
