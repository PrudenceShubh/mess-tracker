import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navebar = () => {
  const location = useLocation()

  return (
    <div className='bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <div className='text-2xl font-bold'>
            🍽️ MessTracker
          </div>
          
          {/* Navigation Links */}
          <div className='flex space-x-8'>
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-white text-orange-500 shadow-md' 
                  : 'hover:bg-orange-400 hover:shadow-md'
              }`}
            >
              🏠 Home
            </Link>
            <Link 
              to="/overall" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                location.pathname === '/overall' 
                  ? 'bg-white text-orange-500 shadow-md' 
                  : 'hover:bg-orange-400 hover:shadow-md'
              }`}
            >
              📊 Overall
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navebar
