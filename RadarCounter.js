import React from 'react';
import {Image, View} from 'react-native';
import {Appbar, Button, Modal, Portal, RadioButton, Snackbar, Switch, Text, TextInput} from 'react-native-paper';

import styles from './styles';

import firstFormula from './assets/firstFormula.jpg';
import secondFormula from './assets/secondFormula.jpg';

export default function RadarCounter() {
    const [calculationType, setCalculationType] = React.useState("first");
    const [isVariableSwitchOn, setIsVariableSwitchOn] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [form, setForm] = React.useState({
        var1: "",
        var2: "",
        var3: "",
        var4: "",
        var5: "",
        var6: "",
    });

    const onToggleSwitch = () => {
        setIsVariableSwitchOn(!isVariableSwitchOn);
        setForm({
            ...form,
            var6: "",
        });
    };
    const showSnackbar = () => setSnackbarVisible(true);
    const hideSnackbar = () => setSnackbarVisible(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const calculateForm = () => {
        if (!isVariableSwitchOn && (!form.var1 || !form.var2 || !form.var3 || !form.var4 || !form.var5 || form.var5 === "0" || form.var6 === "0")) return showSnackbar();
        if (isVariableSwitchOn && (!form.var1 || !form.var2 || !form.var3 || !form.var4 || !form.var5 || !form.var6 || form.var5 === "0" || form.var6 === "0")) return showSnackbar();

        let object = {};
        for (let key in form) {
            object[key] = parseFloat(form[key]);
        }

        if (isNaN(object.var6)) object.var6 = 1;

        let calculationResult = calculationType === "first" ? firstCalculation(object).toFixed(3) : secondCalculation(object).toFixed(3);
        if (!isNaN(calculationResult)) {
            if (calculationType === "first") {
                setResult("Мощность приемника = " + calculationResult + " Ватт");
            } else {
                setResult("Расстояние = " + calculationResult + " метр");
            }

            showModal();
        } else {
            showSnackbar();
        }
    };
    const clearForm = () => {
        setForm({
            var1: "",
            var2: "",
            var3: "",
            var4: "",
            var5: "",
            var6: "",
        });
    };
    const fillForm = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const changeCalculationType = (value) => {
        setCalculationType(value);
        clearForm();
        setResult("");
    };
    const firstCalculation = ({var1, var2, var3, var4, var5, var6}) => {
        return (var1 * var2 * var3 * Math.pow(var4, 2)) / (Math.pow(4 * Math.PI, 2) * Math.pow(var5, 2) * var6);
    };
    const secondCalculation = ({var1, var2, var3, var4, var5, var6}) => {
        return Math.pow((var1 * var2 * var3 * Math.pow(var4, 2)) / (Math.pow(4 * Math.PI, 2) * var5 * var6), 1 / 2);
    };

    return (
        <View style={styles.app}>
            <Portal>
                <Modal contentContainerStyle={styles.modal}
                       visible={modalVisible}
                       onDismiss={hideModal}
                >
                    <Text variant="bodyLarge">{result}</Text>
                </Modal>
            </Portal>
            <View style={styles.appbar}>
                <Appbar.Header>
                    <Appbar.Content title="Radar Counter"/>
                </Appbar.Header>
            </View>
            <View style={styles.main}>
                <View style={styles.formula}>
                    <Image style={styles.image}
                           source={calculationType === "first" ? firstFormula : secondFormula}
                           resizeMode="contain"
                    />
                </View>
                <View style={styles.selectSection}>
                    <RadioButton.Group value={calculationType}
                                       onValueChange={(value) => changeCalculationType(value)}
                    >
                        <RadioButton.Item style={styles.radioButton}
                                          label="Рассчитать мощность приёмника"
                                          value="first"
                        />
                        <RadioButton.Item style={styles.radioButton}
                                          label="Рассчитать расстояние"
                                          value="second"
                        />
                    </RadioButton.Group>
                </View>
                <View style={styles.switchGroup}>
                    <Text variant="bodyLarge">Учитывать дополнительные потери</Text>
                    <Switch value={isVariableSwitchOn}
                            onValueChange={onToggleSwitch}
                    />
                </View>
                <View>
                    <TextInput keyboardType="numeric"
                               label="Мощность передатчика, Ватт"
                               mode="outlined"
                               value={form.var1}
                               onChangeText={(value) => fillForm("var1", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Усиление антенны передатчика"
                               mode="outlined"
                               value={form.var2}
                               onChangeText={(value) => fillForm("var2", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Усиление приемной антенны"
                               mode="outlined"
                               value={form.var3}
                               onChangeText={(value) => fillForm("var3", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Длина волны, метр"
                               mode="outlined"
                               value={form.var4}
                               onChangeText={(value) => fillForm("var4", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label={calculationType === "first" ? "Расстояние, метр" : "Мощность приемника, Ватт"}
                               mode="outlined"
                               value={form.var5}
                               onChangeText={(value) => fillForm("var5", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Дополнительные потери"
                               mode="outlined"
                               disabled={!isVariableSwitchOn}
                               value={form.var6}
                               onChangeText={(value) => fillForm("var6", value)}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <Button style={styles.leftButton}
                            icon="play"
                            mode="contained"
                            onPress={calculateForm}
                    >Рассчитать</Button>
                    <Button style={styles.rightButton}
                            icon="delete"
                            mode="outlined"
                            onPress={clearForm}
                    >Очистить</Button>
                </View>
                <View>
                    <Snackbar visible={snackbarVisible}
                              onDismiss={hideSnackbar}
                              action={{
                                  icon: "close",
                              }}
                    >Проверьте правильность введенных значений</Snackbar>
                </View>
            </View>
        </View>
    );
}
