'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Custom controller to send a targeted notification.
   * 
   * @param {Object} ctx - The context object containing request and response.
   */
  async sendTargetedNotification(ctx) {
    try {
      const { text, studentIds } = ctx.request.body;

      if (!text || !studentIds || studentIds.length === 0) {
        return ctx.throw(400, 'Notification text and target students are required');
      }

      const notification = await strapi.services.notification.create({
        text,
        students: studentIds,
      });

      return ctx.send(notification);
    } catch (error) {
      console.error('Error sending targeted notification:', error);
      return ctx.throw(500, 'Internal server error');
    }
  },
};
