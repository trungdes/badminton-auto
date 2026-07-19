import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(data => {
            if(!data.token){
                alert(data.error || 'login failed')
                return
            }
            login(data.token)
            navigate('/')
        })
    }
    return (
            <div className="login-page">
                <div className="login-card">
                    <h1 className="login-logo">🏸</h1>
                    <h2 className="login-title">Hệ Thống Sắp Xếp Sân Cầu Lông</h2>
                    <p className="login-subtitle">Đăng nhập để quản lý người chơi của bạn</p>

                    <form className="login-form" onSubmit={handleSubmit}>
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

                        <button id="submit" type="submit" className="btn-action btn-login">Đăng Nhập</button>
                        <p className="login-subtitle">chưa có tài khoản ? <Link to="/register">Đăng kí</Link></p>
                    </form>
                </div>
            </div>
        )
}
export default Login