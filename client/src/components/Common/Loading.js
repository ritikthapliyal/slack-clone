import React from 'react'
import Css from './Css.css'

function Loading() {
  return (
    <div className='loading-div'>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading