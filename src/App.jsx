import { useState } from 'react'
import './App.css'
import VideoTech from './components/VideoTech'
import { WebandMobile } from './components/Web_mobile'

function App() {
  const [videoChecked, setVideoChecked] = useState(true)
  const [webChecked, setWebChecked] = useState(false)

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Select Technology Stack
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Choose the technology stacks you want to configure
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                videoChecked 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-md' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
              }`}>
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={videoChecked}
                    onChange={() => setVideoChecked(!videoChecked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    videoChecked
                      ? 'border-blue-500 bg-blue-500 dark:bg-blue-400 dark:border-blue-400'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 group-hover:border-blue-400'
                  }`}>
                    {videoChecked && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <span className={`text-lg font-semibold block transition-colors ${
                    videoChecked
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}>
                    Video Tech
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                    Video technology solutions and streaming
                  </span>
                </div>
                {videoChecked && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-400 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </label>

              <label className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                webChecked 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-md' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
              }`}>
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={webChecked}
                    onChange={() => setWebChecked(!webChecked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    webChecked
                      ? 'border-blue-500 bg-blue-500 dark:bg-blue-400 dark:border-blue-400'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 group-hover:border-blue-400'
                  }`}>
                    {webChecked && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <span className={`text-lg font-semibold block transition-colors ${
                    webChecked
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}>
                    Web & Mobile
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                    Web and mobile application development
                  </span>
                </div>
                {webChecked && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-400 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Divider */}
        {(videoChecked || webChecked) && (
          <hr className="border-gray-300 dark:border-gray-600 my-6" />
        )}

        {/* Render components based on checkbox */}
        <div className="space-y-6">
          {videoChecked && (
            <div className="w-full">
              <VideoTech />
            </div>
          )}
          {webChecked && (
            <div className="w-full">
              <WebandMobile />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
