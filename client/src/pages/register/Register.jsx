import axios from "axios";
import { useState, useRef } from "react";
import {useNavigate} from 'react-router-dom'
import "./register.scss";
import {Link} from 'react-router-dom'
import {Publish} from '@material-ui/icons';
import storage from '../../firebase'


export default function Register() {
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState({})
  const [profilePic, setProfilePic] = useState("")
  const [urlCurrent, setUrlCurrent] = useState("")
  const [uploaded, setUploaded] = useState(0)

  const emailRef = useRef();
  const navigate = useNavigate()

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  
  const handleChange = (e) => {
    const value = e.target.value
    setUserInfo({...userInfo, [e.target.name]: value})
  }

  const handleFinish = async (e) => {
    e.preventDefault()

      try {
        await axios.post('auth/register', {...userInfo, email})
        navigate('/login')
      }
      catch(err) {
        console.log(err)
      }
  };

  const upload = (items) => {
    items.forEach(item => {
      const fileName = new Date().getTime() + item.label + item.file.name
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
      uploadTask.on("state_changed", 
        snapshot => {
          const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + " % done"
          console.log(process)
        },
        err => console.log(err),
        () => {
          uploadTask.snapshot.ref.getDownloadURL()
          .then(url => {
            setUserInfo({...userInfo, [item.label]: url})
            setUploaded(pre => pre + 1)
          })
          .catch(err => console.log(err))
        }
      )
    })
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([
      {
        file: profilePic,
        label: 'profilePic',
      },
    ])
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to = '/login' className="link" style={{zIndex: 100, postion: 'relative'}}>
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="user name" name="username" onChange={handleChange}/>
            <div className="userRegisterUpload">
              <img src= {urlCurrent || "https://tse2.mm.bing.net/th?id=OIP.22sRFqFGX3YYAtah66MjuAHaJQ&pid=Api&P=0&w=138&h=173"} alt="img-upload" className='userRegisterImg' />
              <label htmlFor="file"><Publish className='userRegisterIcon'/></label>
              <input 
                  type="file" 
                  id='file' 
                  style={{display: "none"}} 
                  name='profilePic'
                  onChange={(e) => {
                      setProfilePic(e.target.files[0])
                      setUrlCurrent(URL.createObjectURL(e.target.files[0]))
                  }}
              />
            </div>
            {
              uploaded === 1 ? (
                <button className="registerButton" onClick={handleFinish}>
                  Start
                </button>
              ) : (
                <button className="registerButton" onClick={handleUpload}>
                  Upload
                </button>
              )
            }
          </form>
        )}
      </div>
    </div>
  );
}