import React, { useEffect, useState } from 'react'
import './css/Post.css'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'
import postimg from './css/download (5).jpeg'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Post({ post, type }) {
  const navigate = useNavigate();
  const [comments, setcomments] = useState({ comments: '' })
  const [loading, setloading] = useState(true)
  const [commentlist, setcommentlist] = useState({ list: [] })



  const location = useLocation();

  const submitcomment = async (e) => {
    e.preventDefault()
    $('#message_input').val('')

    axios.post(`/comment/addcomment/${post._id}`, comments, {
      withCredentials: true
    }).then(async (res) => {


      setloading(false)



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

  const getdays = async(d) => {
    const now = Date.now()
                    const prev = new Date(d)
                    const diffTime = Math.abs(prev - now);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays


  }

  const getHours = async(d) => {
    const now = Date.now()
                    const prev = new Date(d)
                    const diffTime = Math.abs(prev - now);
                    const diffhours = Math.ceil(diffTime / (1000 * 60 * 60 ));
                    return diffhours
   


  }

  const getMinutes = async(d) => {
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


      <span className="profile" onClick={open_profile}>{post.username}</span>
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
                <span className="time">{(getdays(e.date)>=1)?getdays(e.date):(getHours(e.date)>=1)?getHours(e.date):getMinutes(e.date)}</span>
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
