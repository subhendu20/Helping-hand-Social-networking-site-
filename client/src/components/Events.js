import React, { useState } from 'react'
import './css/Events.css'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'

function Events() {
          const [comments, setcomments] = useState({ comments: '' })
          const [loading, setloading] = useState(true)
          const [commentlist, setcommentlist] = useState({ list: [] })

          const submitcomment = async (e) => {
                    e.preventDefault()
                   


          }
         

          const change = (e) => {
                    setcomments({ [e.target.name]: e.target.value })
          }

          return (
                    <div className='event-main'>


                              <span className="profile">ohumor</span>
                              <span className="img">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>


                              <span className="buttons0"><button>Participate</button></span>
                              <span className="buttons" ><i class='bx bxs-comment-detail'></i>0 comments</span>
                              <div className="comments none" id='noid'>
                                        <hr />
                                        <div className="commentbox">
                                                  {
                                                            // (commentlist.list.length===0)?<p>No comments</p>:commentlist.list.map((e)=>{
                                                            //   return <span key={e._id}>
                                                            //     <span className="user">{e.username}</span>
                                                            //     <span className="comment-message"><p>{e.comment}</p></span>
                                                            //     <span className="time">{e.Date}</span>
                                                            //   </span>

                                                            // })
                                                  }



                                        </div>
                                        <form action="" className="commentform">
                                                  <input type="text" name='comments' placeholder='Write comment' onChange={change} />
                                                  <button className="submitcomment" onClick={submitcomment}><i class='bx bx-send'></i></button>

                                        </form>
                              </div>


                    </div>
          )
}

export default Events
