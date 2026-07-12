document.getElementById('submit').addEventListener('click', SubmitEvent)

function SubmitEvent(e){
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => {
        if(data.error){
            alert(data.error)
            return 
        }
        alert('Đăng kí thành công')
        window.location.href = '/login.html'
    })
}