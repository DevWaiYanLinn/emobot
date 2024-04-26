import Screen from "@/components/custom/Screen";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Text, View } from "react-native";
import Markdown from 'react-native-markdown-display';


const markdonText = `
# EmoBot - Emotion Detection & Camera App

**Description:**
EmoBot is a cutting-edge emotion detection and camera application designed to bring a new dimension to your photo capturing experience. Powered by Python backend and crafted with React Native for Android, EmoBot offers unparalleled features that cater to both fun and functionality.

**Key Features:**
- **Multi-Face Emotion Detection:** EmoBot employs advanced facial recognition technology to detect multiple faces within a photo. With lightning-fast processing, it accurately analyzes each face and reveals the emotions portrayed.
- **Real-time Emotion Feedback:** Witness the power of AI as EmoBot instantly identifies and displays the emotions of each detected face. Whether it's a joyful smile or a thoughtful gaze, EmoBot provides real-time feedback on the emotional expressions captured in your photos.
- **Integrated Camera Feature:** Seamlessly switch between capturing moments and analyzing emotions with EmoBot's integrated camera feature. Take photos directly within the app and witness the magic of emotion detection unfold right before your eyes.
- **Language Localization:** EmoBot caters to a global audience with language localization support for both Japanese (日本語) and English. Choose your preferred language and navigate through the app effortlessly, ensuring an inclusive user experience for all.

**How to Use:**
1. Open EmoBot and access the camera feature.
2. Capture a photo containing faces you want to analyze.
3. EmoBot will automatically detect and analyze the emotions of each face within the photo.
4. View the detailed emotion feedback for each detected face, including happiness, sadness, anger, surprise, and more.
5. Share your emotionally enriched photos with friends and family, or save them for later.

Experience the future of photography with EmoBot - where emotions come to life through the lens of innovation. Download now and explore the fascinating world of emotion detection technology!

**GitHub Repository:** [EmoBot GitHub Repository](https://github.com/DevWaiYanLinn/emobot)

*Note: For the latest updates and contributions, visit our GitHub repository. Feel free to contribute, provide feedback, or report any issues to help us enhance your EmoBot experience.*
`


export default function Setting() {
    const { i18n } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(() => {
        return i18n.language !== 'en'
    });
    const toggleSwitch = () => {
        i18n.changeLanguage(!isEnabled ? 'jp' : 'en')
        setIsEnabled(prev => !prev)
    };
    return <Screen>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.2, borderBlockColor: 'white' }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Japanese</Text>
            <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                thumbColor={'white'}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    </Screen>
}