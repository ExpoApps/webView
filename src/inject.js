import React from 'react';
import { SafeAreaView, Button, Text } from "react-native";
import { WebView } from 'react-native-webview';

export default function Inject() {
  const [customer, setCustomer] = React.useState('-');
  const viewRef = React.useRef();
  const customHTML = `
    <body>
      <h1>WebView</h1>
      <h2>customerType: <span id="h1_element"></span></h2>
      <script>
        let customerType = "Public"
        function toggle(){
          customerType = (customerType === "Public") ? "Private" : "Public"
          document.getElementById("h1_element").innerText = customerType;
        }
        toggle()
      </script>
    </body>
  `;

  const postCustomer = () => viewRef.current.injectJavaScript('window.ReactNativeWebView.postMessage(customerType)');

  const toggleCustomer = () => {
    viewRef.current.injectJavaScript('toggle()');
    postCustomer();
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
        onPress={toggleCustomer}
        title="toggle webView data"
      />
      <WebView 
        ref={viewRef}
        style={{ backgroundColor: 'lightgray' }}
        source={{ uri: 'http://127.0.0.1:5500/src/inject.html' }} 
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

