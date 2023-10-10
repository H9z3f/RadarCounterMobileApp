import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: "#fff",
    },
    main: {
        paddingHorizontal: "5%",
    },
    switchGroup: {
        paddingVertical: "3%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonGroup: {
        paddingVertical: "5%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    leftButton: {
        width: "50%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
    },
    rightButton: {
        width: "50%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 5,
    },
    formula: {
        paddingVertical: "5%",
        alignItems: "center",
    },
    image: {
        height: 75,
    },
    modal: {
        margin: "5%",
        padding: "5%",
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    radioButton: {
        paddingHorizontal: 0,
    },
    selectSection: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "#c8c8c8",
        borderBottomColor: "#c8c8c8",
    },
    appbar: {
        borderBottomWidth: 1,
        borderBottomColor: "#c8c8c8",
    },
});
