/* FINDINGS:
    great design:  
        https://github.com/Richard2957/interactive-comments-section-main/blob/master/index.html 
        https://github.com/Richard2957/interactive-comments-section-main/blob/master/ics.js

    TODO: make PopulateOnLoad depending on 'data.json'
*/

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

class PopulateOnLoad {
    constructor(jFile) {
        this.jFile = jFile;
        this.jsonData = null;
        this.container = document.querySelector('.comment-container');
        this.init();
    }
    
    init() {
        this.getData(this.jFile);
        this.entry();
    }    
    async getData(jFile) {
        this.jsonData = JSON.parse(sessionStorage.getItem(['jsonData']));
        if(!this.jsonData) {
            try {
                this.jsonData = await fetch(jFile).then(res => res.json()).then( data => data);
                sessionStorage.setItem('jsonData', JSON.stringify(this.jsonData));
                this.drawUpDoc();
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    entry() {
        const qualifyEntry = {
            img(target, src) {
                target.src = src;
                target.setAttribute('alt', 'Avatar');
            },
        }
        const comment = document.createElement('div'),
            commentUserGrid = document.createElement('div'),
            commentRate = document.createElement('div'),
            commentRatePlus = document.createElement('button'),
            commentRateValue = document.createElement('span'),
            commentRateMinus = document.createElement('button'),
            commentTopfb = document.createElement('div'),
            commentTopfbAvatar = new Image(),
            commentTopfbUid = document.createElement('span'),
            commentTopfbDate = document.createElement('span'),
            commentTopfbBtn = document.createElement('button'),
            commentBottomContent = document.createElement('div');

        qualifyEntry.img(commentTopfbAvatar, 'images/avatars/image-amyrobson.png');
        
        comment.classList.add('comment-user-main-grid-container');
        commentUserGrid.classList.add('comment-user-grid-element', 'comment-rate');
        commentRate.classList.add('comment-rate-flexbox');
        commentRatePlus.classList.add('comment-rate-element', 'comment-rate-element-plus');
        commentRateValue.classList.add('comment-rate-element', 'comment-rate-element-value');
        commentRateMinus.classList.add('comment-rate-element', 'comment-rate-element-minus');
        commentTopfb.classList.add('comment-user-grid-element', 'comment-user-flexbox-container');
        commentTopfbAvatar.classList.add('comment-user-flexbox-element', 'comment-avatar');
        commentTopfbUid.classList.add('comment-user-flexbox-element', 'comment-uid');
        commentTopfbDate.classList.add('comment-user-flexbox-element', 'comment-date');
        commentTopfbBtn.classList.add('comment-user-flexbox-element');
        commentBottomContent.classList.add('comment-user-grid-element', 'comment-content');

        comment.append(commentUserGrid, commentTopfb, commentBottomContent);
        commentUserGrid.append(commentRate);
        commentRate.append(commentRatePlus, commentRateValue, commentRateMinus);
        commentTopfb.append(commentTopfbAvatar, commentTopfbUid, commentTopfbDate, commentTopfbBtn);

        this.container.append(comment);

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
    new PopulateOnLoad('./data.json');
}

init();