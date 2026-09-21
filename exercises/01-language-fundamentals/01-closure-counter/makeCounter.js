
export function makeCounter(){
    let privateCounter = 0;        //variabile privata con inizializzatore parte da 0
    function changeBy(val){
        privateCounter += val;      
    }

    return {
        increment(){
            changeBy(1);
            return privateCounter;
        },
        decrement(){
            changeBy(-1);
            return privateCounter;
        },
        reset(){
            privateCounter = 0
            return privateCounter;
        }
    }
}

