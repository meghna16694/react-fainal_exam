import React from 'react'
import './App.css'
import { AppHeader } from './Components/AppHeader'
import { PageContent } from './Components/PageContent'
import { AppFooter } from './Components/AppFooter'
import { BrowserRouter } from 'react-router-dom'

function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
       <AppHeader/>
       <PageContent/>
       <AppFooter/>
      </BrowserRouter>
     
    
    </div>
  )
}

export default App
