import { IcsBuildTools } from "./icsbuildtools.js";

export class BuildSession extends IcsBuildTools {
    constructor(jFile) {
        super();
        this.jFile = jFile;
        this.jsonData = null;
        this.container = document.querySelector('.comment-container');
        this.btn = this.commentBox = this.commentBoxTextarea = null;
        this.replyJsonTarget = null;
        this.editUndoContainer = this.editorCreateEditConfirmUndo();
        this.modalTarget = null;
        this.getJsonData();
    } 
    // FETCH data
    async getJsonData() {
        this.jsonData = JSON.parse(localStorage.getItem(['dataJson']));
        if(!this.jsonData) {
            try {
                this.jsonData = await fetch(this.jFile).then(res => res.json()).then( data => data);
                localStorage.setItem('dataJson', JSON.stringify(this.jsonData));
                this.initBS();
            }
            catch(error) {
                console.log(error);
            }
        } else {
            this.container.innerHTML = "";
            this.initBS(); 
        }
    }
    //Initiator
    initBS() {
        this.drawUp();
        this.eventsListener();
    }
    drawUp() {
        this.jsonData.comments.forEach( c => {
            this.buildElement(c, 'comment', this.container);
            if(c.replies.length > 0) {
                c.replies.forEach( r => {
                    this.buildElement(r, 'reply', this.container);
                });
            } 
        });
        this.container.append(this.responseSec());
    }
    //event handler
    eventsListener(waiType, whoAmI) {
        if(waiType) {
            switch(waiType) {
                case 'edit':
                    whoAmI.classList.toggle('is-edited');
                    whoAmI.lastElementChild.querySelectorAll('button').forEach( b => b.addEventListener('click', this));
                    break;
                case 'delete':
                    whoAmI.forEach( b => b.addEventListener('click', this));
                    break;
            }
        }

        this.btn = document.querySelectorAll('button');
        this.commentBox = document.querySelector('.comment-user-add-response');
        this.commentBoxTextarea = document.querySelector('.add-response-textarea');        
        this.btn.forEach( b => b.addEventListener('click', this));
    }
    handleEvent(e) {
        const responseBtn = ['.add-response-send-button', '.comment-reply', '.add-reply-send-button'],
            editBtnClk = [
                ['.comment-edit', 'edited'],
                ['.edit-button-confirm', 'editConfirm'],
                ['.edit-button-undo', 'editUndo']
            ], 
            editClassTarget = [
                'comment-user-main-grid-container-edit',
                'comment-rate-edit',
                'comment-content-edit'
            ],
            deleteBtn = '.comment-delete',
            modalBtns =  ['.modal-button-yes', '.modal-button-no'],
            scoreBtns = '.comment-rate-element';

        let ect = e.currentTarget;
        
        function elementsPropertiesRemover(classTarget, attributeTarget) {
            let elementTarget = classTarget.map(ct => document.querySelectorAll('.' + ct)); //forEach doesn't work because after the processing it doesn't return an array, but it handles each item indipendently. So you'll come up to an undefined.
            
            for(let i = 0; i < classTarget.length; i++) {
                elementTarget[i].forEach( et => { // > NodeList.prototype.hasOwnProperty('forEach'); // true ||vs|| > NodeList.prototype.hasOwnProperty('map'); // false
                    if(arguments.length > 1 && et.getAttribute(attributeTarget)) {
                        et.setAttribute(attributeTarget, false);
                    }
                    et.classList.remove(classTarget[i]);
                } );
            }
        }

        switch(e.type) {
            case 'click':
                responseBtn.map(r => {
                    if(ect.matches(r)) this.responser(ect);
                });
                editBtnClk.map(e => {
                    if(e[1] === 'edited') elementsPropertiesRemover(editClassTarget, 'contentEditable');
                    if(ect.matches(e[0])) this.editor(ect, e[1]);
                });
                if(ect.matches(deleteBtn)) {
                    this.modalTarget = ect.closest('.comment-user-main-grid-container');
                    let cefbc = this.modalTarget.lastElementChild;
                    if(cefbc.matches('.comment-edited-fb-button-container')) {
                        cefbc.remove();
                    }
                    this.modalOn();
                }
                modalBtns.forEach(m => {
                    if(ect.matches(m)) this.modalAction(ect);
                });
                if(ect.matches(scoreBtns)) {
                    this.score(ect);
                }
                break;
        }
    }
    
