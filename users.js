function loginUser() {
    var resultElement = document.getElementById('userInfo');
    var username = document.getElementById('userID').value;
    var password = document.getElementById('psw').value;
    resultElement.innerHTML = '';

    axios.post('http://localhost:3000/users/login', {
        username: username,
        password: password
    })
    .then(response => {
        resultElement.innerHTML = loginSuccessful(response);
    })
    .catch(error => {
        resultElement.innerHTML = loginFailed(error);
    });
}

function loginSuccessful(response){
    res = Object.assign({}, response.data)

    if (res.status === 'ok') {
        document.cookie = "token=" + res.token
        document.cookie = "expiresIn=" + res.expiresIn
        alert('You are logged in')
        window.location.replace("home.html");
    } else {
        alert(res.message)
        location.reload()
    }
}

function loginFailed(error) {
    console.error(error)
    alert('Something went wrong.')
    window.location.replace('index.html')
}

