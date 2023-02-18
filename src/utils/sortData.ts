
export const sortData = <T>(array: T[], key: keyof T, asc: boolean): T[] => {
    const sortedArray = array.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return asc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);}
        else return asc ? (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) : (valueB < valueA ? -1 : valueB > valueA ? 1 : 0);
    });
    return sortedArray;
}