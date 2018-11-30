import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { } from 'front.core';
// import {  } from '../../front.core';
// import 'reflect-metadata';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { syncHistoryWithStore } from 'mobx-react-router';
// import { Router } from 'react-router';
// import { Route } from 'react-router-dom';
// import { container } from './diContainer';
//
// import { PrivateRoute, SwitchWithNotFound } from 'front.core/lib/containers';
// import {
//   INotification,
//   INotificationsStore,
//   NotificationsStoreType,
//   RouterStoreType,
// } from 'front.core';
//
// const browserHistory = createBrowserHistory();
// const history = syncHistoryWithStore(browserHistory, container.get(RouterStoreType));
// const notificationStore = container.get<INotificationsStore>(NotificationsStoreType);
// // function notifyMe(notification: string) {
// //   if (!('Notification' in window)) return;
// //   if (Notification.permission === 'granted') {
// //     new Notification(notification);
// //   } else if (Notification.permission !== 'denied') {
// //     Notification.requestPermission().then((permission: string) => {
// //       if (permission === 'granted') {
// //         new Notification(notification);
// //       }
// //     });
// //   }
// // }
//
// notificationStore.initNotifications(({ type, body }: INotification) => {
//   console.log(type, body);
// });


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!!!</Text>
        <Text style={styles.instructions}>To get started, edit App.js!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
