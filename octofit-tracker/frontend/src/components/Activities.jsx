import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Recent movement</span><h1>Activity log</h1><p>Every session counts. Keep the momentum visible.</p></div>{error ? <p className="status error">{error}</p> : <div className="table-wrap"><table><thead><tr><th>Student</th><th>Activity</th><th>Duration</th><th>Points</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || `${activity.username}-${activity.recordedAt}`}><td>{activity.username}</td><td>{activity.type}</td><td>{activity.durationMinutes} min</td><td className="points">+{activity.points}</td></tr>)}</tbody></table>{!activities.length && <p className="status">No activities found.</p>}</div>}</section>
  )
}

export default Activities