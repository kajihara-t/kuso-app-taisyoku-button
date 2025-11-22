import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Animated, Dimensions, Linking, Platform, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { Config } from '../constants/Config';

const { width } = Dimensions.get('window');

export default function App() {
    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
        // Vibrate heavily
        Vibration.vibrate([0, 500, 200, 500]);
        // Open native dialer
        Linking.openURL(`tel:${Config.PHONE_NUMBER}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.warningStripes}>
                {/* Decorative stripes */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <View key={i} style={styles.stripe} />
                ))}
            </View>

            <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handlePress}
                    style={styles.button}
                >
                    <View style={styles.innerButton}>
                        <Text style={styles.buttonText}>退職</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Text style={styles.disclaimer}>※これはジョークアプリです。{"\n"}実際の退職代行には繋がりません。</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    warningStripes: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        transform: [{ rotate: '-45deg' }, { scale: 2 }],
        opacity: 0.1,
    },
    stripe: {
        width: 20,
        height: '100%',
        backgroundColor: '#ffd700',
        marginRight: 20,
    },
    title: {
        fontSize: 64,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 10,
        letterSpacing: 10,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff0000',
        marginBottom: 50,
        letterSpacing: 5,
        textTransform: 'uppercase',
    },
    buttonContainer: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: '#800000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        width: '90%',
        height: '90%',
        borderRadius: 1000,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#ff4444',
    },
    buttonText: {
        fontSize: 40,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 2,
    },
    disclaimer: {
        position: 'absolute',
        bottom: 40,
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
    },
});
