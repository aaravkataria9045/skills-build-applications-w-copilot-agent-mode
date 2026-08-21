import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsApiUrl = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(teamsApiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load teams.')
        return response.json()
      })
      .then((payload) => setTeams(normalizeCollection(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Find your people</span><h1>Teams</h1><p>Small groups, shared goals, better follow-through.</p></div>{error ? <p className="status error">{error}</p> : <div className="data-grid">{teams.map((team) => <article className="data-card team-card" key={team._id || team.name}><div><span className="team-mark" aria-hidden="true">✦</span><h2>{team.name}</h2><p>{team.description}</p></div><strong>{team.members?.length || 0}<small> members</small></strong></article>)}{!teams.length && <p className="status">No teams found.</p>}</div>}</section>
  )
}

export default Teams