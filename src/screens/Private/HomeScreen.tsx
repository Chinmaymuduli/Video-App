import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit, {StreamFallbackOptions} from 'agora-rn-uikit';
import {APP_ID, TOKEN} from '../../security';

const HomeScreen = () => {
  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: '9119cbe70260464cb65e3d933bc0282b',
    channel: 'my channel',
    token: TOKEN,
    // mode:mode.LiveBroadcasting,
    // role:role.Broadcaster,
    activeSpeaker: true,
    dualStreamMode: StreamFallbackOptions.StreamFallbackOptionAudioOnly,
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
    LocalMuteAudio: (mute: string | undefined) => Alert.alert('Mute', mute),
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      {videoCall ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={{
            EndCall: () => setVideoCall(false),
          }}
          styleProps={
            {
              // UIKitContainer: {margin: 20},
              // videoMode:{
              //     max:VideoRenderMode.Hidden
              // }
              // localBtnStyles: {
              //   endCall: {
              //     borderRadius: 100,
              //     width: 50,
              //     height: 50,
              //     backgroundColor: '#e43',
              //     borderWidth: 0,
              //     elevation: 3,
              //   },
              // },
              // localBtnContainer: {
              //   bottom: -65,
              //   marginVertical: 30,
              //   height: 80,
              // },
              // maxViewStyles: {
              //   height: '75%',
              //   alignSelf: 'center',
              //   marginBottom: 100,
              //   width: '80%',
              // },
              // iconSize: 30,
              // videoPlaceholderIcon:{
              //     s
              // }
            }
          }
        />
      ) : (
        <View style={styles.callButton}>
          <Button
            title="Start Call Ui Kit"
            onPress={() => setVideoCall(true)}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  callButton: {
    paddingHorizontal: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
