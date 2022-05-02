export class IcsStyle {
    constructor(elClk, evClk, colorVote, colorReplyAndEdit, colorDelete) {
        this.elClk = elClk;
        this.evClk = evClk;
        this.colorVote = colorVote;
        this.colorReplyAndEdit = colorReplyAndEdit;
        this.colorDelete = colorDelete;
        this.colorOrig = ''; // New empty variable that lets you catch svg original color;
        //this.init();
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
            //return (el.className.indexOf(cName) !== -1)? true : false;
            return (el.classList.contains(cName))? true : false;
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