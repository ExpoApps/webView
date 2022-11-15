import React from 'react';
import { SafeAreaView, Button, Text } from "react-native";
import { WebView } from 'react-native-webview';

export default function Picsmart() {
  const [customer, setCustomer] = React.useState('-');
  const viewRef = React.useRef();

  const postCustomer = () => viewRef.current.injectJavaScript('window.ReactNativeWebView.postMessage("this")');

  const toggleSidebar = () => {
    viewRef.current.injectJavaScript(`document.getElementById('toggle-sidebar').click()`);
  }
  const toggleCustomer = () => {
    viewRef.current.injectJavaScript('toggleCustomerType()');
    //viewRef.current.injectJavaScript(`window.location.reload();`);
    //viewRef.current.reload()
  }
  const toggleCart = () => {
    viewRef.current.injectJavaScript(`document.getElementsByClassName('sf-button sf-button--pure cart')[0].click()`);
  }
  function getCustomer(){
    console.log('pressed');
    return viewRef.current.injectJavaScript(
      `window.ReactNativeWebView.postMessage('a'))`
    )
  }

  /*function injectFunction(){
    return viewRef.current.injectJavaScript(
      `customerType = (customerType === "Public") ? "Private" : "Public"
      document.getElementById("h1_element").innerText = customerType;
      window.ReactNativeWebView.postMessage(customerType)`
    )
  }*/

  return (
    <SafeAreaView style={{ flex: 1, top: 50 }}>
      <Text>WebView data: {customer}</Text>
      <Button
        onPress={toggleSidebar}
        title="open sidebar"
      />
      <Button
        onPress={toggleCustomer}
        title="toggle customer"
      />
      <Button
        onPress={getCustomer}
        title="getCustomer"
      />
      <Button
        onPress={postCustomer}
        title="postCustomer"
      />
      <Button
        onPress={toggleCart}
        title="toggleCart"
      />
      <WebView 
        ref={viewRef}
        style={{ backgroundColor: 'lightgray' }}
        source={{ uri: 'https://app.stage.picsmart.se/' }} 
        onMessage={ event => {
          console.log("RECEIVED MESSAGE FROM WEBVIEW: " + event.nativeEvent.data);
          setCustomer(event.nativeEvent.data)
        }}
        javaScriptEnabledAndroid={ true }
        onLoadEnd={ postCustomer }
      />
    </SafeAreaView>
  );
}

