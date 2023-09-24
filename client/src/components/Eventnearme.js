import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Post from './Post';
import './css/Eventnearme.css'
import gif from './css/Infinity-1s-200px.svg';
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
function Eventnearme() {
          const countstate = useSelector((state) => state.changeCount)
          const [geteventloading, setgeteventloading] = useState(false)
          const [eventlist, seteventlist] = useState({ events: [] })

          //--------------------- load events near me-----------------------//
          useEffect(() => {

                    setgeteventloading(true)

                    axios.get('/events/geteventinarea', {
                              withCredentials: true
                    }).then(async (res) => {

                              await seteventlist({
                                        events: res.data
                              })

                    }).catch((e) => {

                    })
                    setgeteventloading(false)
          }, [geteventloading, countstate])




          const open_post_popup = () => {
                    $('#popup-profile-window').removeClass('hide')
                    $('#app-main').addClass('reduceopacity')
          }
          return (

                    (!geteventloading) ? <div className='event-home'>
                              <h2>Services near you</h2>
                              {(eventlist.events.length !==0) ? <div className="eventlist">


                                        {(eventlist.events.length !== 0) && eventlist.events.map((e) => {
                                                  return <Post key={e._id} post={e} type={'service'} />
                                        })
                                        }


                              </div> :<div className='empty-message'>No services are available on your area.Post your need. <b onClick={open_post_popup}>Post my need</b>  </div>}

                    </div> : <img src={gif} className='loading' alt='loading' />
          )
}

export default Eventnearme
