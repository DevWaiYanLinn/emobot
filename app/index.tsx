import Screen from "@/components/Screen";
import { View } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import TypoGraphy from "@/components/custom/TypoGraphy";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat, SaveOptions } from 'expo-image-manipulator';
import { useRouter } from "expo-router";
import { Camera } from 'expo-camera';
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import RecentImage from "@/components/custom/RecentImage";
import Feature from "@/components/custom/Feature";

const styles = StyleSheet.create({
    logoContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

})

export default function App() {
    const [photos, setPhotos] = useState<Array<MediaLibrary.Asset>>([]);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const router = useRouter()

    const pickImage = useCallback(async function () {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false
        });

        if (!result.canceled) {
            postImage(result.assets[0])
        }
    }, [])

    const handleCamera = useCallback(function () {
        if (cameraPermission?.status !== 'granted') {
            requestCameraPermission()
        }
        router.navigate('/camera')
    }, [])

    const postImage = useCallback(async (image: MediaLibrary.Asset | ImagePicker.ImagePickerAsset) => {
        const saveOptions: SaveOptions = { format: SaveFormat.JPEG, compress: 0.7 };
        const manipulateImg = await manipulateAsync(image.uri, [], saveOptions);
        const baseURL = '/emotion';
        const params = new URLSearchParams({ uri: manipulateImg.uri, width: `${manipulateImg.width}`, height: `${manipulateImg.height}` });
        const url = `${baseURL}?${params}`;
        router.navigate(url)
    }, [])


    useEffect(() => {
        async function getAssets() {
            if (permissionResponse?.status !== 'granted') {
                await requestPermission();
            }
            const getPhotos = await MediaLibrary.getAssetsAsync(
                {
                    mediaType: MediaLibrary.MediaType.photo,
                    first: 50,
                    sortBy: MediaLibrary.SortBy.default
                });
            setPhotos(getPhotos.assets)
        }
        getAssets();
    }, [])

    return <Screen>
        <View style={styles.logoContainer}>
            <Image
                source={require('../assets/logo/emoBot.png')}
                style={{ width: 130, height: 130 }}
                transition={1000}
                placeholder={'emo-bot'} />
            <Pressable onPress={() => { router.push('/setting/') }}>
                <Ionicons name="settings-outline" size={30} color="white" style={{ margin: 10 }} />
            </Pressable>
        </View>
        <TypoGraphy varient="h1">EmoBot AI Emotion Detector</TypoGraphy>
        <TypoGraphy varient="h2">What are you waiting for?</TypoGraphy>
        <Feature pickImage={pickImage} handleCamera={handleCamera}></Feature>
        <RecentImage photos={photos} postImage={postImage} />
    </Screen>
}