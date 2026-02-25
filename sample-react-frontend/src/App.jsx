import { useState, useEffect } from 'react'
import axios from 'axios'
import ToggleSwitch from './components/ToggleSwitch'
import DataTable from './components/DataTable'
import './index.css'

function App() {
  const [activeKeyword, setActiveKeyword] = useState('Dailytracker')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // We fetch the data from our custom Node.js endpoint
        // Example: http://localhost:3000/api/data/Dailytracker
        const response = await axios.get(`http://localhost:3000/api/data/${activeKeyword}`)

        if (response.data.success) {
          setData(response.data.data)
        } else {
          setError(response.data.message || 'Failed to fetch data')
          setData([])
        }
      } catch (err) {
        console.error('API Error:', err)
        setError(err.response?.data?.message || 'Error connecting to the server')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeKeyword])

  return (
    <div className="container">
      <h1 className="title">IDB Sale Master</h1>

      <div className="panel" style={{ padding: '0.5rem', marginBottom: '1rem' }}>
        <ToggleSwitch
          activeKeyword={activeKeyword}
          setActiveKeyword={setActiveKeyword}
        />
      </div>

      <DataTable
        data={data}
        loading={loading}
        error={error}
        keyword={activeKeyword}
      />
    </div>
  )
}

export default App
