import { Fragment, memo } from "react"
import { Pressable, ScrollView, View } from "react-native"
import TypoGraphy from "./TypoGraphy"
import * as MediaLibrary from 'expo-media-library';
import { Image } from "expo-image";

export default memo(({ photos, postImage }: { photos: Array<MediaLibrary.Asset>, postImage: any }) => {
    return <Fragment>
        <View style={{ backgroundColor: 'transparent', marginVertical: 5 }}>
            <TypoGraphy varient="h1">Recent Images</TypoGraphy>
        </View>
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'transparent' }}>
                {photos.map((p: MediaLibrary.Asset, i: number) => {
                    return <View key={i} style={{ padding: 15, width: '33.33%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
    </Fragment>
})