    // Build on first load and on responses
    buildElement(obj, type, target) {
        const isCurrentUser = () => {
            if(obj.user.username !== currentUser) {
                this.createInteractButtons('reply', currentUserFlexboxContainer);
            } else {
                ['delete', 'edit'].forEach( i => this.createInteractButtons(i, currentUserFlexboxContainer));
            }
        }, 
        gridRowUpdater = function(tg) {
            let replyCount = tg.querySelectorAll('.comment-user-main-grid-container').length + 1;
            tg.firstChild.style.gridRow = `1 / ${++replyCount}`;
        };
        
        const comment = this.buildComment(),
            commentRepliesGrid = document.createElement('div'),
            commentRepliesLine = document.createElement('div'),
            currentUser = this.jsonData.currentUser.username,
            currentUserFlexboxContainer = comment.querySelector('.comment-user-flexbox-container');
            
        commentRepliesGrid.classList.add('comment-user-nested-grid-container');
        commentRepliesLine.classList.add('comment-user-nested-grid-container-line');
        
        comment.setAttribute('data-cid', obj.id);
        comment.querySelector('.comment-content').innerText = obj.content;
        comment.querySelector('.comment-date').innerText = (obj.id <= 4)? 
            obj.createdAt:
            this.dater(obj.createdAt, Date.now());
        comment.querySelector('.comment-rate-element-value').innerText = obj.score;
        comment.querySelector('.comment-uid').innerText = obj.user.username;
        comment.querySelector('.comment-avatar').src = obj.user.image.png;
        
        let crgClass = commentRepliesGrid.classList[0];

        switch(type) {
            case 'comment':
                isCurrentUser();
                target.append(comment);
                break;
            case 'reply': 
                isCurrentUser();
                let cungc = undefined;
                if(target.matches('.comment-reply-this')) {

                    if(target.nextElementSibling.matches(`.${crgClass}`)) {
                        cungc = target.nextElementSibling;
                        gridRowUpdater(cungc);
                        target.nextElementSibling.append(comment);
                    }
                    else if(target.closest(`.${crgClass}`)) {
                        cungc = target.closest(`.${crgClass}`),
                        gridRowUpdater(cungc);
                        target.after(comment);
                    } 
                    else if(!target.nextElementSibling.matches(`.${crgClass}`) && !target.closest(`.${crgClass}`)) { 
                        commentRepliesGrid.append(commentRepliesLine, comment);
                        target.after(commentRepliesGrid);
                    }
                } else {
                    if(!target.lastElementChild.matches(`.${crgClass}`)) {
                        commentRepliesGrid.append(commentRepliesLine, comment);
                        target.append(commentRepliesGrid);
                    } else {
                        cungc = [].at.call(target.querySelectorAll(`.${crgClass}`), -1);
                        gridRowUpdater(cungc);
                        cungc.append(comment);
                    }
                }
                break;
        }
        this.eventsListener();
    }
    // Events:
    eventsStoreDelete(obj, replyJsonTarget, storeActionType) {
        let localJson = JSON.parse(localStorage['dataJson']);

        if(arguments.length === 1) {
            localJson.comments.push(obj);
            localStorage['dataJson'] = JSON.stringify(localJson);
            return;
        }

        const cid = Number.parseInt(replyJsonTarget.getAttribute('data-cid'));
        let ljc = localJson.comments.find(c => c.id === cid),
            ljr, ljrcIndex = undefined;

        for(let i = 0; i < localJson.comments.length; i++) {
            ljr = localJson.comments[i].replies.find(r => r.id === cid);
            if(ljr) {
                ljrcIndex = i;
                break;
            }
        }
        
        const storeByActionType = (sbat) => {
            if(ljc) {
                switch(sbat) {
                    case 'reply':
                        ljc.replies.push(obj);
                        break;
                    case 'edit':
                        ljc.content = replyJsonTarget.querySelector('.comment-content').innerText;
                        break;
                    case 'delete':
                        let cIndMatch = localJson.comments.findIndex(c => c.id === ljc.id);
                        localJson.comments.splice(cIndMatch, 1);
                        //debugger;
                        break;
                }
            }
            else if(ljr) {
                switch(sbat) {
                    case 'reply':
                        ljr.push(obj);
                        break;
                    case 'edit':                                        
                        ljr.content = replyJsonTarget.querySelector('.comment-content').innerText;
                        break;
                    case 'delete':
                        let rIndMatch = localJson.comments[ljrcIndex].replies.findIndex(r => r.id === ljr.id);
                        localJson.comments[ljrcIndex].replies.splice(rIndMatch, 1);
                        //debugger;
                        break;
                }
            }
        }
        
        storeByActionType(storeActionType);
        localStorage['dataJson'] = JSON.stringify(localJson);
    }
    // Buttons behaviour:
    responser(ect) {
        let cmtObj = null,
            replyElement = this.container.querySelector('.comment-user-add-response'),
            replyElementBtn = replyElement.querySelector('button'),
            commentTarget = null;

        if(ect.matches('.add-response-send-button')) {
            cmtObj = this.createCommentReplyObj(this.commentBoxTextarea, this.jsonData);
            this.eventsStoreDelete(cmtObj); // order matters to update textarea
            this.buildElement(cmtObj, 'comment', this.container);
            this.container.append(this.commentBox);
            this.commentBoxTextarea.value = '';
        }
        else if(ect.matches('.comment-reply')) {
            commentTarget = ect.closest('.comment-user-main-grid-container');
            this.replyJsonTarget = (!commentTarget.closest('.comment-user-nested-grid-container')) ? 
                commentTarget :
                commentTarget.parentElement.previousElementSibling;
            const targetUserName = commentTarget.querySelector('.comment-uid').innerText;

            commentTarget.classList.toggle('comment-reply-this');
            replyElementBtn.classList.toggle('add-response-send-button');
            replyElementBtn.classList.toggle('add-reply-send-button');
            replyElement.querySelector('textarea').placeholder = `Reply @${targetUserName} `;
            replyElement.querySelector('textarea').value = `@${targetUserName}: `;
            replyElementBtn.innerText = 'REPLY';
            commentTarget.after(replyElement);
        }
        else if(ect.matches('.add-reply-send-button')){ // && !ect.closest('.comment-user-main-grid-container').nextElementSibling.matches('.comment-reply-this')) {
            commentTarget = document.querySelector('.comment-reply-this');
            cmtObj = this.createCommentReplyObj(this.commentBoxTextarea, this.jsonData);
            cmtObj.replyingTo = commentTarget.querySelector('.comment-uid').innerText;
            this.eventsStoreDelete(cmtObj, this.replyJsonTarget, 'reply');
            this.container.append(replyElement);
            this.buildElement(cmtObj, 'reply', commentTarget);
            replyElementBtn.classList.toggle('add-reply-send-button');
            replyElementBtn.classList.toggle('add-response-send-button');
            replyElement.querySelector('textarea').value = '';
            replyElement.querySelector('textarea').placeholder = ' Add a comment...';
            replyElementBtn.innerText = 'SEND';
            commentTarget.classList.toggle('comment-reply-this');
            this.replyJsonTarget = null;
        }

    }

