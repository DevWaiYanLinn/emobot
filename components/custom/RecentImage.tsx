import { memo, useCallback, useEffect, useState } from "react"
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import * as MediaLibrary from 'expo-media-library';
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';


const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
    imageBox: { padding: 15, width: '33.33%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },

})

export default memo(({ postImage }: { postImage: (image: MediaLibrary.Asset | ImagePicker.ImagePickerAsset) => void }) => {
    const [photos, setPhotos] = useState<Array<MediaLibrary.Asset>>([]);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAssets()
            .then(() => {
                setRefreshing(false)
            });
    }, [])

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

    useEffect(() => {
        getAssets();
    }, [])

    return <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
    }>
        <View style={styles.container}>
            {photos.map((p: MediaLibrary.Asset) => {
                return <View key={p.id} style={styles.imageBox}>
                    <Pressable style={{ width: '100%' }} onPress={() => { postImage(p) }}>
                        <Image source={p.uri}
                            style={{ width: '100%', height: 100 }}
                            contentFit="cover"
                            transition={1000} placeholder={'image'}></Image>
                    </Pressable>
                </View>
            })}
        </View>
    </ScrollView>
})
