import Toast from 'react-native-toast-message';

export function errorToastNotifier(text1, text2){
     if (text2.length > 40){
        const firstHalf = text2.substring(0,40);
        const secondHalf = text2.substring(40,);
        const temp = firstHalf + '-\n' + secondHalf;
        return Toast.show({
            type:"error",
            text1: text1,
            text2: temp,
            visibilityTime: 10000,
        })
    }else {
    return Toast.show({
        type: 'success',
        text1: text1,
        text2: text2,
        });
    }
};

export function successfulToastNotifier(text1, text2){
    if (text2.length > 60){
        const firstHalf = text2.substring(0,58);
        const secondHalf = text2.substring(58,);
        const temp = firstHalf + '-\n' + secondHalf;
        return Toast.show({
            type:"success",
            text1: text1,
            text2: temp,
            visibilityTime: 10000,
        })
    }else {
    return Toast.show({
        type: 'success',
        text1: text1,
        text2: text2,
        });
    }
};