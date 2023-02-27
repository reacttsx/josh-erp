import React from 'react'

const Spinner = () => {
  return (
    <div className="loader-wrp">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
