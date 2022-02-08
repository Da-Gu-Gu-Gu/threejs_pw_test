import React from 'react'
import ThreeCanva from './components/ThreeCanva'
import './App.css'
import First from './components/First'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Second from './components/Second'
import Third from './components/Third'
import Four from './components/Four'
import Five from './components/Five'

const App = () => {

  return (
    <>
    <div className='scrollWrap'>
      <First/>
       <Second/>
       <Third/>
       <Four/>
       <Five/>
       </div>
      <ThreeCanva/>
      </>
  )
}

export default App



