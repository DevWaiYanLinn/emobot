import React, { memo } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";

export default memo(({ children }: { children: React.ReactNode }) => {
    return <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10, backgroundColor: 'black' }}>
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'}></StatusBar>
            {children}
        </View>
    </SafeAreaView>
})