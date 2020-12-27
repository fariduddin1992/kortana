import React, {useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
  Image,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import headerbg from '../../User/images/headerbg.png';
import {Input, Button} from '@ui-kitten/components';
import GlobalStyles from '../../Master/styles/GlobalStyles';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {inputAddHandling, loginAction} from '../actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import AppVersion from '../../Master/components/help/AppVersion';
import {
  changeLanguage,
  getLocalizedLanguage,
} from '../../Master/action/LanguageAction';
import {translate} from '../../Master/translations/Localization';

import en from '../images/en.png';
import bn from '../images/bn.png';

const Login = (props) => {
  const [value, setValue] = React.useState('');
  const [langValue, setlangValue] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const refPasswordInput = useRef(null);

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const lang = useSelector((state) => state.lang.lang);

  // const authState = useSelector((state) => state.auth);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const inputData = useSelector((state) => state.login.inputData);
  const handleInputChange = (inputName, inputValue) => {
    dispatch(inputAddHandling(inputName, inputValue));
  };



 







  return (
    <KeyboardAvoidingView style={[GlobalStyles.whiteBg, styles.fullHeight]}>
      <ScrollView>
        <View>
          <View style={[styles.container]}>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                name="username"
                onChangeText={(value) => handleInputChange('username', value)}
                value={inputData.username}
               
                returnKeyType={'next'}
                onSubmitEditing={() => refPasswordInput.current.focus()}
              />
            </View>
            <View>
              <Input
                style={[styles.logInputStyle]}
                size="large"
                value={inputData.password}
                name="password"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                ref={refPasswordInput}
                returnKeyType={'go'}
                onChangeText={(value) => handleInputChange('password', value)}
                onSubmitEditing={() => handleSubmit()}
              />
            </View>
            <View>
            
                <Button
                  style={styles.button}
                  size="large"
                  onPress={() => handleSubmit()}>
                  {translate('login', lang)}
                </Button>
            

             
            </View>
           
          </View>
          <View style={{flex: 1, marginTop: 50}}>
            <Text style={[styles.devlopby]}>
              Developed By AITL <AppVersion />
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  fullHeight: {
    height: height,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 45,
  },
  loginMessage: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6ED899',
    fontSize: RFPercentage(2.6),
    color: '#44CA7B',
  },
  loginErrorMessage: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F47E43',
    fontSize: RFPercentage(2.6),
    color: 'red',
  },
  headerbg: {
    marginTop: -40,
    width: width,
    height: height / 2.5,
  },
  postionbox: {
    position: 'relative',
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    // textTransform: 'uppercase',
    paddingVertical: 10,
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: RFPercentage(2),
  },
  headTitle: {
    color: '#000',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingBottom: 20,
    marginTop: 10,
  },

  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    fontSize: RFPercentage(2.5),
  },

  forget: {
    color: '#1E2E40',
    fontSize: RFPercentage(2.5),
    textAlign: 'right',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  button: {
    borderRadius: 50,
    marginTop: 15,
    backgroundColor: '#147AD6',
  },

  langButton: {
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    opacity: 0.9,
    width: 110,
    marginRight: 10,
    position: 'absolute',
    right: 0,
    top: Platform.OS === 'ios' ? 50 : 0,
    zIndex: 1000,
  },

  devlopby: {
    color: '#1B2662',
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    paddingVertical: 30,
    fontWeight: 'bold',
  },
  loginstyle: {
    fontSize: 22,
    color: 'gray',
    textAlign: 'center',
  },
  signinstyle: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',

    marginLeft: -30,
  },
});
export default Login;
