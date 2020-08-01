export const splitArrayIntoChunks = (arr: any[] = [], itemsInChank: number) => {
    const chunks = [];
    let i = 0;
    while (i < arr.length) {
        chunks.push(arr.slice(i, i += itemsInChank));
    }
    return chunks;
}

