'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                  AI-Powered SEO Articles
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Generate high-quality, SEO-optimized articles with just a title. Save time and boost your content strategy.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors">
                      Get Started
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button className="px-6 py-3 rounded-md border border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/generate">
                    <button className="px-6 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors">
                      Generate Article
                    </button>
                  </Link>
                </SignedIn>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card p-6 rounded-lg shadow-xl">
                <div className="bg-white rounded-md p-4 mb-4">
                  <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-10 w-32 bg-primary-500 rounded-md"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our AI-powered platform helps you create SEO-optimized content in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-700">
                Generate complete articles in seconds, not hours. Save time and focus on what matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">SEO Optimized</h3>
              <p className="text-gray-700">
                Every article is crafted with SEO best practices in mind, helping you rank higher in search results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-700">
                Tailor the content to your specific needs with easy editing and formatting options.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your content strategy?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join thousands of content creators who are saving time and creating better content with Articleoux.
            </p>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-8 py-4 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors text-lg">
                  Get Started for Free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/generate">
                <button className="px-8 py-4 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors text-lg">
                  Generate Article
                </button>
              </Link>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 