import Screen from "@/components/Screen";
import { View } from "@/components/Themed";
import { Pressable, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import TypoGraphy from "@/components/custom/TypoGraphy";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat, SaveOptions } from 'expo-image-manipulator';
import { useRouter } from "expo-router";
import { Camera } from 'expo-camera';
import { useCallback} from "react";
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import RecentImage from "@/components/custom/RecentImage";
import Feature from "@/components/custom/Feature";
import { useTranslation } from 'react-i18next';


const styles = StyleSheet.create({
    logoContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

})

export default function App() {
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const router = useRouter()
    const { t } = useTranslation();

    const pickImage = useCallback(async function () {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality:1
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
        const saveOptions: SaveOptions = { format: SaveFormat.PNG, compress: 0.9 };
        const manipulateImg = await manipulateAsync(image.uri, [{ resize: { width: 300 } }], saveOptions);
        const baseURL = '/emotion';
        const params = new URLSearchParams({ uri: manipulateImg.uri, width: `${manipulateImg.width}`, height: `${manipulateImg.height}` });
        const url = `${baseURL}?${params}`;
        router.navigate(url)
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
        <TypoGraphy varient="h1">{t('screens.home.text.EmoBot AI Emotion Detector')}</TypoGraphy>
        <TypoGraphy varient="h2">{t('screens.home.text.What are you waiting for?')}</TypoGraphy>
        <Feature pickImage={pickImage} handleCamera={handleCamera}></Feature>
        <View style={{ backgroundColor: 'transparent', marginVertical: 5 }}>
            <TypoGraphy varient="h1">{t('screens.home.text.Recent Images')}</TypoGraphy>
        </View>
        <RecentImage postImage={postImage} />
    </Screen>
}