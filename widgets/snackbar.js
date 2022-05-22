import React from 'react';
import SnackBar from 'react-native-snackbar-component';

export default function ShowSnackBar(){
    const [dismissSnack, setDismissSnack] = React.useState(true);

    React.useEffect(()=>{
        setTimeout(()=>setDismissSnack(!dismissSnack), 2000);
    },[dismissSnack])
   return(
    <SnackBar
    visible={dismissSnack}
    textMessage="Hello There" />
   );
} 
