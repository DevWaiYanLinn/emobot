import React, { memo } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";

export default memo(({ children }: { children: React.ReactNode }) => {
    return <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10, backgroundColor: 'black' }}>
        <StatusBar barStyle={'light-content'}></StatusBar>
        {children}
    </SafeAreaView>
})