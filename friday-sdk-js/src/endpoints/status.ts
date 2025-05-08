import {APIClient} from '../client'

export async function getStatus(client: APIClient){
    return client.request("/status",{
        method: "GET",
    });
}