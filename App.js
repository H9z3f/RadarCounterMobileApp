import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';

import RadarCounter from './RadarCounter';

export default function App() {
    return (
        <PaperProvider>
            <RadarCounter/>
            <StatusBar style="auto"/>
        </PaperProvider>
    );
}
