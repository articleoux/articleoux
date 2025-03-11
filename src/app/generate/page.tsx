'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

export default function GenerateArticle() {
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [customKeywords, setCustomKeywords] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [article, setArticle] = useState('')
  const [error, setError] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [generationStep, setGenerationStep] = useState('idle') // idle, keywords, article, complete
  const [isShortArticle, setIsShortArticle] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Please enter a title for your article')
      return
    }

    setIsGenerating(true)
    setError('')
    setSuccessMessage('')
    setKeywords('')
    setArticle('')
    setGenerationStep('keywords')
    setIsShortArticle(true)
    
    try {
      console.log('Generating article with title:', title);
      console.log('Location:', city || 'Not specified', country || 'Not specified');
      console.log('Custom keywords:', customKeywords || 'Not provided');
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          title,
          city: city || undefined,
          country: country || undefined,
          customKeywords: customKeywords || undefined
        })
      })

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned non-JSON response: ${await response.text()}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate article');
      }
      
      console.log('Article generated successfully');
      setKeywords(data.keywords)
      setArticle(data.article)
      setSuccessMessage('Article generated successfully! (Shorter version to avoid timeouts)')
      setGenerationStep('complete')
    } catch (err: any) {
      console.error('Error generating article:', err);
      setError(`Error: ${err.message || 'An error occurred while generating the article'}`)
      setGenerationStep('idle')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!article) {
      setError('No article to download')
      return
    }

    setIsDownloading(true)
    setError('')
    setSuccessMessage('')
    
    try {
      console.log('Downloading article...');
      
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          title, 
          article 
        })
      })

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned non-JSON response: ${await response.text()}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to download article');
      }
      
      console.log('Download prepared:', data);
      
      // Create a download link
      const downloadUrl = `/api/download?filename=${data.filename}`
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = data.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      setSuccessMessage('Article downloaded successfully!')
    } catch (err: any) {
      console.error('Error downloading article:', err);
      setError(`Error: ${err.message || 'An error occurred while downloading the article'}`)
    } finally {
      setIsDownloading(false)
    }
  }

  const renderGenerationStatus = () => {
    if (generationStep === 'idle' || !isGenerating) return null;
    
    return (
      <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md">
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>
            {generationStep === 'keywords' && 'Generating keywords...'}
            {generationStep === 'article' && 'Generating article content...'}
            {generationStep === 'complete' && 'Finalizing article...'}
          </span>
        </div>
        <p className="mt-2 text-sm">This may take a minute or two. Please be patient.</p>
      </div>
    );
  };

  return (
    <>
      <SignedIn>
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                Generate SEO Article
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Enter a title and our AI will create a high-quality, SEO-optimized article for you
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-lg shadow-xl mb-8"
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Article Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., The Ultimate Guide to SEO in 2023"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                      City (Optional)
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., New York"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                      Country (Optional)
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g., USA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="customKeywords" className="block text-gray-700 font-medium mb-2">
                    Custom Keywords (Optional)
                  </label>
                  <textarea
                    id="customKeywords"
                    value={customKeywords}
                    onChange={(e) => setCustomKeywords(e.target.value)}
                    placeholder="Enter comma-separated keywords (e.g., SEO, digital marketing, content strategy)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                  <p className="mt-1 text-sm text-gray-500">Leave blank to auto-generate keywords</p>
                </div>

                {renderGenerationStatus()}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
                
                {successMessage && !error && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors ${
                    isGenerating ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Article...
                    </span>
                  ) : (
                    'Generate Article'
                  )}
                </button>
              </form>
            </motion.div>

            {keywords && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-lg shadow-xl mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">Generated Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {keywords.split(',').map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {article && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-lg shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Generated Article</h2>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors ${
                      isDownloading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isDownloading ? 'Downloading...' : 'Download HTML'}
                  </button>
                </div>
                <div 
                  className="prose prose-lg max-w-none bg-white p-6 rounded-md"
                  dangerouslySetInnerHTML={{ __html: article }}
                />
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="text-blue-700">
                    <strong>Note:</strong> This is a shorter version of the article to avoid timeouts. 
                    The article is approximately {article.split(' ').length} words.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
} 