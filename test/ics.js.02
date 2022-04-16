// TODO: style function: mouseout event doesn't change 'fill' on elements, error 'mouseout' event."


class IcsStyle {
    constructor(elClk, evClk) {
        this.elClk = elClk;
        this.evClk = evClk;
        this.init();
    }

    init() {
        this.elClk.forEach( el => {
            el.addEventListener('mouseover', this);
            el.addEventListener('mousout', this);
            }
        );
            //el => el.add
            //);
    }
    handleEvent(e) {
        let ect = e.currentTarget;
        if(ect.type === 'button') this.styleClkd(e);
    }    
    styleClkd(e) {
        let ect = e.currentTarget,
            svg = ect.querySelector('object').contentDocument.querySelector('path'),
            svgOrigColor = ect.querySelector('object').contentDocument.querySelector('path').getAttribute('fill');
        switch(e.type) {
            case 'mouseover':
                ect.style.color = 'red';
                svg.setAttribute('fill', 'red');
                break;
            case 'mouseout':
                ect.style.color = '';
                svg.setAttribute('fill', svgOrigColor);
                break;
        }
    }
}

function init() {
    let elClk = document.querySelectorAll('button'),
        evClk = ['mouseover', 'mouseout'];

    new IcsStyle(elClk, evClk);
    //const data = fetch("./data.json").then((response) => {/*return"*/ response.json();}); // Arrow functions need return inside {}
    let getData = async function() {
        let data = await fetch("./data.json").then(res => res.json()).then( data => data);
        return data;
    }
    //async getData();
    
    
    //console.log(data);
    return console.log(getData());
}

init();