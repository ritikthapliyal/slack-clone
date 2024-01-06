import React, { Fragment } from 'react'
import Css from './Css.css'

function ShowWorkspace({data}) {

    console.log(data)

    return (
        <div className='show-workspaces'>
            <h2>Welcome back</h2>
            <div className='workspace-div'>
                <span>Workspaces for {data.email}</span>
                <Fragment>
                    {
                        data.workspaces.map((workspace)=>{
                            return <div className='workspace-box'>
                                    <div className='workspace-info'>
                                        <img src={workspace.workspace_photo}></img>
                                        <div>
                                            <h4>{workspace.name}</h4>
                                            {
                                                workspace.invite_emails.map(email=>{
                                                    return <p>{email}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <button>Open Workspace</button>
                            </div>
                        })
                    }
                </Fragment>
            </div>

        </div>
    )
}

export default ShowWorkspace