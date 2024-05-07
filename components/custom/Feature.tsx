import { FontAwesome } from "@expo/vector-icons"
import { memo } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Box from "./Box"

const styles = StyleSheet.create({
    feature: {
        marginHorizontal: -8,
        marginTop: 10,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        flex: 1,
        padding: 8
    },
    button: {
        borderRadius: 10,
    }
})

const Feature = memo((
    { handleCamera, pickImage }: { handleCamera: () => void, pickImage: () => void }) => {
    return <View style={styles.feature}>
        <TouchableOpacity style={styles.touchable} onPress={handleCamera}>
            <Box style={[styles.button, { backgroundColor: '#4d7298' }]}>
                <FontAwesome name="camera-retro" size={35} color={'white'} />
            </Box>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={pickImage}>
            <Box style={[styles.button, { backgroundColor: '#77a6b6' }]}>
                <FontAwesome name="photo" size={35} color={'white'} />
            </Box>
        </TouchableOpacity>
    </View>
})

export default Feature