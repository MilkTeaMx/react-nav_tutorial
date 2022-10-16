import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {MaterialIcons} from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const themecolor = '#fff'
const tabcolor = '#28407E'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-center",
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    greeting : {
        marginTop: 32,
        fontSize: 24,
        fontWeight: "400",
        textAlign: "center",
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        justifyContent: "flex-end",
    },
    inputTitle: {
        color: '#8A8F9E',
        textTransform: "uppercase",
        fontSize: 14
    },
    input: {
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 24,
        color: "#161F3D",
        justifyContent: "flex-end",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: `${tabcolor}`,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: "#E9446A",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,01)",
        alignItems: "center",
        justifyContent: "center"
    }
});