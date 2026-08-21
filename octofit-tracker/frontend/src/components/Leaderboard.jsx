import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Friendly competition</span><h1>Leaderboard</h1><p>Celebrate consistency, effort, and the next personal best.</p></div>{error ? <p className="status error">{error}</p> : <div className="leaderboard">{entries.map((entry, index) => <article className={`rank-row rank-${entry.rank || index + 1}`} key={entry._id || entry.username}><strong>#{entry.rank || index + 1}</strong><span className="avatar">{entry.username?.charAt(0)}</span><h2>{entry.username}</h2><span className="leader-points">{entry.points} pts</span></article>)}{!entries.length && <p className="status">No leaderboard entries found.</p>}</div>}</section>
  )
}

export default Leaderboard