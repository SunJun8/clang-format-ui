import React from 'react'

interface HeaderProps {
  onDownload: () => void
  onCopy: () => void
}

const Header: React.FC<HeaderProps> = ({ onDownload, onCopy }) => {
  return (
    <header className="bg-base-100 border-b border-base-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Clang</span>-Format Visualizer
        </h1>
        <div className="flex space-x-2">
          <button 
            className="btn btn-primary btn-sm"
            onClick={onCopy}
          >
            Copy Config
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onDownload}
          >
            Download .clang-format
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header