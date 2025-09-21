import React, { useState, useEffect } from 'react'

const Foodtick = () => {
  const [morningThali, setMorningThali] = useState(false)
  const [eveningThali, setEveningThali] = useState(false)
  const [isAlreadyMarked, setIsAlreadyMarked] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Initialize with today's date
  useEffect(() => {
    setSelectedDate(getTodayDate())
  }, [])

  // Load data from localStorage when date changes
  useEffect(() => {
    if (selectedDate) {
      const savedData = localStorage.getItem(`mealPreferences_${selectedDate}`)
      
      if (savedData) {
        const { morning, evening } = JSON.parse(savedData)
        setMorningThali(morning)
        setEveningThali(evening)
        setIsAlreadyMarked(true)
      } else {
        // Reset state for new date
        setMorningThali(false)
        setEveningThali(false)
        setIsAlreadyMarked(false)
      }
    }
  }, [selectedDate])

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setShowSuccess(false) // Hide success message when changing date
  }

  // Save preferences to localStorage
  const savePreferences = () => {
    if (isAlreadyMarked) return

    const mealData = {
      morning: morningThali,
      evening: eveningThali,
      date: selectedDate,
      timestamp: new Date().toISOString()
    }

    localStorage.setItem(`mealPreferences_${selectedDate}`, JSON.stringify(mealData))
    setIsAlreadyMarked(true)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center p-4 sm:p-6'>
      {/* Success Message */}
      {showSuccess && (
        <div className='fixed top-20 left-4 right-4 sm:top-4 sm:right-4 sm:left-auto bg-green-500 text-white px-4 py-3 sm:px-6 rounded-lg shadow-lg z-50 animate-bounce text-center sm:text-left'>
          ✅ Preferences saved successfully!
        </div>
      )}

      {/* Header */}
      <div className='mb-6 sm:mb-8 text-center px-4'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2'>
          Thali Selection
        </h1>
        <p className='text-base sm:text-lg text-gray-600'>
          {isAlreadyMarked 
            ? 'Your meal preferences for this date have been saved' 
            : 'Mark your meal preferences for the selected date'
          }
        </p>
      </div>

      {/* Date Picker */}
      <div className='mb-6 sm:mb-8 w-full max-w-sm'>
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100'>
          <label className='block text-sm font-medium text-gray-700 mb-3'>
            📅 Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className='w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-lg font-medium'
          />
          {isAlreadyMarked && (
            <p className='text-sm text-orange-600 mt-2 font-medium text-center'>
              ✅ Already marked for this date
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 w-full max-w-md border border-gray-100 ${isAlreadyMarked ? 'opacity-75' : ''}`}>
        <div className='space-y-6 sm:space-y-8'>
          {/* Morning Thali */}
          <div className='group'>
            <div 
              onClick={() => !isAlreadyMarked && setMorningThali(!morningThali)}
              className={`flex items-center justify-between p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                isAlreadyMarked 
                  ? 'border-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 hover:border-orange-300 cursor-pointer hover:shadow-md active:scale-95 active:bg-orange-50'
              }`}
            >
              <div className='flex items-center space-x-3 sm:space-x-4 flex-1'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-lg sm:text-xl'>🌅</span>
                </div>
                <div className='flex-1'>
                  <p className='text-lg sm:text-xl font-semibold text-gray-800'>Morning Thali</p>
                  <p className='text-sm text-gray-500'>Breakfast meal</p>
                </div>
              </div>
              <div className='ml-4'>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                  morningThali 
                    ? 'bg-orange-500 border-orange-500' 
                    : 'border-gray-300 bg-white'
                } ${isAlreadyMarked ? 'opacity-50' : ''}`}>
                  {morningThali && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Evening Thali */}
          <div className='group'>
            <div 
              onClick={() => !isAlreadyMarked && setEveningThali(!eveningThali)}
              className={`flex items-center justify-between p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                isAlreadyMarked 
                  ? 'border-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 hover:border-orange-300 cursor-pointer hover:shadow-md active:scale-95 active:bg-orange-50'
              }`}
            >
              <div className='flex items-center space-x-3 sm:space-x-4 flex-1'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-lg sm:text-xl'>🌆</span>
                </div>
                <div className='flex-1'>
                  <p className='text-lg sm:text-xl font-semibold text-gray-800'>Evening Thali</p>
                  <p className='text-sm text-gray-500'>Dinner meal</p>
                </div>
              </div>
              <div className='ml-4'>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                  eveningThali 
                    ? 'bg-orange-500 border-orange-500' 
                    : 'border-gray-300 bg-white'
                } ${isAlreadyMarked ? 'opacity-50' : ''}`}>
                  {eveningThali && (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='mt-8 sm:mt-10'>
          {isAlreadyMarked ? (
            <div className='w-full bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl text-center'>
              ✅ Already Marked for Today
            </div>
          ) : (
            <button 
              onClick={savePreferences}
              className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-base sm:text-lg'
            >
              Save Preferences
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='mt-6 sm:mt-8 text-center text-gray-500 text-sm px-4'>
        <p>
          {isAlreadyMarked 
            ? 'You can change your preferences tomorrow' 
            : 'Select your meals for today and save your preferences'
          }
        </p>
      </div>
    </div>
  )
}

export default Foodtick
