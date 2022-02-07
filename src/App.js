import React from 'react'
import ThreeCanva from './components/ThreeCanva'
import './App.css'
import First from './components/First'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Second from './components/Second'
import Third from './components/Third'

const App = () => {

  return (
    <>
    <div className='scrollWrap'>
      <First/>
       <Second/>
       <Third/>
       </div>
      <ThreeCanva/>
      </>
  )
}

export default App



