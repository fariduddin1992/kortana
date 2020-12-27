import React, {useEffect} from 'react';
import {
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
 
import Kontakt, {KontaktModule} from 'react-native-kontaktio';
const {connect, init, startDiscovery, startScanning} = Kontakt;
 
const kontaktEmitter = new NativeEventEmitter(KontaktModule);
 
const isAndroid = Platform.OS === 'android';
 
/**
 * Android Marshmallow (6.0) and above need to ask the user to grant certain permissions.
 * This function does just that.
 */
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This example app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      // permission denied
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
 
const beaconSetup = async () => {
  if (isAndroid) {
    // Android
    const granted = await requestLocationPermission();
    if (granted) {
      await connect();
      await startScanning();
    } else {
      Alert.alert(
        'Permission error',
        'Location permission not granted. Cannot scan for beacons',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  } else {
    // iOS
    await init();
    await startDiscovery();
  }
 
  // Add beacon listener
  if (isAndroid) {
    DeviceEventEmitter.addListener('beaconsDidUpdate', ({beacons, region}) => {
      console.log('beaconsDidUpdate', beacons, region);
    });
  } else {
    kontaktEmitter.addListener('didDiscoverDevices', ({beacons}) => {
      console.log('didDiscoverDevices', beacons);
    });
  }
};
const Tab = createBottomTabNavigator();

function HomeTabs(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DashboardStackScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      

      

     
      
      
    </Tab.Navigator>
  );
}
const App = () => {

  useEffect(() => {
    beaconSetup();
  }, []);
 
  return (
    <>
       <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar backgroundColor="#4787F5" />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name="Home" component={HomeTabs} />
          <RootStack.Screen name="login" component={Login} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* <IappsNetInfo /> */}
      <FlashMessage position="top" />
    </ApplicationProvider>
    </>
  );
};
 
export default App;