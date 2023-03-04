import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://adagioinfotech.com" target="_blank" rel="noopener noreferrer">
          Adagio CRM
        </a>
        <span className="ms-1">&copy; 2023</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://adagioinfotech.com" target="_blank" rel="noopener noreferrer">
          Adagio Infotech
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
