import React, { memo } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
        backgroundColor: 'black'
    }
})

export default ({ children }: { children: React.ReactNode }) => {
    return <SafeAreaView style={style.container}>
        <StatusBar barStyle={'light-content'} />
        {children}
    </SafeAreaView>
}