import React, { useState } from 'react'
import { MetroSpinner } from 'react-spinners-kit'
import './App.css'
import ThreeCanva from './components/ThreeCanva'
import First from './components/First'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Second from './components/Second'
import Third from './components/Third'
import Four from './components/Four'
import Five from './components/Five'
import Six from './components/Six'


const App = () => {

  const [loading, setLoading] = useState(true)

  window.addEventListener('load',()=>{
    setLoading(false)
  })

  return (
    <>
      {loading ?
        (
          <div className='loading'>
            <MetroSpinner size={50}   color="#736fbd"  loading={loading} />
          </div>
        )
        :
        (
          <>
            <div className='scrollWrap'>
              <First />
              <Second />
              <Third />
              <Four />
              <Five />
              <Six />
            </div>
            <ThreeCanva />
          </>
        )
      }
    </>
  )
}

export default App



