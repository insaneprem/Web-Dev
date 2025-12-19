import { createClient } from "redis";

const client = createClient()


async function main() {
    await client.connect()
    while(1){
        const respone = await client.brPop('submission',0)
        
    }
    
}