import {useState, useContext} from 'react'
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import './navbar.scss'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../authContext/AuthContext'
import {logout} from '../../authContext/AuthAction'

const NavBar = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  const {dispatch, user} = useContext(AuthContext)
  const navigate = useNavigate()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => {
      window.onscroll = null
    }
  }

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="container">
          <div className="left">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
              alt="img-logo" 
            />
            <Link to='/' className='link'>
              <span>Homepage</span>
            </Link>
            <Link to='/series' className='link'>
              <span className='navbarmainLink'>Series</span>
            </Link>
            <Link to="/movies" className='link'>
              <span className='navbarmainLink'>Movies</span>
            </Link>
            <span>New and Popular</span>
            <span>My List</span>
          </div>
          <div className="right">
            <Search className="icon"/>
            <span>KID</span>
            <Notifications className="icon"/>
            <img src= {user.profilePic} alt="img-ankhang" />
            <div className="profile">
              <ArrowDropDown className="icon"/>
              <div className="options">
                <span>Settings</span>
                <span 
                  onClick = {() => {
                    dispatch(logout())
                    navigate('/login')
                  }}
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

export default NavBar;
