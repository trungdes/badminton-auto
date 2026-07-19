import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"   

function Home(){
    const [players, setPlayers] = useState([])
    const [matchHistory, setMatchHistory] = useState([])
    const [inputName, setInputName] = useState('')
    const [selectLevel, setSelectLevel] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const authFetch = (url, options = {}) => {
        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...(options.headers || {})
            }
        }).then(res => res.json())
    }

    const loadNextRound = () => {
        authFetch('/api/match-history')
        .then(data => {
            setPlayers(data.players)
            setMatchHistory(data.matchHistory)
        })
    }

    const handleReset = () => {
        authFetch('/api/reset')
        .then(data => {
            setPlayers(data.players)
            setMatchHistory(data.matchHistory)
        })
    }

    const handleRandom = () => {
        authFetch('/api/players/random', {method: 'POST'})
        .then(data => {
            setPlayers(data.players)
        })
    }

    const handleAddPlayer = (e) => {
        e.preventDefault()
        if(!inputName || !selectLevel){
            return
        }
        authFetch('/api/players', 
            {method: 'POST',
            body: JSON.stringify({
                name: inputName, 
                level: Number(selectLevel)
            })
        })
        .then (data => {
            setPlayers(data.players)
            setInputName('')
            setSelectLevel('')
        })
    }

    const handleDelete = (name) => {
        authFetch(`/api/players/${encodeURIComponent(name)}`,{
            method: 'DELETE'
        })
        .then(data => {
            setPlayers(data.players)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token){
            navigate('/login')
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="header">
            <h1>Home page</h1>
            <button className="btn-action" onClick={loadNextRound}>Xếp Hiệp Tiếp Theo</button>
            <button className="btn-action" onClick={handleReset}>Reset</button>
            <button className="btn-action" onClick={handleRandom}>Tạo Ngẫu Nhiên</button>
            <button className="btn-action" onClick={handleLogout}>Logout</button>
            <form onSubmit={handleAddPlayer}>
                <input
                    type="text"
                    value={inputName}
                    onChange={e => setInputName(e.target.value)}
                    placeholder="Tên người chơi"
                />
                <select value={selectLevel} onChange={e => setSelectLevel(e.target.value)}>
                    <option value="" disabled>Chọn level</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                </select>
                <button type="submit" className="btn-action">Thêm</button>
            </form>
            <ul id="playerList">
                {players.map(p => (
                <li key={p._id} className="player-item">
                    <span>{p.name}</span>
                    <div className="player-badges">
                    <span className="level-badge">Lv {p.level}</span>
                    <span className="level-badge">Set {p.playedCount}</span>
                    <button className="btn-remove" onClick={() => handleDelete(p.name)}>✕</button>
                    </div>
                </li>
                ))}
            </ul>
            
            {matchHistory.map((round, roundIndex) => (
                <div key={roundIndex} className="round">
                    <h3>Hiệp {round.set}</h3>          {/* dùng luôn round.set từ backend */}

                    {/* Sân 1 */}
                    <div className="court">
                        <h4>Sân 1</h4>
                        <div className="team">
                        {round.court_1.team_A.map(p => (
                            <span key={p._id}>{p.name} (Lv{p.level})</span>
                        ))}
                        </div>
                        <span>VS</span>
                        <div className="team">
                        {round.court_1.team_B.map(p => (
                            <span key={p._id}>{p.name} (Lv{p.level})</span>
                        ))}
                        </div>
                    </div>

                    {/* Sân 2 */}
                    <div className="court">
                        <h4>Sân 2</h4>
                        <div className="team">
                        {round.court_2.team_A.map(p => (
                            <span key={p._id}>{p.name} (Lv{p.level})</span>
                        ))}
                        </div>
                        <span>VS</span>
                        <div className="team">
                        {round.court_2.team_B.map(p => (
                            <span key={p._id}>{p.name} (Lv{p.level})</span>
                        ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home