module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/notifications/send-targeted',
        handler: 'notification.sendTargetedNotification',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
