import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navebar = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <div className='text-xl md:text-2xl font-bold flex items-center'>
            <span className='mr-2'>🍽️</span>
            <span className='hidden sm:inline'>MessTracker</span>
            <span className='sm:hidden'>Mess</span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className='hidden md:flex space-x-4 lg:space-x-8'>
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-white text-orange-500 shadow-md' 
                  : 'hover:bg-orange-400 hover:shadow-md'
              }`}
            >
              <span className='mr-2'>🏠</span>
              Home
            </Link>
            <Link 
              to="/overall" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                location.pathname === '/overall' 
                  ? 'bg-white text-orange-500 shadow-md' 
                  : 'hover:bg-orange-400 hover:shadow-md'
              }`}
            >
              <span className='mr-2'>📊</span>
              Overall
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='p-2 rounded-lg hover:bg-orange-400 transition-colors duration-200'
              aria-label="Toggle menu"
            >
              <svg 
                className='w-6 h-6' 
                fill='none' 
                strokeLinecap='round' 
                strokeLinejoin='round' 
                strokeWidth='2' 
                viewBox='0 0 24 24' 
                stroke='currentColor'
              >
                {isMenuOpen ? (
                  <path d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className='md:hidden border-t border-orange-400'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-white text-orange-500 shadow-md' 
                    : 'hover:bg-orange-400'
                }`}
              >
                <span className='mr-3'>🏠</span>
                Home
              </Link>
              <Link 
                to="/overall" 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === '/overall' 
                    ? 'bg-white text-orange-500 shadow-md' 
                    : 'hover:bg-orange-400'
                }`}
              >
                <span className='mr-3'>📊</span>
                Overall
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navebar
