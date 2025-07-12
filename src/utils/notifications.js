import notifee from '@notifee/react-native';

export const setupNotificationChannel = async () => {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'default',
    importance: notifee.AndroidImportance.HIGH,
  });
};

export const sendLocalNotification = async (title, body) => {
  console.log('Sending notification:', { title, body });
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default',
      smallIcon: 'ic_stat_timer',
    },
  });
  console.log('Notification sent');
};
