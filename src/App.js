import React from 'react'
import ThreeCanva from './components/ThreeCanva'
import './App.css'
import First from './components/First'
import Second from './components/Second'
import Third from './components/Third'
import 'locomotive-scroll/dist/locomotive-scroll.css'

const App = () => {

  return (
    <div>
      <div className="scrollWrap" style={{border:'1px solid blue'}}>
      <First/>
      <Second/>
      <Third/>
      </div>
      <ThreeCanva/>
    </div>
  )
}

export default App



