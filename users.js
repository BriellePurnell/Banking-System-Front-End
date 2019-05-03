var submit = document.getElementById('userID')
var userInfo = document.getElementById('userInfo')

console.log(submit)
console.log(userInfo)

function performPostRequest() {
    var resultElement = document.getElementById('userInfo');
    var username = document.getElementById('userID').value;
    var password = document.getElementById('psw').value;
    resultElement.innerHTML = '';

    axios.post('http://localhost:3000/users/login', {
    username: username,
        password: password
    })
    .then(response => {
    resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(error => {
    resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}

function performGetRequest() {
    axios.get('http://localhost:3000/users/me', {})
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.error(err)
    })
}

function generateSuccessHTMLOutput(response){
    response = Object.assign({}, response.data)
    console.log(response)
    document.cookie = "token=" + response.token
    document.cookie = "expiresIn=" + response.expiresIn
    var token = getToken(document.cookie)
    alert('You are logged in!\n' + token)
    return JSON.stringify(response)
}

function generateErrorHTMLOutput(error) {
    return JSON.stringify(error.data)
}

function getToken(cookie)
{
    let str = ''
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
