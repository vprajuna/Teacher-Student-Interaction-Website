import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

import {
  getPost,
  addReply,
  createPost,
  DELETEPost,
} from '../../../../Utils/requests';
import { message, Tag } from 'antd';
import { getCurrUser } from '../../../../Utils/userState';

const Post = ({ postId, deletePost }) => {
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState(false);
  const [replyText, setreplyText] = useState('');

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }, { align: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['formula'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'bold',
    'color font',
    'italic',
    'link',
    'size',
    'strike',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'formula',
    'image',
    'video',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPost(postId);
      if (res.data) {
        const post = res.data;
        setPost(post);
        setReplies([...post.Replies]);
      } else {
        message.error(res.err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (replyText != '') {
      const addData = async () => {
        const res = await createPost(replyText, 'John Doe');
        if (res.data) {
          setReplies([...replies, res.data]);
          setreplyText('');
          setReply(false);
          addReply(postId, replies, res.data);
        } else {
          message.error(res.err);
        }
      };
      addData();
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    setreplyText(event);
  };

  return (
    <div
      style={{
        width: '70vw',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.377)',
        borderRadius: '10px',
        margin: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ReactQuill value={post.Text} readOnly={true} theme={'bubble'} />
        <div>
          <button
            style={{
              width: 'auto',
              height: 'auto',
              border: 'none',
              color: '#414141',
              background: '#F3D250',
              transition: '0.25s',
              cursor: 'pointer',
              borderRadius: '30px',
              padding: '10px',
              margin: '20px',
              display: 'inline - block',
            }}
            onClick={(event) => {
              setReply(!reply);
            }}
          >
            Reply
          </button>
          {getCurrUser().role != 'Student' ? (
            <button
              style={{
                width: 'auto',
                height: 'auto',
                border: 'none',
                color: '#414141',
                background: '#F3D250',
                transition: '0.25s',
                cursor: 'pointer',
                borderRadius: '30px',
                padding: '10px',
                margin: '20px',
                display: 'inline - block',
              }}
              onClick={(event) => {
                deletePost(postId);
                replies.forEach((post) => {
                  DELETEPost(post.id);
                });
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
      <>
        {reply ? (
          <form onSubmit={handleSubmit}>
            <ReactQuill
              value={replyText}
              modules={modules}
              formats={formats}
              onChange={handleChange}
            />
            <button
              style={{
                width: 'auto',
                height: 'auto',
                border: 'none',
                color: '#414141',
                background: '#F3D250',
                transition: '0.25s',
                cursor: 'pointer',
                borderRadius: '30px',
                padding: '10px',
                margin: '20px',
                display: 'inline - block',
              }}
              type='submit'
            >
              Post
            </button>
          </form>
        ) : null}
      </>
      {replies.map((post, index) => (
        <ReactQuill
          key={index}
          value={post.Text}
          readOnly={true}
          theme={'bubble'}
        />
      ))}
    </div>
  );
};

export default Post;
