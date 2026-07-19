import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Register(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                alert(data.error)
                return
            }
            alert('Đăng kí thành công')
            navigate('/login')
        })
    }
    return (
        <div className="login-page">
                <div className="login-card">
                    <h1 className="login-logo">🏸</h1>
                    <h2 className="login-title">Hệ Thống Sắp Xếp Sân Cầu Lông</h2>
                    <p className="login-subtitle">Đăng nhập để quản lý người chơi của bạn</p>

                    <form className="login-form" onSubmit={handleRegister}>
                        <div className="login-field">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Nhập username"
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Nhập password"
                                required/>
                        </div>

                        <button id="submit" type="submit" className="btn-action btn-login">Đăng Kí</button>
                        <p className="login-subtitle">Đã có tài khoản ? <Link to="/login">Đăng nhập</Link></p>
                    </form>
                </div>
            </div>
    )
}
export default Register