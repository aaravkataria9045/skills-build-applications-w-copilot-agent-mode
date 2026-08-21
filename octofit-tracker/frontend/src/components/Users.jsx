import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><span className="eyebrow">Community</span><h1>People moving forward</h1><p>Meet the students building healthy habits together.</p></div>
      {error ? <p className="status error">{error}</p> : <div className="data-grid">{users.map((user) => <article className="data-card" key={user._id || user.username}><span className="avatar">{user.displayName?.charAt(0) || user.username?.charAt(0)}</span><div><h2>{user.displayName || user.username}</h2><p>@{user.username}</p><span className="tag">{user.team || 'Independent'}</span></div></article>)}{!users.length && <p className="status">No users found.</p>}</div>}
    </section>
  )
}

export default Users