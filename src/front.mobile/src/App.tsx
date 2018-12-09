// tslint:disable:jsx-no-lambda
import 'reflect-metadata';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { container } from './diContainer';

import createMemoryHistory from 'history/createMemoryHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { SwitchWithNotFound } from 'front.core/lib/containers';
import { RouterStoreType } from 'front.core';

const memoryHistory = createMemoryHistory();
const history = syncHistoryWithStore(memoryHistory, container.get(RouterStoreType));

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

export default class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <SwitchWithNotFound notFound={() => <Text>Not found!</Text>}>
          <Route path="/" component={App} />
        </SwitchWithNotFound>
      </Router>
    );
  }
}

export const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to React Native!!!</Text>
    <Text style={styles.instructions}>To get started, edit App.js!</Text>
    <Text style={styles.instructions}>{instructions}</Text>
  </View>
);

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
