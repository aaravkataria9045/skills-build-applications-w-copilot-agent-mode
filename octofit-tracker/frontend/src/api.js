const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceName = configuredCodespaceName && configuredCodespaceName !== 'undefined'
  ? configuredCodespaceName
  : ''

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export async function fetchCollection(component) {
  const response = await fetch(`${API_BASE_URL}/${component}/`)
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  return normalizeCollection(await response.json())
}