import './user.css'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import {Link, useLocation} from 'react-router-dom'
import {useState} from 'react'
import storage from '../../firebase';
import { useEffect, useContext } from 'react';
import { updateUser } from '../../context/userContext/apiCalls';
import {UserContext} from '../../context/userContext/UserContext'

const User = () => {
    const location = useLocation()
    const user = location.state

    const [userUpdate, setUserUpdate] = useState({})
    const [profilePic, setProfilePic] = useState("")
    const [urlCurrent, setUrlCurrent] = useState("")
    const [uploaded, setUploaded] = useState(0)

    const {dispatch} = useContext(UserContext)

    useEffect(() => {

        return () => {
            URL.revokeObjectURL(urlCurrent)
        }
    }, [urlCurrent])

    const handleChange = (e) => {
        let value = e.target.value
        if(value === 'yes') value = true
        if(value === 'no') value = false
        
        setUserUpdate({...userUpdate, [e.target.name]: value})
    }

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
            uploadTask.on("state_changed", 
                snapshot => {
                    const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log("Upload is " + process + " % done.")
            },
                err => console.log(err),
                () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then(url => {
                        setUserUpdate({...userUpdate, [item.label]: url})
                        setUploaded(pre => pre+1)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            )
        })
    }

    const handleUpload = (e) => {
        e.preventDefault()
        upload([
            {
                label: "profilePic",
                file: profilePic,
            },
        ])
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        updateUser(user._id, userUpdate, dispatch)
    }


  return (
    <div className='user'>
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
                <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img 
                        src= {user.profilePic}
                        alt="img-user-top" 
                        className='userShowImg'
                    />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{user.username}</span>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className='userShowIcon' />
                        <span className="userShowInfoTitle">{user.username}</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className='userShowIcon'/>
                        <span className="userShowInfoTitle">16.06.2002</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className='userShowIcon'/>
                        <span className="userShowInfoTitle">+0 868 718 744</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className='userShowIcon'/>
                        <span className="userShowInfoTitle">{user.email}</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className='userShowIcon'/>
                        <span className="userShowInfoTitle">Nam định | VN</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input 
                                type="text" 
                                placeholder={user.username} 
                                className='userUpdateInput'
                                name='username'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input 
                                type="text" 
                                placeholder={user.email} 
                                className='userUpdateInput'
                                name= 'email'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Password</label>
                            <input 
                                type="password"  
                                className='userUpdateInput'
                                name= 'password'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>IsAdmin</label>
                            <select 
                                name='isAdmin'
                                onChange={handleChange}    
                            >
                                <option>Yes</option>
                                <option value= 'yes'>Yes</option>
                                <option value= 'no'>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src= {urlCurrent || user.profilePic} alt="img-upload" className='userUpdateImg' />
                            <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
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
                                <button 
                                    className="userUpdateButton"
                                    onClick = {handleUpdate}    
                                >
                                    Update
                                </button>
                            ) : (
                                <button 
                                    className="userUpdateButton"
                                    onClick = {handleUpload}    
                                >
                                    Upload
                                </button>
                            )
                        }
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
};

export default User;
