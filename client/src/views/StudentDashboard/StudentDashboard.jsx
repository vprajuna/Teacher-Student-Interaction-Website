import { message, Modal } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import './StudentDashboard.less';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import Discussion from '../Mentor/Classroom/Discussion/Discussion';

function StudentDashboard() {
  const [discussionId, setDiscussionId] = useState();
  const [syllabus, setSyllabus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const showDiscussionModal = () => {
    setIsDiscussionModalOpen(true);
  };

  const handleDiscussionOk = () => {
    setIsDiscussionModalOpen(false);
  };

  const handleDiscussionCancel = () => {
    setIsDiscussionModalOpen(false);
  };

  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();

  //   // Browser Notification System
  // let permission = Notification.permission;
  // if (permission === 'granted') {
  //   showNotification();
  // } else if (permission === 'default') {
  //   requestAndShowPermission();
  // } else {
  //   alert('Browser Notification');
  // }

  function showNotification() {
    var title = 'CASMM';
    var icon = 'image-url';
    var body = 'New notification from CASMM';
    var notification = new Notification(title, { body, icon });
    notification.onclick = () => {
      notification.close();
      window.parent.focus();
    };
  }

  function requestAndShowPermission() {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }

  // End browser notification system

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.classroom) {
            setDiscussionId(res.data.classroom.discussion);
            setSyllabus(res.data.classroom.Syllabus);
          }
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch {}
    };
    fetchData();
  }, []);

  const goToNotifications = () => {
    navigate('/notifications');
  };

  const goToSyllabus = () => {
    navigate('/syllabus');
  };

  const goToDiscussions = () => {
    navigate('/discussions');
  };

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='activity-container'>
        <div id='header'>
          <div>Assignments</div>
        </div>
        <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort(
                (activity1, activity2) => activity1.number - activity2.number
              )
              .map((activity) => (
                <div
                  key={activity.id}
                  id='list-item-wrapper'
                  onClick={() => handleSelection(activity)}
                >
                  <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                </div>
              ))
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>
                When your classroom manager selects one, it will appear here.
              </p>
            </div>
          )}
        </ul>
      </div>

      <aside id='sidebar'>
        <div id='header'>
          <div>Notifications</div>
        </div>
        <button id='notification-button' onClick={() => goToNotifications()}>
          View All
        </button>
        <ul>
          <div id='notification-item-wrapper'>
            <li>Assignment #3 is due tomorrow!</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>New lecture material is available.</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>Class will meet in room 202 today.</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>No homework this weekend.</li>
          </div>
          <div id='notification-item-wrapper'>
            <li>Share your work to the gallery!</li>
          </div>
        </ul>
      </aside>

      <div id='timeline'>
        <div>
          <CalendarComponent id='calendar' />;
        </div>
      </div>

      <div id='syllabus'>
        <div id='header'>Extras</div>
        <div>
          <ul>
            <button id='syllabus-item-wrapper' onClick={showModal}>
              Syllabus
            </button>
            <Modal
              title='Class Syllabus'
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ReactQuill value={syllabus} readOnly={true} theme={'bubble'} />
            </Modal>

            <button id='syllabus-item-wrapper' onClick={showDiscussionModal}>
              Discussions
            </button>
            <Modal
              title='Class Discussion'
              open={isDiscussionModalOpen}
              onOk={handleDiscussionOk}
              onCancel={handleDiscussionCancel}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Discussion discussionId={discussionId} />
            </Modal>

            <button id='syllabus-item-wrapper'>Gallery</button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
