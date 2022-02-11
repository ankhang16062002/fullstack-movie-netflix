import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import './home.css'
import {useEffect, useState, useMemo} from 'react'
import axios from 'axios'

const Home = () => {

  const MONTHS = useMemo(() => (
    [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Agust",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
  ), [])

  const [userStats, setUserStats] = useState([])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/users/stats', {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
          }
        })
        const statsList = res.data.sort(function(a, b) {
          return a._id - b._id
        })
        statsList.map((item) => setUserStats(pre => [...pre, {name: MONTHS[item._id - 1], "New User": item.total}]))
      }
      catch(err) {
        console.log(err)
      }
    }

    getStats()
  }, [MONTHS])

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" dataKey="New User" grid/>
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
};

export default Home;
