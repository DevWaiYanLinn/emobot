import Screen from "@/components/Screen";
import { Image } from "expo-image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useLocalSearchParams, } from "expo-router";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: '#77a6b6',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#77a6b6',
        padding: 10,
        color: 'white',
        textAlign: 'center',
    },
});

const Retangle = memo(function ({ retangle }: { retangle: Retangle[] }) {
    return retangle.map((r, i: number) => {
        return <View key={i}>
            <View style={
                {
                    position: 'absolute',
                    top: r.y - 20,
                    left: r.x,
                    zIndex: 1
                }}>
                <Text style={{ color: 'cyan' }}>{i + 1}</Text>
            </View>
            <View style={
                {
                    position: 'absolute',
                    top: r.y,
                    left: r.x,
                    width: r.w,
                    height: r.h,
                    borderWidth: 1,
                    borderColor: 'cyan',
                    zIndex: 1
                }}></View>
        </View>
    })

})

const EmotionResult = memo(function ({ data }: { data: Emotion }) {
    const { t } = useTranslation()
    return Object.entries(data)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .map(([key, value]: [string, number]) => {
            return <View key={key} style={styles.row}>
                <Text style={styles.cell}>{t('screens.emotion.text.' + key)}</Text>
                <Text style={styles.cell}>{value.toFixed(2) + '%'}</Text>
            </View>
        })
})


const Detect = function () {
    return <LottieView style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }} autoPlay loop source={require('@/lottie/scanning.json')}></LottieView>
}


export default function Emotion() {
    const [retangle, setRetangle] = useState<Retangle[]>([]);
    const { t } = useTranslation()
    const [faces, setFaces] = useState<Faces>({ data: [], status: 'PENDING', message: 'Detecting....' })
    const params = useLocalSearchParams()
    const resizeImg = useMemo(() => {
        return { width: 200, height: (200 / Number(params.width)) * Number(params.height) }
    }, [])

    const fetchData = useCallback(async ({ signal }: { signal: AbortSignal }) => {
        const formData = new FormData();
        formData.append('file', {
            uri: params.uri,
            type: 'image/jpeg',
            name: 'photo.jpeg',
            signal
        } as any)

        try {
            const serverApi = 'https://waiyanlynn-fast-api-emotion.hf.space/api/emotions'
            const localApi = 'http://192.168.99.139:8000/api/emotions'
            const res = await fetch(serverApi, {
                method: "post",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            const faces = await res.json()

            if (!res.ok) {
                throw Error('Not Faces')
            }

            const [imgW, imgH] = [Number(params.width), Number(params.height)]

            const retangle = faces.map((d: FaceData) => {
                const x = ((resizeImg.width / imgW) * d.region.x)
                const y = ((resizeImg.height / imgH) * d.region.y)
                const w = ((resizeImg.width / imgW) * d.region.w)
                const h = ((resizeImg.height / imgH) * d.region.h)
                return { x, y, w, h }
            })

            setRetangle(retangle)
            setFaces({ data: faces, status: 'SUCCESS', message: null })
        } catch (error: any) {
            setFaces({ data: [], status: 'ERROR', message: error?.message || 'Unknown Error' })
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchData({ signal })
        return () => {
            controller.abort()
        }
    }, [])

    return <Screen>
        <View style={{ width: '100%', marginVertical: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={[{ position: 'relative' }, resizeImg]}>
                <Retangle retangle={retangle} />
                {faces.status === 'PENDING'  ?  <Detect/>: null}
                <Image source={params.uri}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={1000} placeholder={'image'}></Image>
            </View>
        </View>
        {faces.status === 'ERROR' ? <Text style={{ color: 'red', textAlign: 'center' }}>{faces.message}</Text> : null}
        <ScrollView>
            {faces.data.map((data: FaceData, i: number) => {
                return <View style={styles.table} key={i}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, { color: '#77a6b6' }]}>{t('screens.emotion.text.face') + ' ' + (1 + i)}</Text>
                    </View>
                    <EmotionResult data={data.emotion} />
                </View>
            })}
        </ScrollView>
    </Screen>
}