// TODO: style function: mouseout event doesn't change 'fill' on elements, error 'mouseout' event."


class IcsStyle {
    constructor(elClk, evClk) {
        this.elClk = elClk;
        this.evClk = evClk;
        this.init();
    }

    init() {
        
        this.evClk.forEach( ev => 
            this.elClk.forEach( el => el.addEventListener(ev, this) )    
        );
        /*this.elClk.forEach( el => 
            this.evClk.forEach( ev => el.addEventListener(ev, this) )    
        );*/
        /*this.elClk.forEach( el => {
                el.addEventListener('mouseover', this);
                el.addEventListener('mousout', this);
                            
            });*/ // all 3 work
        
    }
    handleEvent(e) {
        let ect = e.currentTarget,
            svg = ect.querySelector('object').contentDocument.querySelector('path')
        switch(ect.type) {
            case 'button':
                this.styleClkd(e, svg, colorOrig);
                break;
        }
    }    
    styleClkd(e, svg, colorOrig) {
        let ect = e.currentTarget,
            check = (arguments.length < 3)? true : false;
        switch(e.type) {
            case 'mouseover':
                ect.style.color = 'red';
                svg.setAttribute('fill', 'red');
                break;
            case 'mouseout':
                ect.style.color = '';
                svg.setAttribute('fill', colorOrig);
                break;
        }
    }
}

function init() {
    let elClk = document.querySelectorAll('button'),
        evClk = ['mouseover', 'mouseout', 'mouseleave'];

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