    //editor
    editor(ect, clk) {
        const editElement = ect.closest('.comment-user-main-grid-container'),
            editContent = editElement.querySelector('.comment-content'),
            editCommentRatefb = editElement.querySelector('.comment-rate');
        
        function editConfirmerUndoer() {
            editElement.classList.remove('comment-user-main-grid-container-edit');
            editContent.setAttribute('contentEditable', false);
            editContent.classList.remove('comment-content-edit');
            editCommentRatefb.classList.remove('comment-rate-edit');
            editElement.lastElementChild.remove();
        }
        function editClassAdder() {
            editElement.classList.add('comment-user-main-grid-container-edit');
            editContent.classList.add('comment-content-edit');
            editCommentRatefb.classList.add('comment-rate-edit');
            editContent.setAttribute('contentEditable', true);
        }
                
        switch(clk) {
            case 'edited': 
                editElement.append(this.editUndoContainer);
                this.eventsListener('edit', editElement);
                editClassAdder();
                break;
            case 'editConfirm':
                this.eventsStoreDelete(null, editContent.parentElement, 'edit');                
                editConfirmerUndoer();
                break;
            case 'editUndo':
                editConfirmerUndoer();
                break;
        }
    }
    //deleter
    modalAction(ect) {
        let mtCid = this.modalTarget.dataset.cid;
        if(ect.matches('.modal-button-yes')) {
            this.eventsStoreDelete(null, this.modalTarget, 'delete');
            document.querySelector(`[data-cid='${mtCid}']`).remove();
        }
        document.querySelector('.modal-container').remove();
        this.container.style.display = '';
        this.eventsListener();
    }
    modalOn() {
        const docMain = document.querySelector('main');

        this.container.style.display = 'none';
        docMain.append(this.modalCreator());
        
        const modalBtns = document.querySelector('.modal-button-container').querySelectorAll('button');

        this.eventsListener('delete', modalBtns);
    }    
    //score
    score(ect) {
        let value = ect.closest('.comment-rate-flexbox').querySelector('.comment-rate-element-value');
        const oScore = {
            getScoreVal(v) {
                let valInTxt = Number.parseInt(v.innerText);
                v.innerText = ect.matches('.comment-rate-element-plus')?
                    ++valInTxt:
                    --valInTxt;
            }
        }
        oScore.getScoreVal(value);
    }
    scoreSorter() {
        function orderScoreBoxes(replyContainer) {
            let arr = [];
            const replies = replyContainer.querySelectorAll('.comment-rate-element-value');
            replies.forEach( (v, i) => arr.push({val: v.innerText, ind: i}) );
            return arr.sort( (a, b) => a.val - b.val );
        }
        /*function catchReply(replyBox) {
            const cOrdered = orderScoreBoxes(replyBox);
            replyBox.forEach( r => {
                
            });
        }*/
        
        const cngc = document.querySelectorAll('.comment-user-nested-grid-container');    
        
        /*for(let i = 0; i < cngc.length; i++) {
            //if(i === 1) {
                let crev = cngc[i].querySelectorAll('.comment-rate-element-value'),
                    cTarget = cngc.querySelectorAll(crev.closest('.comment-user-main-grid-container'))[];
                crev.forEach( cr => cngc.append())
            //    debugger;   
            //}

        }*/
    }
} 