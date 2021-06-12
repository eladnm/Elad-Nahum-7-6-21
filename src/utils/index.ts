export const calculate = ( deg: number, unit: string, round = true ) => {

    //let deg = parseFloat( degree );

    // calculate Fahrenheit
    if( unit === 'F' )
        deg = ( deg / 5 * 9 ) + 32;

    // round the result
    if( round )
        deg = Math.round( deg );

    return deg;

}

export enum ACTIONS {
    REMOVE = 'remove',
    ADD = 'add'
}