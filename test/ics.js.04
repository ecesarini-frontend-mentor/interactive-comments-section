// TODO: style function: mouseout event doesn't change 'fill' on elements, error 'mouseout' event depending on 'add-comment' button which can't refer on querySelector('object')."


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
        
    }
    handleEvent(e) {
        let ect = e.currentTarget,
            svg = ect.querySelector('object').contentDocument.querySelector('path');

        switch(ect.type) {
            case 'button':
                this.styleClkd(e, svg);
                break;
        }
    }    
    styleClkd(e, svg) {
        let ect = e.currentTarget,
            colorOrig;
        switch(e.type) {
            case 'mouseover':
                ect.style.color = 'red';
                svg.setAttribute('fill', 'red');
                colorOrig = svg.getAttribute('fill');
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

    window.addEventListener('DOMContenLoaded', () => sessionStorage.clear());
    new IcsStyle(elClk, evClk);
    //const data = fetch("./data.json").then((response) => {/*return"*/ response.json();}); // Arrow functions need return inside {}
    /*let getData = async function() {
        let data = await fetch("./data.json").then(res => res.json()).then( data => data);
        return data;
    }
    return console.log(getData());/*
}

init();