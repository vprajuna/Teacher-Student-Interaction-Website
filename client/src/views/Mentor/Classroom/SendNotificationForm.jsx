import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import './SendNotificationForm.less';

const SendNotificationForm = ({ studentIds }) => {
  const [notification, setNotification] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/notifications/send-targeted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: notification,
          studentIds: studentIds,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      message.success('Notification sent successfully!');
      setNotification('');
    } catch (error) {
      message.error(`Failed to send notification: ${error.message}`);
    }
  };

  return (
    <div className="notification-box">
      <div className="notification-title">Send Notification</div>
      <Form onFinish={handleSubmit} className="notification-form">
        <Form.Item label="Notification Message" className="notification-form-item">
          <Input.TextArea
            rows={4}
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            placeholder="Enter your notification message"
          />
        </Form.Item>
        <Form.Item className="notification-form-item">
          <Button type="primary" htmlType="submit" className="notification-button">
            Send Notification
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendNotificationForm;
