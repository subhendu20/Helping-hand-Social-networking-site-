
import './App.css';
import { Router, Routes, Route, Link } from "react-router-dom"
import Profile from './components/Profile';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Cookies from 'universal-cookie'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import Editprofile from './components/Editprofile';

import axios from 'axios'
import Popupwindow from './components/Popupwindow';
import Userprofile from './components/Userprofile';
import { useNavigate } from 'react-router-dom';
import Searchpage from './components/Searchpage';
import cover from '../src/components/css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'
import Popupwindowevent from './components/Popupwindowevent';
import logo from './components/css/hhlogo.png'
import Info from './components/Info';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { logout } from './action';
import { login } from './action';
import gif from './components/css/Infinity-1s-200px.svg'
import Forgetpassword from './components/Forgetpassword';
import Eventnearme from './components/Eventnearme';

function App() {
  const logstate = useSelector((state) => state.changeStatus)
  const countstate = useSelector((state) => state.changeCount)

  const dispatch = useDispatch()




  const navigate = useNavigate();
  const cookie = new Cookies()
  const [searchmessage, setsearchmessage] = useState({ query: '' })


  const [loading, setloading] = useState(false)
  const [profiledata, setprofiledata] = useState({ name: '', profileimg: '' })

  const [followloading, setfollowloading] = useState(false)

  const [followerlist, setfollowerlist] = useState({ followers: [] })

  const open_dropdown = () => {
    $('#dropdown').toggleClass('none').toggleClass('flex')
    $('#pointer').toggleClass('bx-chevron-down').toggleClass('bx-chevron-up')
  }

  const changequery = (e) => {
    
    setsearchmessage({ ...searchmessage, [e.target.name]: e.target.value })
  }



  const collapse_sidebar = async () => {

    $('#menubtn').toggleClass('icon-center')
    $('.center-a').toggleClass('center-span')
    $('.side-a').toggleClass('col')
    $('.sidebar').toggleClass('reduce')
    $('.bx-broadcast').toggleClass('col')
    $('.side-span').toggleClass('span-center')
  }





  const signout = async (e) => {
    e.preventDefault()
    axios.post('/users/logout', {
      withCredentials: true
    }).then(async (res) => {


      await cookie.remove('logtoken')
      await navigate('/')
      dispatch(logout())

    }).catch((e) => {

    })
  }


  const close_logout_message = () => {
    $('#popup-logout-window').addClass('hide')



  }



  const submit_query = (e) => {
    e.preventDefault()

    navigate(`/queryresult/${searchmessage.query}`)

  }


  const display_signout = () => {
    $('#popup-logout-window').removeClass('hide')

  }















  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);


    window.addEventListener('resize', function () {
      if (window.innerHeight > 600) {
        vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    })
  }, [])



  useEffect(() => {
    const check = cookie.get('logtoken')
    if (check !== undefined) {
      dispatch(login())

    }

  })









  useEffect(() => {
    setloading(false)

    axios.get('/users/getdetails', {
      withCredentials: true
    }).then(async (res) => {


      var a = await res.data.name.split(' ')
      await setprofiledata({
        name: a[0],

        profileimg: res.data.profileimg,

      })
      localStorage.setItem('idu', res.data._id)


    }).catch((e) => {

    })
    setloading(true)

  }, [logstate,countstate])






  useEffect(() => {

    if (cookie.get('logtoken') !== undefined) {
      axios.get(`/comment/getfollows`, {
        withCredentials: true
      }).then(async (res) => {
        setfollowerlist({
          followers: res.data
        })
      }).catch((e) => {


      })

    }




  }, [logstate])






  return (
    (!logstate) ? <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Login />} />
      <Route path='/changeauthdetails' element={<Forgetpassword/>} />
      
    </Routes> :
      <div className="window">


        <div className="popup-profile-window hide" id='popup-profile-window'>
          <Popupwindow />
        </div>
        <div className="popup-event-window hide" id='popup-event-window'>
          <Popupwindowevent />
        </div>
        <div className="popup-logout-window hide" id='popup-logout-window'>
          <div className="log-warning">
            <span><p>Do you want to Log out?</p><i class='bx bx-x' onClick={close_logout_message}></i></span>
            <span className="btn"><button onClick={signout}>Log out</button></span>
          </div>
        </div>



        <div className="App" id='app-main'>

          {/*---------------------------------------------- nav -------------------------------------------------*/}
          <header id='app-header'>
          <nav className="nav">
            <span className="logo"><Link to='/'>HHand</Link></span>
            <span className="search"><form onSubmit={submit_query}><input type="text" placeholder='search' name='query' onChange={changequery} autoComplete='false' /><button type='submit'><i class='bx bx-search-alt-2'></i></button></form></span>
            <span className="menu">

              <img class='bx bxl-product-hunt' src={(profiledata.profileimg !== '') ? profiledata.profileimg : cover} alt='loading' onClick={open_dropdown} /><i class='bx bx-chevron-down' id='pointer' onClick={open_dropdown}></i>
              <div className="dropdown none" id='dropdown'>
                <span><i class='bx bxl-product-hunt' ></i><Link to="/profile">{profiledata.name.split(' ')[0]}</Link></span>

               
                <hr />
                <span className="Edit"><Link to="/editprofile">Edit profile</Link></span>
                <hr />
                <span className="signout" onClick={display_signout}>Sign out</span>


              </div></span>

          </nav>

          </header>

          <section className="content">
            {/*------------------------------------------------------ sidebar -----------------------------------------------*/}
            <aside class="sidebar reduce">

              <ul class="buttons">
                <li className='side-span' id='menubtn'><i class='bx bx-menu' onClick={collapse_sidebar}></i></li>
              </ul>
              <ul class="icons">
                <li className='side-span'><Link to="/" className='center-a'> <i class='bx bx-home'></i>
                  <p className='side-a col'>Home</p></Link>
                </li>
                <li className='side-span'> <Link to='/profile' className='center-a'> <i class='bx bxl-product-hunt'></i>
                  <p className='side-a col'>{profiledata.name}</p></Link>
                </li>
                <li className='side-span'> <Link to='/nearevents' className='center-a'> <i class='bx bxs-network-chart'></i>
                  <p className='side-a col' >Services</p></Link>
                </li>
                <li className='side-span'> <Link to='/info' className='center-a'> <i class='bx bxs-info-circle'></i>
                  <p className='side-a col' >Info</p></Link>
                </li>

                <hr className='sidebar-hr' />



              </ul>
              

              <ul class="icons2">
            

                {
                  (followerlist.followers.length !== 0) && followerlist.followers.map((e) => {
                    return <li className='side-span' key={e._id}><Link to={`/userprofile/${e.followid}`} className='center-a'> <img src={(e.followimg !== '') ? e.followimg : cover} alt="loading" />
                      <p className='side-a col'>{e.followname.split(' ')[0]}</p></Link>
                    </li>
                  })
                }

              </ul>






            </aside>

            {/* ------------------------------------------------content ----------------------------------------*/}
            {(profiledata.name !== '') ? <main className="route" id='route'>
              <Routes>
                <Route path='/profile' element={<Profile />} />
                <Route path='/' element={<Home />} />
                <Route path='/editprofile' element={<Editprofile />} />
                <Route path='/nearevents' element={<Eventnearme/>} />
                <Route path='/info' element={<Info />} />
                <Route path='/userprofile/:userId' element={<Userprofile />} />
                <Route path='/queryresult/:query' element={<Searchpage />} />
              </Routes>

            </main> : <img src={gif} className='loading' alt='loading' />}


          </section>




        </div>

      </div>



  );
}

export default App;
