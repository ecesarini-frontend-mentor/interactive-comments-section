// FIXED: style function: mouseout event doesn't change 'fill' on elements, error 'mouseout' event depending on 'add-comment' button which can't refer on querySelector('object')."
// TODO: handle json (breakpoint ics.js@92:);

class IcsStyle {
    constructor(elClk, evClk, colorVote, colorReplyAndEdit, colorDelete) {
        this.elClk = elClk;
        this.evClk = evClk;
        this.colorVote = colorVote;
        this.colorReplyAndEdit = colorReplyAndEdit;
        this.colorDelete = colorDelete;
        this.colorOrig = ''; // New undefined variable that lets you catch svg original color;
        this.init();
    }

    init() {
        this.evClk.forEach( ev => 
            this.elClk.forEach( el => el.addEventListener(ev, this) )    
        );        
    }
    handleEvent(e) {
        let ect = e.currentTarget;

        switch(ect.type) {
            case 'button':
                if(!this.checkClass(ect, 'add-comment-send-button')) {
                    let svg = ect.querySelector('object').contentDocument.querySelector('path');
                    this.styleVoteReplyEdit(e, svg);
                }
                else {
                    this.styleSend(e);
                }
                break;
        }
    }    
    checkClass(el, cName) {
            return (el.className.indexOf(cName) !== -1)? true : false;
    }        
    styleVoteReplyEdit(e, svg) {
        let ect = e.currentTarget;

        switch(e.type) {
            case 'mouseover':
                this.colorOrig = svg.getAttribute('fill');
                if (this.checkClass(ect, 'comment-rate-element')) {
                    ect.style.color = this.colorVote;
                    svg.setAttribute('fill', this.colorVote);
                }
                else if(this.checkClass(ect, 'comment-reply') || this.checkClass(ect, 'comment-edit')) {
                    ect.style.color = this.colorReplyAndEdit;
                    svg.setAttribute('fill', this.colorReplyAndEdit);
                }
                else if (this.checkClass(ect, 'comment-delete')) {
                    ect.style.color = this.colorDelete;
                    svg.setAttribute('fill', this.colorDelete);
                }
                break;
            case 'mouseout':
                ect.style.color = '';
                svg.setAttribute('fill', this.colorOrig);
                break;
        }
    }
    styleSend(e) {
        let ect = e.currentTarget;

        switch(e.type) {
            case 'mousedown':
                ect.style.color = 'white';
                ect.style.fontWeight = '700';
                ect.style.backgroundColor = this.colorVote;
                ect.style.border = 'none';
                break;
            case 'mouseup':
            case 'mouseout':
                ect.style = '';
                break;
        }
    }
}

class IcsInteract {
    constructor(data) {
        this.data = data;
        this.init();
    }

    init() {
        this.getData(this.data);
    }
    async getData(data) {
        let json = await fetch(data).then(res => res.json()).then( data => data);
        console.log(json);
    }
}

function init() {
    let elClk = document.querySelectorAll('button'),
        evClk = ['mouseover', 'mouseout', 'mousedown', 'mouseup'],
        moderateBlue = 'hsl(238, 40%, 52%)',
        grayishBlue = 'hsl(211, 10%, 45%)',
        deepPink = 'hsl(328, 100%, 54%)';

    window.addEventListener('DOMContenLoaded', () => sessionStorage.clear());
    new IcsStyle(elClk, evClk, moderateBlue, grayishBlue, deepPink);
    new IcsInteract('./data.json');
}

init();