

export const useIsExiteAutomation = (Dchanel, method, arrayMethod) =>{
    try{
    
        const result = arrayMethod.find(item => {

            if (
                item.depositeChannel?.toLowerCase() === Dchanel?.toLowerCase() &&
                item.transactionMethod?.toLowerCase() === method?.toLowerCase()
            ) {

                const filteredActivePayMethod = item.activePayMethod?.filter(subItem => 
                    Object.values(subItem).every(value => value)
                );
                
                if (filteredActivePayMethod?.length) {
                    item.activePayMethod = filteredActivePayMethod;
                    return true; 
                }
            }
            return false; // Not a match
        });

        return result?.activePayMethod;

    }catch(error){
        console.log(error)
    }
}