import { fetchProducts, fetchReport, fetchLocation, fetchFamily, IReport } from "../src/utils/fetchData";

describe('Testing fetch products functions',()=>{
    const validJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbHNvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pbHNvbiIsImlhdCI6MTY3NjYzODY4MSwiZXhwIjoxNjc2NjQyMjgxfQ.hvwN1GeRbs8CF_vaZ-9MIaDT-hPq9e5TtjfjbL_fvZ4';
    it('Testing fetch products', async ()=>{
        const response = await fetchProducts('1', '5', validJWT);
        expect(response[0].id).toBe(1);
    })
    it('Testing fetch location', async ()=>{
        const response = await fetchLocation(1, validJWT);
        expect(response.id).toBe(1);
    })
    it('Testing fetch family', async ()=>{
        const response = await fetchFamily(1, validJWT);
        expect(response.id).toBe(1);
    })
    it('Testing fetch report', async ()=>{
        const response = await fetchReport(validJWT);
        expect(response.totalCost).toBe(1050)
    })
});