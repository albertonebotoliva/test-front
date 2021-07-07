
function search(data, searchTerm) {
    let result = []

    function getEachItem(object) {
        object.forEach(item => {
            searchItem(item)
        })
        let uniqueResults = [...new Set(result)]
        return uniqueResults.length
    };

    function searchItem(item) {
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