
// var submit = document.getElementById('userID')
// var userInfo = document.getElementById('userInfo')
// console.log('Value of submit: ' + submit)
// console.log('Value of userInfo: ' + userInfo)

// addEventListener('submit', performPostRequest);
function performPostRequest() {
    var resultElement = document.getElementById('userInfo');
    var userName = document.getElementById('userID').value;
    var password = document.getElementById('psw').value;
    resultElement.innerHTML = '';

    console.log('Username: ' + username)
    console.log('Password' + password)

//     axios.post('http://jsonplaceholder.typicode.com/todos', {
//     userId: '1',
//     title: todoTitle,
//     completed: false
//     })
//     .then(function (response) {
//     resultElement.innerHTML = generateSuccessHTMLOutput(response);
//     })
//     .catch(function (error) {
//     resultElement.innerHTML = generateErrorHTMLOutput(error);
//     });
  
//   e.preventDefault();
}