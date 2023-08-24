import React, { useEffect, useState } from 'react'
import './css/Post.css'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'
import postimg from './css/download (5).jpeg'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

function Post({ post, type }) {
  const navigate = useNavigate();
  const cookie = new Cookies()
  const [comments, setcomments] = useState({ comments: '' })
  const [loading, setloading] = useState(true)
  const [commentlist, setcommentlist] = useState({ list: [] })



  const location = useLocation();




  
  const submitcomment = async (e) => {
    e.preventDefault()
    

    axios.post(`/comment/addcomment/${post._id}`, comments, {
      withCredentials: true
    }).then(async (res) => {


      await setloading(false)
      $('#message_input').val('')
      




    }).catch((e) => {


    })


  }




  const opencomments = () => {

    $(`#post-main${post._id}`).toggleClass('br-change')
    $(`#${post._id}`).toggleClass('none').toggleClass('flex')



  }





  const change = (e) => {
    setcomments({ [e.target.name]: e.target.value })
  }





  const open_profile = () => {
    navigate(`/userprofile/${post.user}`)

  }




  const getdays = (d) => {
    const now = Date.now()
                    const prev = new Date(d)
                    const diffTime = Math.abs(prev - now);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    console.log(diffDays)
                    return diffDays
                    


  }

  const getHours = (d) => {
    const now = Date.now()
                    const prev = new Date(d)
                    const diffTime = Math.abs(prev - now);
                    const diffhours = Math.ceil(diffTime / (1000 * 60 * 60 ));
                    console.log(diffhours)
                    return diffhours
   


  }

  const getMinutes = (d) => {
    const now = Date.now()
                    const prev = new Date(d)
                    const diffTime = Math.abs(prev - now);
                    const diffmin = Math.ceil(diffTime / (1000 * 60 ));
                    
                    return diffmin


  }

  


  const delete_comment = (id) => {

    axios.delete(`/comment/deletecomment/${id}`, {
      withCredentials: true
    }).then(async (res) => {


      setloading(false)


    }).catch((e) => {

    })

  }

  useEffect(() => {

    if (location.pathname === '/') {
      $('.post-main').addClass('expand')

    }

    else {
      $('.post-main').removeClass('expand')

    }
  }, [location.pathname])



  useEffect(() => {



    axios.get(`/comment/getcomment/${post._id}`, {
      withCredentials: true
    }).then(async (res) => {

      await setcommentlist({
        list: res.data
      })







    }).catch((e) => {

    })

    setloading(true)










  }, [loading]

  )

  return (
    <div className='post-main' id={`post-main${post._id}`} >


      <span className="profile" onClick={open_profile}> <p> {post.username}</p><i class='bx bx-dots-horizontal-rounded'></i>
      <span className="dropdown">
        <u>
          <li className='profile'>Visit profile</li>
          {(post.user === localStorage.getItem('idu')) && <li className='delete'>Delete</li>}
        </u>
      </span>
      
      </span>
      <span className="topic">{post.topic}</span>
      <span className="img">{post.description}</span>
      <span className='small'>{`${post.area}`}</span>
      <span className='small'>{`${post.Date}`}</span>


      <span className="buttons0"><button onClick={opencomments}>{(type === 'post') ? 'explore' : 'Raise hand'}</button></span>
      <span className="buttons" id='opento' onClick={opencomments}><i class='bx bxs-comment-detail'></i>{commentlist.list.length} comments</span>
      <div className="comments none" id={post._id}>
        <hr />
        <div className="commentbox">
          {
            (commentlist.list.length === 0) ? <p>No comments</p> : commentlist.list.map((e) => {
              return <span key={e._id}>
                <span className="user">{e.username}</span>
                <span className="comment-message"><p>{e.comment}</p>{(post.user === e.user) ? <i class='bx bxs-message-square-x' onClick={() => delete_comment(e._id)}></i> : <></>}</span>
                {/* <span className="time">{(getdays(e.Date)>=1)?`${getdays(e.Date)} Days ago`:`Today`}</span> */}
                <span className="time">{e.Date}</span>
              </span>

            })
          }



        </div>
        <form action="" className="commentform">
          <input type="text" name='comments' placeholder='Write comment' onChange={change} id='message_input' />
          <button className="submitcomment" onClick={submitcomment}><i class='bx bx-send'></i></button>

        </form>
      </div>


    </div>
  )
}

export default Post
