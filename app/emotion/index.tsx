import Screen from "@/components/Screen";
import { Image } from "expo-image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useLocalSearchParams, } from "expo-router";

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

const Retangle = memo(function ({ retangle }: any) {
    return retangle.map((r: any, i: number) => {
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

const EmotionResult = memo(function ({ data }: any) {
    return Object.entries(data)
        .sort((a: any, b: any) => b[1] - a[1])
        .map(([key, value]: any) => {
            return <View key={key} style={styles.row}>
                <Text style={styles.cell}>{key}</Text>
                <Text style={styles.cell}>{Number(value).toFixed(2) + '%'}</Text>
            </View>
        })
})

export default function Emotion() {
    const [retangle, setRetangle] = useState([]);
    const params = useLocalSearchParams()
    const [faces, setFaces] = useState<any>({ data: [], status: 'PENDING', message: 'Detecting....' })
    const resizeImg = useMemo(() => {
        return { width: 250, height: (250 / Number(params.width)) * Number(params.height) }
    }, [])

    const fetchData = useCallback(async ({ signal }: any) => {
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
            const retangle = faces.map((d: any) => {
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
        <ScrollView>
            <View style={{ width: '100%', marginVertical: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[{ position: 'relative' }, resizeImg]}>
                    <Retangle retangle={retangle} />
                    <Image source={params.uri}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={1000} placeholder={'image'}></Image>
                </View>
            </View>
            {faces.status === 'PENDING' ? <Text style={{ color: 'white', textAlign: 'center' }}>{faces.message}</Text> : null}
            {faces.status === 'ERROR' ? <Text style={{ color: 'red', textAlign: 'center' }}>{faces.message}</Text> : null}
            {faces.data.map((data: any, i: any) => {
                return <View style={styles.table} key={i}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, { color: '#77a6b6' }]}>{'Face ' + (1 + i)}</Text>
                    </View>
                    <EmotionResult data={data['emotion']} />
                </View>
            })}
        </ScrollView>
    </Screen>
}