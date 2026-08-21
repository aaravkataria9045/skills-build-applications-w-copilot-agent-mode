import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to="/users"><img src="/octofitapp-small.png" alt="" /><span>OctoFit<span>Tracker</span></span></NavLink><nav aria-label="Primary navigation"><NavLink to="/users">People</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/activities">Activity</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/workouts">Workouts</NavLink></nav></header>
      <main><Routes><Route path="/" element={<Users />} /><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      <footer className="footer">Move together. Feel stronger.</footer>
    </div>
  )
}

export default App
