import { StyleSheet, TouchableOpacity, useWindowDimensions, View, StatusBar } from "react-native";
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    camera: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    controlArea: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    cameraButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#353839',
        borderRadius: 100
    },
    flipButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#232b2b',
        borderRadius: 100
    }
});

export default function Camera() {
    const [type, setType] = useState(CameraType.back);
    const { width } = useWindowDimensions();
    const height = Math.round((width * 4) / 3)
    const cameraRef = useRef<ExpoCamera>(null);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
        if (cameraRef?.current) {
            const picture = await cameraRef.current.takePictureAsync()
            cameraRef.current.pausePreview()
            const compress = await manipulateAsync(picture.uri, [{ resize: { width: picture.width / 0.7 } }], { format: SaveFormat.JPEG, compress: 0.7 });
            const baseURL = '/emotion';
            const params = new URLSearchParams({ uri: compress.uri, width: `${compress.width}`, height: `${compress.height}` });
            const url = `${baseURL}?${params}`;
            router.replace(url as any)
        }
    }

    return <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
        <ExpoCamera style={[styles.camera, { height: height, width: '100%', position: 'relative' }]} type={type} ref={cameraRef} ratio={'4:3'} >
        </ExpoCamera>
        <View style={styles.controlArea}>
            <TouchableOpacity onPress={toggleCameraType} style={styles.flipButton}>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.cameraButton}>
                <Ionicons name="camera" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
                <MaterialIcons name="flip-camera-android" size={30} color="white" />
            </TouchableOpacity>
        </View>
    </View>
}