import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

function CreateWorkspace() {

    const navigate = useNavigate()
    const location = useLocation()
    const { email, username, photo  } = location.state || {}

    const [userData, setUserData] = useState({
                                                email : email || '', 
                                                username: username || '',
                                                photo : photo || '',
                                                workspace_name : 'ritik_workspace',
                                                invite_emails : ['ritikn3w@gmail.com']
                                            })
    const [currentCard, setCurrentCard] = useState(0)
    const [newEmail,setNewEmail] = useState('')

    const handleNextButtonClick = (e)=>{
        e.preventDefault()
        if(currentCard < 5){ setCurrentCard(currentCard + 1)}
    } 
    
    const handleBackButtonClick = (e)=>{
        e.preventDefault()
        if(currentCard >= 1){ setCurrentCard(currentCard - 1)}
    }  


    const handleProfileUpload = (e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            const imageData = reader.result
            setUserData({...userData, photo: imageData, photo_file : file})
        }

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleDeleteEmail = (index) => {
        const updatedEmails = [...userData.invite_emails]
      
        updatedEmails.splice(index, 1);
        setUserData({
          ...userData,
          invite_emails: updatedEmails,
        })
    }

    const handleAddToFront = (e) => {
        e.preventDefault()
        setUserData({...userData,invite_emails: [newEmail, ...userData.invite_emails]})
        setNewEmail('')
    }




    const handleSubmitButtonClick = async(e)=>{
        
        e.preventDefault()
        
        try{

            console.log(userData)
        
            //get signedurl
            const {data} = await axios.post('http://localhost:5000/user/get_upload_url',{contentType : userData.photo_file.type},{withCredentials: true})
            
            //use url to upload file
            const response = await axios.put(data.signedUrl, userData.photo_file)

            console.log(response)

        }
        catch(err){
           console.log(err)
        }
    }





    return (
        <div className='createworkspace'>
            <h1>Let's create a workspace</h1>
            <span className='steps-count'>Step {currentCard + 1} of 5</span>
            <button className='close-createworkspace' onClick={()=>{navigate('/workspace')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <form>
                <div className={`card ${currentCard === 0 ? 'active' : 'hidden'}`} key={0}>
                    <div className='card_inner'>
                        <lable>What's the name of your company or team?</lable>
                        <span>This will be the name of your Slack workspace - choose something that your team will recognise.</span>
                        <input 
                                value={userData.workspace_name} 
                                placeholder='e.g. A1 Marketing' 
                                onChange={(e)=>{setUserData({...userData, workspace_name:e.target.value})}}>
                        </input>
                    </div>
                    <div className='card_buttons' style={{justifyContent:"end"}}>
                        {
                            userData.workspace_name.length > 0 && <button onClick={handleNextButtonClick}>Next</button>
                        }
                    </div>
                </div>
                <div className={`card ${currentCard === 1 ? 'active' : 'hidden'}`} key={1}>
                    <div className='card_inner'>
                        <lable>What's your name?</lable>
                        <span>This will be the name of your Slack workspace - choose something that your team will recognise.</span>
                        <input value={userData.email} onChange={(e)=>{setUserData({...userData, email:e.target.value})}}></input>
                    </div>
                    <div className='card_buttons'>
                        <button onClick={handleBackButtonClick}>Back</button>
                        <button onClick={handleNextButtonClick}>Next</button>
                    </div>
                </div>
                <div className={`card ${currentCard === 2 ? 'active' : 'hidden'}`} key={2}>
                    <div className='card_inner'>
                        <lable>What's your name?</lable>
                        <span>Adding your name helps your teammates to recognise and connect with you more easily.</span>
                        <input value={userData.username} onChange={(e)=>{setUserData({...userData, username:e.target.value})}}></input>
                    </div>
                    <div className='card_buttons'>
                        <button onClick={handleBackButtonClick}>Back</button>
                        <button onClick={handleNextButtonClick}>Next</button>
                    </div>
                </div>
                <div className={`card ${currentCard === 3 ? 'active' : 'hidden'}`} key={3}>
                    <div className='card_inner'>
                        <label>Your profile photo (optional)</label>
                        <span>Adding your profile photo helps your teammates to recognise and connect with you more easily.</span>
                        <div style={{display:'flex', gap:"1rem"}}>
                            <img src={userData.photo}></img>
                            <input type="file" accept="image/*" onChange={handleProfileUpload} />
                        </div>
                    </div>
                    <div className='card_buttons'>
                        <button onClick={handleBackButtonClick}>Back</button>
                        <button onClick={handleNextButtonClick}>Next</button>
                    </div>
                </div>
                <div className={`card ${currentCard === 4 ? 'active' : 'hidden'}`} key={4}>
                    <div className='card_inner'>
                        <lable>Who else is on the <b>{userData.workspace_name}</b> team?</lable>
                        <span>Add colleagues by email</span>
                        <div className='enter_emails'>
                            <input type='email' onChange={(e)=>{setNewEmail(e.target.value)}} value={newEmail}></input>
                            <button onClick={handleAddToFront}>Add</button>
                        </div>
                        <div className='entered_emails'>
                            {   
                                userData.invite_emails.map((emaill,index)=>{
                                    return <div className='enter_emails' key={index} style={{padding:"0.2rem"}}> 
                                                <span>
                                                    {emaill}
                                                    <button className='delete-email' onClick={(e) => {e.preventDefault();handleDeleteEmail(index)}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </div>
                            })}
                        </div>
                    </div>
                    <div className='card_buttons'>
                        <button onClick={handleBackButtonClick}>Back</button>
                        <button onClick={handleSubmitButtonClick}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
    }

export default CreateWorkspace