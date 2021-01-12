 export const nextMove = async (space) => {
     try{
         const response = await fetch(`${process.env.api_url}/next-turn/${space}`);
         const response_json = await response.json();
         return response_json.errorMessage;
     }
     catch(ex){
        console.log('ERROR -  nextMove', ex);
        return 'Error occurred while calling server';
     }
 }
    export const newGame = async () => {
        try{
            const response = await fetch(`${process.env.api_url}/reset`);
            return await response.text();
        }
        catch(ex){
            console.log('ERROR -  nextMove', ex);
            return 'Error occurred while calling server';
        }
 }
 