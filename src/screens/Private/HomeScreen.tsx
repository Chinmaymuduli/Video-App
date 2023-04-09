import {Alert, Button, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit, {
  StreamFallbackOptions,
  RenderModeType,
  ChannelProfileType,
  ClientRoleType,
} from 'agora-rn-uikit';
import {APP_ID, TOKEN} from '../../security';
import {useNavigation} from '@react-navigation/native';
import {PrivateNavigationProps} from '../../types/AllRoutes';

const HomeScreen = () => {
  const navigation = useNavigation<PrivateNavigationProps>();
  const [videoCall, setVideoCall] = useState(false);
  const [isHost, setIsHost] = useState(true);
  const uid = 0;
  const connectionData = {
    appId: APP_ID,
    channel: 'my channel',
    token: TOKEN,
    uid: uid,
    mode: ChannelProfileType.ChannelProfileLiveBroadcasting,
    role: isHost
      ? ClientRoleType.ClientRoleBroadcaster
      : ClientRoleType.ClientRoleAudience,
    activeSpeaker: true,
    // dualStreamMode: StreamFallbackOptions.StreamFallbackOptionAudioOnly,

    styleProps: {
      iconSize: 30,
      theme: '#ffffffee',
      videoMode: {
        max: RenderModeType.RenderModeHidden,
        min: RenderModeType.RenderModeHidden,
      },
      overlayContainer: {
        backgroundColor: '#2edb8533',
        opacity: 1,
      },
      localBtnStyles: {
        muteLocalVideo: btnStyle,
        muteLocalAudio: btnStyle,
        switchCamera: btnStyle,
        endCall: {
          borderRadius: 0,
          width: 50,
          height: 50,
          backgroundColor: '#f66',
          borderWidth: 0,
        },
      },
      localBtnContainer: {
        backgroundColor: '#fff',
        bottom: 0,
        paddingVertical: 10,
        borderWidth: 4,
        borderColor: '#2edb85',
        height: 80,
      },
      maxViewRemoteBtnContainer: {
        top: 0,
        alignSelf: 'flex-end',
      },
      remoteBtnStyles: {
        muteRemoteAudio: remoteBtnStyle,
        muteRemoteVideo: remoteBtnStyle,
        remoteSwap: remoteBtnStyle,
        minCloseBtnStyles: remoteBtnStyle,
      },
      minViewContainer: {
        bottom: 80,
        top: undefined,
        backgroundColor: '#fff',
        borderColor: '#2edb85',
        borderWidth: 4,
        height: '26%',
      },
      minViewStyles: {
        height: '100%',
      },
      maxViewStyles: {
        height: '64%',
      },
      UIKitContainer: {height: '94%'},
    },
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      {videoCall && isHost ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={rtcCallbacks}
          styleProps={{
            videoMode: {
              max: RenderModeType.RenderModeHidden,
              min: RenderModeType.RenderModeHidden,
            },
            localBtnStyles: {
              endCall: {
                borderRadius: 100,
                width: 50,
                height: 50,
                backgroundColor: '#e43',
                borderWidth: 0,
                elevation: 3,
              },
              muteLocalAudio: {
                borderRadius: 100,
                width: 50,
                height: 50,
                borderWidth: 0,
                elevation: 3,
              },
              muteLocalVideo: {
                borderRadius: 100,
                width: 50,
                height: 50,
                borderWidth: 0,
                elevation: 3,
              },
              switchCamera: {
                borderRadius: 100,
                width: 50,
                height: 50,
                borderWidth: 0,
                elevation: 3,
              },
            },
            localBtnContainer: {
              bottom: -40,
              marginVertical: 30,
              height: 80,
            },
            maxViewStyles: {
              height: '100%',
              alignSelf: 'center',
              // marginBottom: 100,
              // width: '80%',
            },
            // iconSize: 30,
            // videoPlaceholderIcon:{
            //     s
            // }
          }}
        />
      ) : (
        <View style={styles.callButton}>
          <Button
            title="Start Call Ui Kit"
            onPress={() => setVideoCall(true)}
          />
          <View style={styles.btnContainer}>
            <Text>Audience</Text>
            <Switch
              onValueChange={switchValue => {
                setIsHost(switchValue);
                // if (joinSucceed) {
                //   leave();
                // }
              }}
              value={isHost}
            />
            <Text>Host</Text>
          </View>
        </View>
      )}

      {/* <View style={styles.callButton}>
        <Button
          title="Go Next"
          onPress={() => navigation.navigate('LiveStreamAgora')}
        />
      </View> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  callButton: {
    paddingHorizontal: 10,
  },
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
});

const remoteBtnStyle = {backgroundColor: '#2edb8555'};
const textStyle = {
  color: '#fff',
  backgroundColor: '#2edb85',
  fontWeight: '700',
  fontSize: 24,
  width: '100%',
  borderColor: '#2edb85',
  borderWidth: 4,
  textAlign: 'center',
  textAlignVertical: 'center',
};

const btnStyle = {
  borderRadius: 2,
  width: 40,
  height: 40,
  backgroundColor: '#2edb85',
  borderWidth: 0,
};

const startButton = {
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  height: '90%',
};
