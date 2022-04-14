// TODO: process "data.json"

function init() {
    //const data = fetch("./data.json").then((response) => {/*return"*/ response.json();}); // Arrow functions need return inside {}
    //const data = async (() => fetch("./data.json").then(res => res.json()).then( data => console.log(data))();
    let getData = async function() {
        let data = await fetch("./data.json").then(res => res.json()).then( data => data);
        return data;
    }
    //async getData();
    
    
    //console.log(data);
    return console.log(getData());
}

init();