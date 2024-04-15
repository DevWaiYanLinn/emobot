import { FontAwesome } from "@expo/vector-icons"
import { memo } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

const styles = StyleSheet.create({
    feature: {
        marginHorizontal: -10,
        marginTop: 30,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
})

export default memo(({ handleCamera, pickImage }: { handleCamera: () => void, pickImage: () => void }) => {
    return <View style={styles.feature}>
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
})