import Css from './Css.css'
import React, { useEffect, Fragment } from 'react'
import { fetchUserData } from '../../apis/userApis'
import slack from '../../images/slack.png'
import Error from '../Common/Error'
import Loading from '../Common/Loading'
import {useNavigate, Outlet} from 'react-router-dom'

import workspace_1 from '../../images/workspace_1.png'
import workspace_2 from '../../images/workspace_2.png'
import workspace_3 from '../../images/workspace_3.png'
import { useRequestData } from '../../hooks/useRequestData'


function Workspace() {

    const navigate = useNavigate()
    const { data, isLoading, isError, errorData, fetchData } = useRequestData()

    useEffect(()=>{
        fetchData(fetchUserData)
    },[])

    return (
        <Fragment>

            {  isLoading && <Loading/> }

            {  isError && <Error data={errorData}/> }

            {
                !isLoading && !isError && data &&
                    <Fragment>

                        <div className='workspace'>
                            <div className='slack'>
                                <img src={slack}></img>
                                <p>SlackClone</p>
                            </div>
                            <div className='email-info'>
                                <span>Confirmed as <b>{data.email}</b></span>
                                <button onClick={()=>{navigate('/')}}>Change</button>
                            </div>
                            <div className='create-workspace'>
                                <div className='create-workspace-left'>
                                    <h1>Create a new Slack workspace</h1>
                                    <p>Slack gives your team a home - a place where they can talk and work together. To create a new workspace, click on the button below.</p>
                                    <button onClick={()=>{navigate('/workspace/create',{ state: data })}}>Create a workspace</button>
                                    <span>By continuing, you're agreeing to our main services agreement, user terms of service and Slack supplemental Terms. Additional disclosures are available in our privacy policy and cookie policy.</span>
                                </div>
                                <div className='create-workspace-right'>
                                    <img src={workspace_1}></img>
                                    <img src={workspace_2}></img>
                                    <img src={workspace_3}></img>
                                </div>
                            </div>
                            <span className='or'>OR</span>
                        </div>
                        <Outlet />
                    </Fragment>
            }
        </Fragment>
    )
}

export default Workspace