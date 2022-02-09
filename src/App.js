import React from 'react'
import ThreeCanva from './components/ThreeCanva'
import './App.css'
import First from './components/First'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Second from './components/Second'
import Third from './components/Third'
import Four from './components/Four'
import Five from './components/Five'
import Six from './components/Six'

const App = () => {

  return (
    <>
    <div className='scrollWrap'>
      <First/>
       <Second/>
       <Third/>
       <Four/>
       <Five/>
       <Six/>
       </div>
      <ThreeCanva/>
      </>
  )
}

export default App



