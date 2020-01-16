import React from 'react';
import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview'


export default function Profile({ navigation }) {
  const github_username = navigation.getParam('github_username');

  return (
    <WebView style={styles.webview} source={{uri: `https://github.com/${github_username}`}} />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1
  }
})