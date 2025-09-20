import React, { useState, useEffect } from 'react'
import Navebar from '../components/navebar'

const Overall = () => {
  const [mealData, setMealData] = useState([])
  const [totalMorning, setTotalMorning] = useState(0)
  const [totalEvening, setTotalEvening] = useState(0)
  const [totalThalis, setTotalThalis] = useState(0)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // Load all meal data from localStorage
  useEffect(() => {
    const loadMealData = () => {
      const allMealData = []
      
      // Get all localStorage keys that match our pattern
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('mealPreferences_')) {
          const data = JSON.parse(localStorage.getItem(key))
          allMealData.push(data)
        }
      }
      
      // Sort by date (newest first)
      allMealData.sort((a, b) => new Date(b.date) - new Date(a.date))
      
      setMealData(allMealData)
      
      // Calculate totals
      const morningCount = allMealData.filter(item => item.morning).length
      const eveningCount = allMealData.filter(item => item.evening).length
      const totalCount = morningCount + eveningCount
      
      setTotalMorning(morningCount)
      setTotalEvening(eveningCount)
      setTotalThalis(totalCount)
    }

    loadMealData()
  }, [])

  // Filter data by date range
  const filteredData = mealData.filter(item => {
    if (!dateRange.start && !dateRange.end) return true
    if (dateRange.start && !dateRange.end) return item.date >= dateRange.start
    if (!dateRange.start && dateRange.end) return item.date <= dateRange.end
    return item.date >= dateRange.start && item.date <= dateRange.end
  })

  // Calculate filtered totals
  const filteredMorning = filteredData.filter(item => item.morning).length
  const filteredEvening = filteredData.filter(item => item.evening).length
  const filteredTotal = filteredMorning + filteredEvening

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Clear all data function
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all meal data? This action cannot be undone.')) {
      // Remove all meal preference keys from localStorage
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('mealPreferences_')) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key))
      
      // Reset state
      setMealData([])
      setTotalMorning(0)
      setTotalEvening(0)
      setTotalThalis(0)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50'>
      <Navebar/>
      
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>
            📊 Overall Statistics
          </h1>
          <p className='text-gray-600 text-lg'>
            Track your complete meal history and statistics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-white text-2xl'>🌅</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Morning Thalis</h3>
              <p className='text-3xl font-bold text-orange-500'>{dateRange.start || dateRange.end ? filteredMorning : totalMorning}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-white text-2xl'>🌆</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Evening Thalis</h3>
              <p className='text-3xl font-bold text-red-500'>{dateRange.start || dateRange.end ? filteredEvening : totalEvening}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-white text-2xl'>🍽️</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Total Thalis</h3>
              <p className='text-3xl font-bold text-green-500'>{dateRange.start || dateRange.end ? filteredTotal : totalThalis}</p>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            <div className='flex flex-col md:flex-row gap-4 items-center'>
              <h3 className='text-lg font-semibold text-gray-800'>Filter by Date:</h3>
              <div className='flex gap-2 items-center'>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                  className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500'
                  placeholder="Start Date"
                />
                <span className='text-gray-500'>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                  className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500'
                  placeholder="End Date"
                />
                <button
                  onClick={() => setDateRange({start: '', end: ''})}
                  className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
                >
                  Clear
                </button>
              </div>
            </div>
            <button
              onClick={clearAllData}
              className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
            >
              🗑️ Clear All Data
            </button>
          </div>
        </div>

        {/* Meal History List */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-100'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-2xl font-bold text-gray-800'>
              📋 Meal History ({filteredData.length} entries)
            </h2>
          </div>
          
          <div className='p-6'>
            {filteredData.length === 0 ? (
              <div className='text-center py-12'>
                <div className='text-6xl mb-4'>🍽️</div>
                <h3 className='text-xl font-semibold text-gray-600 mb-2'>No meal data found</h3>
                <p className='text-gray-500'>Start marking your meals to see them here!</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {filteredData.map((meal, index) => (
                  <div key={index} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                          📅 {formatDate(meal.date)}
                        </h3>
                        <div className='flex gap-4 text-sm text-gray-600'>
                          <span>Added: {new Date(meal.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className='flex gap-4 mt-3 md:mt-0'>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          meal.morning ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <span>🌅</span>
                          <span className='font-medium'>
                            {meal.morning ? 'Morning ✓' : 'Morning ✗'}
                          </span>
                        </div>
                        
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          meal.evening ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <span>🌆</span>
                          <span className='font-medium'>
                            {meal.evening ? 'Evening ✓' : 'Evening ✗'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overall
