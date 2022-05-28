import Toast from 'react-native-toast-message';

export function toastNotifier(){
    return Toast.show({
        type: 'error',
        text1: 'This is an info message',
        text2: "My name is chiki"
        });
};