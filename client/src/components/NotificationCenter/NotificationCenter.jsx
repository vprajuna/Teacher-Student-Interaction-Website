import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './NotificationCenter.less';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Assignment #3 is due tomorrow!', read: false, flagged: false, date: '2023-11-20' },
    { id: 2, text: 'New lecture material is available.', read: false, flagged: false, date: '2023-11-19' },
    { id: 3, text: 'Class will meet in room 202 today.', read: false, flagged: false, date: '2023-11-18' },
  ]);
  const [filter, setFilter] = useState('all');

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: !notification.read };
      }
      return notification;
    }));
  };

  const toggleFlag = (id) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, flagged: !notification.flagged };
      }
      return notification;
    }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'all') return true;
      if (filter === 'read') return notification.read;
      if (filter === 'unread') return !notification.read;
      if (filter === 'flagged') return notification.flagged;
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container nav-padding">
      <NavBar />
      <div className="notification-box">
        <div className="notification-title">Notification Center</div>
        <select onChange={handleFilterChange} value={filter} className="notification-filter">
          <option value="all">All Notifications</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
          <option value="flagged">Flagged</option>
        </select>
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className={`notification-message ${notification.read ? '' : 'bold'}`}>
            <div className="notification-details">
              <div className="notification-content">
              <span className={`notification-flag ${notification.flagged ? 'fas fa-star' : ''}`}
                style={{ color: notification.flagged ? '#f0ad4e ' : 'inherit' }}>
              </span>
                <span className="notification-text">{notification.text}</span>
              </div>
              <span className="notification-date">{notification.date}</span>
            </div>
            <div className="notification-actions">
              <button className="notification-button" onClick={() => toggleReadStatus(notification.id)}>
                <i className={`fa ${notification.read ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
              </button>
              <button className="notification-button" onClick={() => toggleFlag(notification.id)}>
                <i className={`${notification.flagged ? 'fas fa-star' : 'far fa-star'}`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;