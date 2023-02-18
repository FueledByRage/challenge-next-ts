import { DTOProduct, IFamily, ILocation } from "../dtos/DTOProduct";
import apiFetch from "./axios";

interface IProduct{
    id: number,
    name : string,
    cost: number,
    quantity : number,
    locationId : number,
    familyId: number
}

export interface IReport{
    totalCost : number,
    totalQuantity : number
}

export const fetchProducts = async ( page : string, limit : string, jwt : string  ) : Promise<DTOProduct[]> =>{

        return new Promise( async (resolve, reject) =>{
            try{
                const response =  await apiFetch.get(`/products?_page=${page}&_limit=${limit}`, {
                    headers:{
                        authorization : `Bearer ${jwt}`
                    }
                });
                
                const result = await Promise.all(response.data.map( async ( product : IProduct ) =>{
                    if(!product.familyId || !product.locationId) return
                    const productFamily = await fetchFamily(product.familyId, jwt);
                    const productLocation = await fetchLocation(product.locationId, jwt);
                    const dataProduct = new DTOProduct( product.id, product.name, product.cost, product.quantity, productLocation.name, productFamily.name );
                    return dataProduct;
                }));
            
                return resolve(result.filter(( product => product != undefined )) );

            }catch(error : any){
                console.error(error);
                reject();
            }

        })
}

export const fetchFamily = async ( id : number, jwt : string ) : Promise<IFamily> =>{
    try{
        const response =  await apiFetch.get(`/families?id=${id}`, {
            headers:{
                authorization : `Bearer ${jwt}`
            }
        });
    
    
        return Promise.resolve({
            id : response.data[0].id,
            name: response.data[0].name,
        })

    }catch(error : any){
        return Promise.reject(error)
    }
}

export const fetchLocation = async ( id : number, jwt : string  ) : Promise<ILocation> =>{
    try {
        
        const response =  await apiFetch.get(`/locations?id=${id}`, {
            headers:{
                authorization : `Bearer ${jwt}`
            }
        });
    
    
        return Promise.resolve({
            id : response.data[0].id,
            name: response.data[0].name,
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const fetchReport = ( jwt : string ) : Promise<IReport> =>{
    return new Promise( async ( resolve, reject ) =>{
        try {
            const response =  await apiFetch.get(`/products`, {
                headers:{
                    authorization : `Bearer ${jwt}`
                }
            });

            let totalCost = 0;            
            let totalQuantity = 0;

            await Promise.all(response.data.map( async ( product : IProduct ) =>{
                if(!product.cost || !product.quantity) return;
                totalCost += product.cost;
                totalQuantity += product.quantity;
            }));
        
            return resolve({ totalCost,  totalQuantity});
        } catch (error) { 
            console.log(error);
            return reject();
        }
    })
}