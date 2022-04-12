function init() {
    const data = fetch("./data.json").then((response) => {response.json();}); //[[PromiseResult]]: undefined. Check this.

    //console.log(data.then(r => console.log(r)));
    console.log(data);
}

init();