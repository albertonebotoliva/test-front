
function search(data: any, searchTerm: string): any {
    let result: Array<any> = [];

    function getEachItem(object: any): number {
        object.forEach((item: any) => {
            searchItem(item);
        });
        let uniqueResults: Array<any> = Array.from(new Set(result));
        return uniqueResults.length;
    };

    function searchItem(item: any): void {
        Object.keys(item).forEach(key => {
            if (key === "name") {
                let searchAsRegEx = new RegExp(searchTerm, "gi");
                if (item[key].match(searchAsRegEx)) {
                    result.push(item)
                }
            }
        })
    }
    getEachItem(data);
    return result
}

export default search;