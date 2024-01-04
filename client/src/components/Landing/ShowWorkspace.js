import React, { Fragment } from 'react'
import Css from './Css.css'

function ShowWorkspace({data}) {

    console.log(data)

    return (
        <div className='show-workspaces'>

            <h2>Welcome back</h2>
            <div>
                <span>Workspaces for {data.email}</span>
                <Fragment>
                    {
                        data.workspaces.map((workspace)=>{
                            return <div>
                                    <img src={workspace.photo}></img>
                                    <div>
                                        <p>{workspace.name}</p>
                                        {
                                            workspace.invite_emails.map(email=>{
                                                return <p>{email}</p>
                                            })
                                        }
                                    </div>
                            </div>
                        })
                    }
                </Fragment>
            </div>

        </div>
    )
}

export default ShowWorkspace