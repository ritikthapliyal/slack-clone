import React from 'react'
import error from '../../images/error.png'
import Css from './Css.css'

function Error({data}) {

    console.log(data)
    return (
        <div className='error'>
            <img src={error}></img>
            <p>{data.message}</p>
            <span>Status Code : {data.status}</span>
        </div>
    )
}

export default Error