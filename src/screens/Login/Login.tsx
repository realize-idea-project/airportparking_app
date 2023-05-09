import React, { FC, useState } from 'react';
import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import _ from 'lodash';
import parkinglotImage from '../../assets/parkinglot.jpg';

import { login } from '../../apis';
import { alertMessages, globalTextString } from '../DailyChart/constants';
import { noticeAlert } from '../../utils';
import { CustomNavigationType } from '../../navigations';
import { LoadingSpinner } from '../../components/Spinner';

interface Props {
  navigation: CustomNavigationType<'DatePicker', 'navigation'>;
}

const Login: FC<Props> = ({ navigation }) => {
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [showLoading, setShowLoading] = useState(false);

  const clickLogin = async () => {
    try {
      // 유효성 검사
      if (_.isNil(id) || _.isNil(pw)) {
        noticeAlert({ title: globalTextString.login, message: alertMessages.wrongIdAndPw });
        return;
      }

      // api 호출
      setShowLoading(true);
      const res = await login(id, pw);
      setShowLoading(false);

      if (!res) {
        noticeAlert({ title: globalTextString.login, message: alertMessages.failLogin });
        return;
      }

      navigation.replace('DatePicker');
    } catch (e) {
      console.error(e);
      noticeAlert({ title: globalTextString.login, message: alertMessages.failLogin });
    }
  };

  const changeId = (text: string) => {
    setId(text);
  };

  const changePw = (text: string) => {
    setPw(text);
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={parkinglotImage} style={styles.background} resizeMode="contain" />
        <View style={styles.board}>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.text}>주차 대행 어플 로그인</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>아이디</Text>
            </View>
            <TextInput style={styles.input} onChangeText={changeId} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>비밀번호</Text>
            </View>
            <TextInput style={styles.input} onChangeText={changePw} />
          </View>

          <Pressable style={styles.buttonContainer} onPress={clickLogin}>
            <Text style={[styles.text, { color: 'white' }]}>로그인</Text>
          </Pressable>
        </View>
      </View>
      {showLoading && <LoadingSpinner />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    height: '100%',
  },
  board: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    width: 240,
    marginLeft: 10,
  },
  textContainer: {
    width: 80,
  },
  text: {
    fontSize: 20,
  },
  buttonContainer: {
    width: 200,
    paddingVertical: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
    borderRadius: 10,
  },
});

export default Login;