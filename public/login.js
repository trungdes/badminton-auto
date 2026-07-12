document.getElementById('submit').addEventListener('click', SubmitEvent)

function SubmitEvent(e) {
    e.preventDefault() // ngan submmit reload page

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => {
        if (!data.token){
            alert(data.error || 'login failed')
            return
        }
        localStorage.setItem('token', data.token) //lưu dữ liệu token trong browser
        window.location.href = '/index.html'
    })
}