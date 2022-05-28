export function convertDate(date){
    if (date) {
    const date1 = date.toDate().toLocaleDateString('en-GB', {  
    day:   'numeric',
    month: 'short',
    year:  'numeric',
    });

    return date1;
}else return null;

}