import './topbar.css'
import {NotificationsNone, Language, Settings} from '@material-ui/icons';
import {AuthContext} from '../../context/authContext/AuthContext'
import { useContext } from 'react';
import {logout} from '../../context/authContext/AuthAction'
import {useNavigate} from 'react-router-dom'

const TopBar = () => {
    const {user, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">ankhangadmin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className='topIconBadge'>2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className='topIconBadge'>2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <div className="wrapperAvater">
                    <img src={user?.profilePic} alt="top-avatar" className="topAvatar" />
                    <div className="settingOption">
                        <span>Setting</span>
                        <span  
                            onClick = {() => 
                                {
                                    dispatch(logout())
                                    navigate('/login') 
                                }
                            }
                        >
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default TopBar;
