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

  // Delete specific day record function
  const deleteRecord = (dateToDelete) => {
    if (window.confirm(`Are you sure you want to delete the meal record for ${formatDate(dateToDelete)}?`)) {
      // Remove from localStorage
      localStorage.removeItem(`mealPreferences_${dateToDelete}`)
      
      // Update state by filtering out the deleted record
      const updatedMealData = mealData.filter(meal => meal.date !== dateToDelete)
      setMealData(updatedMealData)
      
      // Recalculate totals
      const morningCount = updatedMealData.filter(item => item.morning).length
      const eveningCount = updatedMealData.filter(item => item.evening).length
      const totalCount = morningCount + eveningCount
      
      setTotalMorning(morningCount)
      setTotalEvening(eveningCount)
      setTotalThalis(totalCount)
    }
  }

  // Enable editing for a specific day record
  const enableEdit = (dateToEdit) => {
    if (window.confirm(`Are you sure you want to enable editing for ${formatDate(dateToEdit)}? This will allow you to modify this record.`)) {
      // Remove from localStorage to make it editable
      localStorage.removeItem(`mealPreferences_${dateToEdit}`)
      
      // Update state by filtering out the record
      const updatedMealData = mealData.filter(meal => meal.date !== dateToEdit)
      setMealData(updatedMealData)
      
      // Recalculate totals
      const morningCount = updatedMealData.filter(item => item.morning).length
      const eveningCount = updatedMealData.filter(item => item.evening).length
      const totalCount = morningCount + eveningCount
      
      setTotalMorning(morningCount)
      setTotalEvening(eveningCount)
      setTotalThalis(totalCount)
      
      // Optionally redirect to home page with the date (you could add this feature)
      alert(`Record for ${formatDate(dateToEdit)} is now editable. Go to Home page and select this date to modify it.`)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50'>
      <Navebar/>
      
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2'>
            📊 Overall Statistics
          </h1>
          <p className='text-base sm:text-lg text-gray-600 px-4'>
            Track your complete meal history and statistics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100'>
            <div className='text-center'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center'>
                <span className='text-white text-xl sm:text-2xl'>🌅</span>
              </div>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Morning Thalis</h3>
              <p className='text-2xl sm:text-3xl font-bold text-orange-500'>{dateRange.start || dateRange.end ? filteredMorning : totalMorning}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100'>
            <div className='text-center'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center'>
                <span className='text-white text-xl sm:text-2xl'>🌆</span>
              </div>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Evening Thalis</h3>
              <p className='text-2xl sm:text-3xl font-bold text-red-500'>{dateRange.start || dateRange.end ? filteredEvening : totalEvening}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 sm:col-span-2 lg:col-span-1'>
            <div className='text-center'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center'>
                <span className='text-white text-xl sm:text-2xl'>🍽️</span>
              </div>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Total Thalis</h3>
              <p className='text-2xl sm:text-3xl font-bold text-green-500'>{dateRange.start || dateRange.end ? filteredTotal : totalThalis}</p>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100'>
          <div className='space-y-4'>
            {/* Date Filter Section */}
            <div className='space-y-3'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-800 text-center sm:text-left'>Filter by Date:</h3>
              <div className='flex flex-col sm:flex-row gap-3 items-center'>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                  className='w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                  placeholder="Start Date"
                />
                <span className='text-gray-500 text-sm'>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                  className='w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm'
                  placeholder="End Date"
                />
                <button
                  onClick={() => setDateRange({start: '', end: ''})}
                  className='w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm'
                >
                  Clear
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className='pt-3 border-t border-gray-200'>
              <button
                onClick={clearAllData}
                className='w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
              >
                🗑️ Clear All Data
              </button>
            </div>
          </div>
        </div>

        {/* Meal History List */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-100'>
          <div className='p-4 sm:p-6 border-b border-gray-200'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
              📋 Meal History ({filteredData.length} entries)
            </h2>
          </div>
          
          <div className='p-4 sm:p-6'>
            {filteredData.length === 0 ? (
              <div className='text-center py-8 sm:py-12'>
                <div className='text-4xl sm:text-6xl mb-4'>🍽️</div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-600 mb-2'>No meal data found</h3>
                <p className='text-gray-500 text-sm sm:text-base'>Start marking your meals to see them here!</p>
              </div>
            ) : (
              <div className='space-y-3 sm:space-y-4'>
                {filteredData.map((meal, index) => (
                  <div key={index} className='border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow'>
                    <div className='space-y-3'>
                      {/* Date and Time */}
                      <div>
                        <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-1'>
                          📅 {formatDate(meal.date)}
                        </h3>
                        <div className='text-xs sm:text-sm text-gray-600'>
                          <span>Added: {new Date(meal.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {/* Meal Status and Actions */}
                      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                        {/* Meal Status */}
                        <div className='flex gap-2 sm:gap-4 flex-wrap'>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm ${
                            meal.morning ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <span>🌅</span>
                            <span className='font-medium'>
                              {meal.morning ? 'Morning ✓' : 'Morning ✗'}
                            </span>
                          </div>
                          
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm ${
                            meal.evening ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <span>🌆</span>
                            <span className='font-medium'>
                              {meal.evening ? 'Evening ✓' : 'Evening ✗'}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-2 justify-center sm:justify-end'>
                          {/* Edit Button */}
                          <button
                            onClick={() => enableEdit(meal.date)}
                            className='p-2 sm:p-3 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:shadow-md active:scale-95'
                            title={`Enable editing for ${formatDate(meal.date)}`}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 sm:h-5 sm:w-5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                              />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteRecord(meal.date)}
                            className='p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 hover:shadow-md active:scale-95'
                            title={`Delete record for ${formatDate(meal.date)}`}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 sm:h-5 sm:w-5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                              />
                            </svg>
                          </button>
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
