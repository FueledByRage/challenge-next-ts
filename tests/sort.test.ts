import { sortData } from "../src/utils/sortData";

describe('Testing the sort data function', ()=>{
    it('Sort an array of objects in a ascedent way based on a key value', ()=>{
        const data = [
            {
                id: 5,
            },
            {
                id: 3
            },
            {
                id : 8
            },
            {
                id: 2
            }
        ];

        const result = sortData(data,  'id', true);
        expect(result[0].id).toBe(2)
        expect(result[3].id).toBe(8)
    });
    it('Sort an array of objects in a descedent way based on a key value', ()=>{
        const data = [
            {
                id: 5,
            },
            {
                id: 3
            },
            {
                id : 8
            },
            {
                id: 2
            }
        ];

        const result = sortData(data,  'id', false);
        expect(result[0].id).toBe(8)
        expect(result[3].id).toBe(2)
    });
});