import { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from 'react';

const styles = StyleSheet.create({
    box: {
        height: 0,
        paddingBottom: '100%',
        position: 'relative',
    },
    child: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default memo(({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) => {
    return <View style={style}>
        <View style={styles.box}>
            <View style={styles.child}>
                {children}
            </View>
        </View>
    </View>
})