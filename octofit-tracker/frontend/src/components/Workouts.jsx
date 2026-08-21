import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsApiUrl = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(workoutsApiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load workouts.')
        return response.json()
      })
      .then((payload) => setWorkouts(normalizeCollection(payload)))
      .catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Suggested for you</span><h1>Workouts</h1><p>Pick a session that fits your energy today.</p></div>{error ? <p className="status error">{error}</p> : <div className="data-grid workout-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id || workout.title}><span className="tag">{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><span aria-hidden="true">→</span></footer></article>)}{!workouts.length && <p className="status">No workouts found.</p>}</div>}</section>
  )
}

export default Workouts