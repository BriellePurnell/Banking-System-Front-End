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

function deleteToken() {
    console.log('deleting token')
    console.log('deleting experation time')
}

module.exports = {
    getToken,
    deleteToken
}