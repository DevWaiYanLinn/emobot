import React, { memo } from "react"
import { View } from "react-native"

export default memo(({ children }: { children: React.ReactNode }) => {
    return <View>
        <View style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: '100%', height: '100%' }}>
            {children}
        </View>
    </View>
})