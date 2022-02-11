import './widgetsm.css'
import {Visibility} from '@material-ui/icons';
import {useState, useEffect} from 'react'
import axios from 'axios';

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([])

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/users?new=true', {
          headers: {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjJjNzg1NmQxZGQ3NDM3NjdmOWQ3MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDA0NzUwMCwiZXhwIjoxNjQ0NDc5NTAwfQ.L36auaB_KbncHOr4yOK8Uut2opEuGYyuCY11spKYHw0',
          }
        })
        setNewUsers(res.data)
      }
      catch(err) {
        console.log(err)
      }
    }

    getNewUsers()
  }, [])

  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          newUsers.map((user, index) => (
            <li className="widgetSmListItem" key = {index}>
              <img 
                src= {user.profilePic || 'https://i.pinimg.com/564x/0a/fc/5d/0afc5ded2d5c9d9294e1c82c180c2075.jpg'} 
                alt="img-widget" 
                className="widgetSmImg" 
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className='widgetSmIcon'/>
                Display
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default WidgetSm;
