import Css from './Css.css'
import React, { useEffect, useState, Fragment } from 'react'
import slack from '../../images/slack.png'
import axios from 'axios'
import Error from '../Common/Error'
import Loading from '../Common/Loading'

function Workspace() {

    const [userData,setUserData] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [isError,setIsError] = useState(false)
    const [errorData,setErrorData] = useState('')



    async function fetchUserData(){ 
        try{
            const {data} = await axios.get('http://localhost:5000/user',{withCredentials: true})
            console.log(data)
            setUserData(data)
            setIsLoading(false)
        }
        catch(err){
            console.log(err?.response?.data)
            setIsLoading(false)
            setIsError(true)
            setErrorData(err?.response?.data)
        }
    }


    useEffect(()=>{
        fetchUserData()
    },[])

    return (
        <Fragment>

            {
                isLoading && <Loading/>
            }

            {
                isError && <Error data={errorData} />
            }

            {
                !isLoading && !isError && 
                    <div className='workspace'>
                        <div className='slack'>
                            <img src={slack}></img>
                            <p>SlackClone</p>
                        </div>
                        <span>OR</span>
                    </div>
            }
        </Fragment>


    )
}

export default Workspace