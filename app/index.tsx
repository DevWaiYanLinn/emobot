import Screen from "@/components/Screen";
import { View } from "@/components/Themed";
import { Pressable, ScrollView, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import TypoGraphy from "@/components/utility/TypoGraphy";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useRouter } from "expo-router";
import { Camera } from 'expo-camera';
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
    const [photos, setPhotos] = useState<any>([]);
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const router = useRouter()

    const handleCamera = useCallback(function () {
        if (cameraPermission?.status !== 'granted') {
            requestCameraPermission()
        }
        router.navigate('/camera')
    }, [])


    const prepareImage = useCallback(async (image: any) => {
        const saveOptions = { format: SaveFormat.JPEG, compress: 0.7 } as any;
        const manipulateImg = await manipulateAsync(image.uri, [], saveOptions);
        const baseURL = '/emotion';
        const params = new URLSearchParams({ uri: manipulateImg.uri, width: `${manipulateImg.width}`, height: `${manipulateImg.height}` });
        const url = `${baseURL}?${params}`;
        router.navigate(url)
    }, [])

    const pickImage = useCallback(async function () {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false
        });

        if (!result.canceled) {
            prepareImage(result.assets[0])
        }
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
        <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
                source={require('../assets/logo/emoBot.png')}
                style={{ width: 130, height: 130 }}
                transition={1000}
                placeholder={'emo-bot'} />
            <Pressable onPress={() => { router.push('/setting/') }}><Ionicons name="settings-outline" size={30} color="white" style={{ margin: 10 }} /></Pressable>
        </View>
        <TypoGraphy varient="h1">EmoBot AI Emotion Detector</TypoGraphy>
        <TypoGraphy varient="h2">What are you waiting for?</TypoGraphy>
        <View style={{ marginHorizontal: -10, marginTop: 30, flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
            <TouchableOpacity onPress={handleCamera} style={{ flex: 1, height: 180, padding: 10 }}>
                <View style={{ borderRadius: 10, backgroundColor: '#4d7298', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <FontAwesome name="camera-retro" size={35} color={'white'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, height: 180, padding: 10 }} onPress={pickImage}>
                <View style={{ borderRadius: 10, backgroundColor: '#77a6b6', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <FontAwesome name="photo" size={35} color={'white'} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'transparent', marginVertical: 5 }}>
            <TypoGraphy varient="h1">Recent Images</TypoGraphy>
        </View>
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'transparent' }}>
                {photos.map((p: any, i: number) => {
                    return <View key={i} style={{ padding: 15, width: '33.33%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <Pressable style={{ width: '100%' }} onPress={() => { prepareImage(p) }}>
                            <Image source={p.uri}
                                style={{ width: '100%', height: 100 }}
                                contentFit="cover"
                                transition={1000} placeholder={'image'}></Image>
                        </Pressable>
                    </View>
                })}
            </View>
        </ScrollView>
    </Screen>
}