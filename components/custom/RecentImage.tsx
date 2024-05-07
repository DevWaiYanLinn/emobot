import { memo, useCallback, useEffect, useState } from "react"
import { Pressable, StyleSheet, View, FlatList } from "react-native"
import * as MediaLibrary from 'expo-media-library';
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import Box from "./Box";


const styles = StyleSheet.create({
    imageBox: {
        padding: 10,
        width: '33.33%',
    },
})

const RecentImage = memo(({ postImage }: { postImage: (image: MediaLibrary.Asset | ImagePicker.ImagePickerAsset) => void }) => {
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

    return <FlatList numColumns={3}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={item => item.id}
        data={photos}
        renderItem={
            ({ item }) => <Pressable style={styles.imageBox} onPress={() => { postImage(item) }}>
                <Box>
                    <Image source={item.uri}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={100} placeholder={'image'}></Image>
                </Box>
            </Pressable>
        } />
})


export default RecentImage


// return <ScrollView refreshControl={
//     <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
// }>
//     <View style={styles.container}>
//         {photos.map((p: MediaLibrary.Asset) => {
//             return <View key={p.id} style={styles.imageBox}>
//                 <Pressable style={{ width: '100%' }} onPress={() => { postImage(p) }}>
//                     <Image source={p.uri}
//                         style={{ width: '100%', height: 100 }}
//                         contentFit="cover"
//                         transition={300} placeholder={'image'}></Image>
//                 </Pressable>
//             </View>
//         })}
//     </View>
// </ScrollView >