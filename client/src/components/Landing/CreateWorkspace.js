import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function CreateWorkspace() {

    const navigate = useNavigate()
    const location = useLocation()
    const { email, username, photo  } = location.state || {}

    const [userData, setUserData] = useState({
                                                email : email || '', 
                                                username: username || '',
                                                photo : photo || '',
                                                workspace_name : '',

                                            })
    const [currentCard, setCurrentCard] = useState(0)

    const handleNextButtonClick = (e)=>{
        e.preventDefault()
        if(currentCard < 5){
            setCurrentCard(currentCard + 1)
        }
    } 
    
    const handleBackButtonClick = (e)=>{
        e.preventDefault()
        if(currentCard >= 1){
            setCurrentCard(currentCard - 1)
        }
    }  


    const handleProfileUpload = (e)=>{
        const file = e.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {
            const imageData = reader.result
            setUserData({...userData, photo: imageData})
        };

        if (file) {
            reader.readAsDataURL(file)
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
                        <input></input>
                        <button>Add</button>
                    </div>
                    <div className='card_buttons'>
                        <button onClick={handleBackButtonClick}>Back</button>
                        <button onClick={handleNextButtonClick}>Next</button>
                    </div>
                </div>
            </form>
        </div>
    )
    }

export default CreateWorkspace