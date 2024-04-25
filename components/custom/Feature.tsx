import { FontAwesome } from "@expo/vector-icons"
import { memo } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

const styles = StyleSheet.create({
    feature: {
        marginHorizontal: -10,
        marginTop: 10,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    button: {
        flex: 1,
        height: 180,
        padding: 10
    },

    buttonStyle: {
        borderRadius: 10,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
})

export default memo((
    { handleCamera, pickImage }: { handleCamera: () => void, pickImage: () => void }) => {
    return <View style={styles.feature}>
        <TouchableOpacity onPress={handleCamera} style={styles.button}>
            <View style={[styles.buttonStyle, { backgroundColor: '#4d7298' }]}>
                <FontAwesome name="camera-retro" size={35} color={'white'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
            <View style={[styles.buttonStyle, { backgroundColor: '#77a6b6' }]}>
                <FontAwesome name="photo" size={35} color={'white'} />
            </View>
        </TouchableOpacity>
    </View>
})