import './newuser.css'
import {Publish} from '@material-ui/icons';
import {useState, useEffect, useContext} from 'react'
import storage from '../../firebase'
import {createUser} from '../../context/userContext/apiCalls'
import {UserContext} from '../../context/userContext/UserContext'

const NewUser = () => {

    const [newInfo, setNewInfo] = useState({})
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

    setNewInfo({...newInfo, [e.target.name]: value})
  }

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
            setNewInfo({...newInfo, [item.label]: url})
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
      }
    ])
  }

  const handleCreate = (e) => {
    e.preventDefault()
    createUser(newInfo, dispatch)
  }

  console.log(newInfo)

  return (
    <div className='newUser'>
        <h1 className="newUserTitle">New User</h1>
        <form className='newUserForm'>
          <div className="newUserItem">
            <label>Username</label>
            <input type="text" placeholder='john' name="username" onChange={handleChange}/>
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input type="email" placeholder='vuongankhang1606@gmail.com' name="email" onChange={handleChange}/>
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input type="password" placeholder='password' name="password" onChange={handleChange}/>
          </div>
          <div className="newUserItem">
            <label>IsAdmin</label>
            <select  id="isAdmin" className="newUserSelect" name="isAdmin" onChange={handleChange}>
              <option>Yes</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="userUpdateUpload">
            <img src= {urlCurrent || "https://tse2.mm.bing.net/th?id=OIP.22sRFqFGX3YYAtah66MjuAHaJQ&pid=Api&P=0&w=138&h=173"} alt="img-upload" className='userUpdateImg' />
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
              <button className="newUserButton" onClick = {handleCreate}>Create</button>
            ) : (
              <button className="newUserButton" onClick={handleUpload}>Upload</button>
            )
          }
        </form>
    </div>
  )
};

export default NewUser;
