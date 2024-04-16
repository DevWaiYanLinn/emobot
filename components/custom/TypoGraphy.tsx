import React, { memo } from "react";
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    'h1': { color: 'white', fontSize: 25, fontWeight: '400' },
    'h2': { color: 'white', fontSize: 15, fontWeight: '300' }})


export default memo(({ children, varient }: { children: React.ReactNode, varient: 'h1' | 'h2' }) => {
    return <Text style={styles[varient]}>{children}</Text>
})