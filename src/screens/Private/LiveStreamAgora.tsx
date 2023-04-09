import {
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RtcEngine, {
  //   RtcLocalView,
  //   RtcRemoteView,
  //   VideoRenderMode,
  //   ClientRole,
  //   ChannelProfile,
  RtcSurfaceView,
  IRtcEngine,
  ClientRoleType,
  ChannelProfileType,
  createAgoraRtcEngine,
} from 'react-native-agora';
import {APP_ID, TOKEN} from '../../security';
import requestCameraAndAudioPermission from '../../components/Permission';
//   import {createAgoraRtcEngine} from 'react-native-agora';

const LiveStreamAgora = () => {
  const [isHost, setIsHost] = useState(true);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState<any>([]);
  const [remoteUid, setRemoteUid] = useState(0);
  const agoraEngineRef = useRef<IRtcEngine>();
  const token = TOKEN;
  const appId = APP_ID;
  const channelName = 'my channel';
  const uid = 0;

  const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

  useEffect(() => {
    init();
  }, []);

  // video function start

  const init = async () => {
    try {
      if (Platform.OS === 'android') {
        // Request required permissions from Android
        requestCameraAndAudioPermission().then(() => {
          console.log('requested!');
        });
      }
      // const engine = createAgoraRtcEngine();
      agoraEngineRef.current = createAgoraRtcEngine();
      const engine = agoraEngineRef.current;
      engine.initialize({appId: appId});
      engine.enableVideo();
      engine.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      engine.setClientRole(
        isHost
          ? ClientRoleType.ClientRoleBroadcaster
          : ClientRoleType.ClientRoleAudience,
      );
      engine.addListener('onActiveSpeaker', (uid, elapsed) => {
        console.log(`User ${uid} joined the channel.`);
      });

      engine.addListener('onError', (err: any) => {
        console.log('Warning', err);
      });
      engine.addListener('onUserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);

        // If new user
        if (peerIds.indexOf(uid) === -1) {
          setPeerIds([...peerIds, uid]);
        }
      });
      engine.addListener('onUserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason);
        setPeerIds(peerIds.filter((id: any) => id !== uid));
      });
      engine.addListener('onJoinChannelSuccess', (channel: any, uid: any) => {
        console.log('JoinChannelSuccess', channel, uid);
        // Set state variable to true
        setJoinSucceed(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const startCall = async () => {
  //   // Join Channel using null token and channel name
  //   engine.joinChannel(token, channelName, null, 0);
  // };
  const join = async () => {
    if (joinSucceed) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const endCall = async () => {
  //   engine.leaveChannel();

  //   setPeerIds([]), setJoinSucceed(false);
  // };
  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setJoinSucceed(false);
      console.log('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(RtcEngine);

  // const renderVideo = () => {
  //   joinSucceed ? (
  //     <View style={styles.fullView}>
  //       {isHost ? (
  //         //   <RtcLocalView.SurfaceView
  //         //     style={styles.max}
  //         //     channelId={channelName}
  //         //     renderMode={VideoRenderMode.Hidden}
  //         //   />
  //         <Text>Test</Text>
  //       ) : (
  //         <></>
  //       )}
  //       {/* {this._renderRemoteVideos()} */}
  //     </View>
  //   ) : null;
  // };

  // _renderVideos = () => {
  //     const { joinSucceed } = this.state;
  //     return joinSucceed ? (
  //     <View style={styles.fullView}>
  //       {this.state.isHost ? (
  //         <RtcLocalView.SurfaceView
  //           style={styles.max}
  //           channelId={channelName}
  //           renderMode={VideoRenderMode.Hidden}
  //         />
  //       ) : (
  //         <></>
  //       )}
  //       {this._renderRemoteVideos()}
  //     </View>
  //   ) : null;
  //   };

  //   _renderRemoteVideos = () => {
  //     const { peerIds } = this.state;
  //     return (
  //       <ScrollView
  //         style={styles.remoteContainer}
  //         contentContainerStyle={styles.remoteContainerContent}
  //         horizontal={true}
  //       >
  //         {peerIds.map((value) => {
  //           return (
  //             <RtcRemoteView.SurfaceView
  //               style={styles.remote}
  //               uid={value}
  //               channelId={channelName}
  //               renderMode={VideoRenderMode.Hidden}
  //               zOrderMediaOverlay={true}
  //             />
  //           );
  // })}

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>
        Agora Interactive Live Streaming Quickstart
      </Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Text>Audience</Text>
        <Switch
          onValueChange={switchValue => {
            setIsHost(switchValue);
            if (joinSucceed) {
              leave();
            }
          }}
          value={isHost}
        />
        <Text>Host</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {joinSucceed && isHost ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>{isHost ? 'Join a channel' : ''}</Text>
        )}
        {joinSucceed && !isHost && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>
            {joinSucceed && !isHost ? 'Waiting for a remote user to join' : ''}
          </Text>
        )}
        <Text style={styles.info}>{'message'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveStreamAgora;
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 700},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});

// const styles = StyleSheet.create({
//   max: {
//     flex: 1,
//   },
//   buttonHolder: {
//     height: 100,
//     alignItems: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#0093E9',
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: '#fff',
//   },
//   fullView: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height - 100,
//   },
//   remoteContainer: {
//     width: '100%',
//     height: 150,
//     position: 'absolute',
//     top: 5,
//   },
//   remoteContainerContent: {
//     paddingHorizontal: 2.5,
//   },
//   remote: {
//     width: 150,
//     height: 150,
//     marginHorizontal: 2.5,
//   },
//   noUserText: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     color: '#0093E9',
//   },
//   roleText: {
//     textAlign: 'center',
//     fontWeight: '700',
//     fontSize: 18,
//   },
// });
