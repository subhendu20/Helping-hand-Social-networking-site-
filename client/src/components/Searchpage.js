import React, { useEffect, useState } from 'react'
import './css/searchpage.css'
import Post from './Post'
import defaultimg from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import gif from './css/Infinity-1s-200px.svg'

function Searchpage() {
          const navigate = useNavigate()
          const { query } = useParams()
          const [searchlist, setsearchlist] = useState({ searchdetails: [], loading: false })
          const [details, setdetails] = useState({
                    postlist: [],
                    profilelist: []
          })
          const [loading, setloading] = useState(false)


          useEffect(() => {
                    setloading(true)

                    axios.post('/post/findpost', { query }, {
                              withCredentials: true
                    }).then(async (res) => {

                              await setdetails({
                                        postlist: res.data.posts,
                                        profilelist: res.data.profiles

                              })

                              setloading(false)




                    }).catch((e) => {


                    })



          }, [query])




          return (
                    <React.Fragment>

                              {/*------------------ if there are some result------------------ */}
                    {(details.postlist.length !== 0 || details.profilelist.length !== 0) &&
                    <div className='searchresult'>
                              <div className="posts-search">
                                        <span className="title">
                                                  Posts

                                        </span>
                                        <hr />
                                        <span className="postlist">

                                                  {
                                                            (details.postlist.length !== 0) && details.postlist.map((e) => {


                                                                      return e.map((x) => {

                                                                                return <Post post={x} />


                                                                      })

                                                            })
                                                  }


                                        </span>

                              </div>
                              <div className="creator-search" >
                                        <span className="title">
                                                  Profiles
                                        </span>

                                        <span className="profilelist">
                                                  {
                                                            (details.profilelist.length !== 0) && details.profilelist.map((e) => {


                                                                      return e.map((x) => {

                                                                                return <span key={x._id} onClick={() => navigate(`/userprofile/${x._id}`)}>
                                                                                          <img src={(x.profileimg !== '') ? x.profileimg : defaultimg} alt="loading" />
                                                                                          <div className='prof-details'>
                                                                                                    <span className="name">{x.name}</span>

                                                                                          </div>

                                                                                </span>



                                                                      })

                                                            })
                                                  }

                                        </span>

                              </div>
                    </div>}

                    {/*-------------------------------- page loading --------------------------*/}

                    {(details.postlist.length === 0 && details.profilelist.length === 0 && loading) && <img src={gif} className='loading' alt='loading'/>}
                     
                     {/* --------------------------------no result------------------------------ */}
                    
                    {
                              (details.postlist.length === 0 && details.profilelist.length === 0 && !loading) && <section className='warning-page'>
                                        No such post or profile
                              </section>

                    }



                    </React.Fragment>


          )
}

export default Searchpage
