import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewPost = ({ addPost }) => {
  const [text, setText] = useState('');

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

  const handleSubmit = (event) => {
    if (text != '') {
      event.preventDefault();
      addPost(text);
      setText('');
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    setText(event);
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
      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={text}
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
    </div>
  );
};

export default NewPost;
