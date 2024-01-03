import Css from './Css.css'
import slack from '../../images/slack.png'
import google from '../../images/google.png'


function Landing() {

    return (
        <div className='landing'>
            <div className='slack'>
                <img src={slack}></img>
                <h2>SlackClone</h2>
            </div>
            <div className='enter-email'>
                <h1>First of all, enter your email address</h1>
                <p>We suggest using the <strong>email address that you use at work.</strong></p>
                <form>
                    <input placeholder='name@work-email.com'></input>
                    <button>Continue</button>
                </form>
                <span>------------ OR ------------</span>
                <button className='google-button' onClick={()=>{window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`}}>
                    <img src={google}></img>
                    Sign in with google
                </button>
            </div>
        </div>
    )
}

export default Landing