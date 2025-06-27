import Heading from './heading'
import React from 'react'

export default () => (
  <div className="max-w-xl text-center">
    <Heading title="More information" />
    <p className="sm:text-lg leading-loose">
      Visit the{' '}
      <a
        className="underline font-medium text-purple-400 hover:text-purple-600 transition-colors duration-300"
        href="https://github.com/luukdv/hamburger-react"
        target="_blank"
        rel="noopener"
      >
        GitHub repository
      </a>{' '}
      for additional information about usage and the motivation behind this
      package.
    </p>
  </div>
)
