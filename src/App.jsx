import { useState } from 'react'
import './App.css'
import VideoTech from './components/VideoTech'
import { WebandMobile } from './components/Web_mobile'

function App() {
  const [videoChecked, setVideoChecked] = useState(false)
  const [webChecked, setWebChecked] = useState(false)

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Select Technology Stack
          </h1>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={videoChecked}
                onChange={() => setVideoChecked(!videoChecked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all"
              />
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Video Tech
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={webChecked}
                onChange={() => setWebChecked(!webChecked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all"
              />
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Web & Mobile
              </span>
            </label>
          </div>
        </div>

        {/* Divider */}
        {(videoChecked || webChecked) && (
          <hr className="border-gray-300 dark:border-gray-600 my-6" />
        )}

        {/* Render components based on checkbox */}
        <div className="space-y-6">
          {videoChecked && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <VideoTech />
            </div>
          )}
          {webChecked && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <WebandMobile />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
