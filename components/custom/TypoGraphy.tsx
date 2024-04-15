import React, { memo } from "react";
import { Text } from "react-native";

const styleClasses = {
    'h1': { color: 'white', fontSize: 25, fontWeight: '200' },
    'h2': { color: 'white', fontSize: 15, fontWeight: '100' }
} as const

export default memo(({ children, varient }: { children: React.ReactNode, varient: 'h1' | 'h2' }) => {
    return <Text style={styleClasses[varient]}>{children}</Text>
})