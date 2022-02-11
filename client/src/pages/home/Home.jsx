import { useState, useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import NavBar from '../../components/navbar/NavBar'
import axios from 'axios'
import './home.scss'

const Home = ({type}) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  //fetch api lists
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`,
          {
            headers: {
              token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
          }
        )
        
        setLists(res.data)
      }
      catch(err) {
        console.log(err)
      }
    }

    getRandomLists()
  }, [type, genre])

  return (
      <div className='home'>
          <NavBar />
          <Featured type = {type} setGenre={setGenre}/>
          {
            lists.map((list, index) => (
              <List list={list} key={index}/>
            ))
          }
      </div>
  )
};

export default Home;
