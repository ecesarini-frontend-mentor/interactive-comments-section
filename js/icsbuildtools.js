//import { IcsMq } from "./icsmq.js";

export class IcsBuildTools {
    constructor() {
        //super();
    };

    responseSec() {
        const commentContainer = document.createElement('div'),
            commentContainerImg = new Image(),
            commentContainerFb = document.createElement('div'),
            commentContainerFbTextarea = document.createElement('textarea'),
            commentContainerFbBtnSend = document.createElement('button');
            
        commentContainer.classList.add('comment-user-add-response');
        commentContainerImg.classList.add('comment-user-add-response-avatar');
        commentContainerFb.classList.add('comment-user-add-response-flexbox');
        commentContainerFbTextarea.classList.add('add-response-textarea');
        commentContainerFbTextarea.placeholder = ' Add a comment...';
        commentContainerFbBtnSend.classList.add('add-response-send-button');

        commentContainerImg.src = JSON.parse(localStorage['dataJson']).currentUser.image.png;
        commentContainerFbBtnSend.type = 'button';
        commentContainerFbBtnSend.innerText = 'SEND';

        commentContainerFb.append(commentContainerFbTextarea, commentContainerFbBtnSend);
        commentContainer.append(commentContainerImg, commentContainerFb);

        return commentContainer;
    }

    buildComment() {
        //Create html elements
        const comment = document.createElement('div'),
            commentUserGrid = document.createElement('div'),
            commentRate = document.createElement('div'),
            commentRatePlus = document.createElement('button'),
            commentRatePlusImg = document.createElement('img'),
            commentRateValue = document.createElement('span'),
            commentRateMinus = document.createElement('button'),
            commentRateMinusImg = document.createElement('img'),
            commentTopFb = document.createElement('div'),
            commentTopFbAvatar = new Image(),
            commentTopFbUid = document.createElement('span'),
            commentTopFbDate = document.createElement('span'),
            commentBottomContent = document.createElement('div');
        //Assign classes
        comment.classList.add('comment-user-main-grid-container');
        commentUserGrid.classList.add('comment-user-grid-element', 'comment-rate');
        commentRate.classList.add('comment-rate-flexbox');
        commentRatePlus.classList.add('comment-rate-element', 'comment-rate-element-plus');
        commentRatePlusImg.classList.add('vote');
        commentRatePlusImg.setAttribute('src', 'images/icon-plus.svg');
        commentRatePlusImg.setAttribute('alt', 'Vote up');
        commentRateValue.classList.add('comment-rate-element', 'comment-rate-element-value');
        commentRateMinus.classList.add('comment-rate-element', 'comment-rate-element-minus');
        commentRateMinusImg.classList.add('vote');
        commentRateMinusImg.setAttribute('src', 'images/icon-minus.svg');
        commentRateMinusImg.setAttribute('alt', 'Vote down');
        commentTopFb.classList.add('comment-user-grid-element', 'comment-user-flexbox-container');
        commentTopFbAvatar.classList.add('comment-user-flexbox-element', 'comment-avatar');
        commentTopFbUid.classList.add('comment-user-flexbox-element', 'comment-uid');
        commentTopFbDate.classList.add('comment-user-flexbox-element', 'comment-date');        
        commentBottomContent.classList.add('comment-user-grid-element', 'comment-content');
        //Connect elements
        comment.append(commentUserGrid, commentTopFb, commentBottomContent);
        commentUserGrid.append(commentRate);
        commentRatePlus.append(commentRatePlusImg, commentRatePlusImg);
        commentRateMinus.append(commentRateMinusImg, commentRateMinusImg);
        commentRate.append(commentRatePlus, commentRateValue, commentRateMinus);
        commentTopFb.append(commentTopFbAvatar, commentTopFbUid, commentTopFbDate);
        
        return comment;
    }
    createInteractButtons(type, target) {
        const replyEditDeleteBtn = (btnType) => {
            const commentTopFbBtn = document.createElement('button'),
                commentTopFbBtnImage = document.createElement('img'),
                commentTopFbBtnContent = document.createElement('span');

            commentTopFbBtn.classList.add('comment-user-flexbox-element', `comment-${btnType}`);
            commentTopFbBtnImage.classList.add('interact');
            commentTopFbBtn.type = 'button';
            commentTopFbBtnImage.src = `images/icon-${btnType}.svg`;
            commentTopFbBtnImage.alt = `${btnType} action`;
            commentTopFbBtnContent.innerText = `${btnType[0].toUpperCase()}${btnType.slice(1)}`;
            commentTopFbBtn.append(commentTopFbBtnImage, commentTopFbBtnContent);
            
            return commentTopFbBtn;
        };
        
       return target.append(replyEditDeleteBtn(type));       
    }
    editorCreateEditConfirmUndo() {
        const editFlexBtnContainer = document.createElement('div'),
            editConfirm = document.createElement('button'),
            editUndo = document.createElement('button');
                
        editFlexBtnContainer.classList.add('comment-edited-fb-button-container');
        editConfirm.classList.add('edit-button', 'edit-button-confirm');
        editUndo.classList.add('edit-button', 'edit-button-undo');
        editConfirm.innerText = 'EDIT';
        editUndo.innerText = 'UNDO';
        editFlexBtnContainer.append(editConfirm, editUndo);

        return editFlexBtnContainer;
    }       
    createCommentReplyObj(commentBoxTextarea, jsonData) {
        const getMaxId = (obj) => {
            let a = [];
            const getMax = (a, b) => Math.max(a, b);
            obj.comments.forEach( c => {
                a.push(c.id);
                if(c.replies.length > 0) {
                    c.replies.forEach( r => a.push(r.id) );
                }
            });
            return a.reduce(getMax);
        }
        const cuObj = {};        
        cuObj.id = getMaxId(JSON.parse(localStorage['dataJson'])) + 1; 
        cuObj.content = commentBoxTextarea.value;
        cuObj.createdAt = Date.now();
        cuObj.score = 0;
        cuObj.user = jsonData.currentUser;
        cuObj.replies = [];
        return cuObj;
    }
    dater(start, end, debug) {
        const ts = [60, 3600, 3600*24, 3600*24*7, 3600*24*7*28, 3600*24*365],
              tsInd = [' second', ' minute', ' hour', ' day', ' week', ' month', ' year'];              
        let gap = (!debug)? (end - start)/1000 : debug,
            tgInd = null;     
        gap = Math.round(gap);
    
        tgInd = ts.findIndex(e => { //always returns value provided by the function (here 'index found'). The same: ts.findIndex(e => gap < e);
            if(gap < e) return true;               
        });    
        function timeSlotDefiner(ind) {
            let cInd = (ind === -1)? tsInd.length: ind;
            let gTmp, tailRes;
    
            gTmp = (ind === -1)? 
                Math.round(gap/ts[ts.length - 1]): 
                (ind === 0)? gap: Math.round(gap/ts[ind-1]);
            tailRes = (gTmp === 1)? ' ago' : 's ago';            
            return gTmp + tsInd[cInd] + tailRes;
        }    
        return timeSlotDefiner(tgInd);
    }

    modalCreator() {
        const modalContainer = document.createElement('div'),
            modalContent = document.createElement('div'),
            modalMessage = document.createElement('p'),
            modalNestedBtnContainer = document.createElement('div'),
            modalNestedBtnYes = document.createElement('button'),
            modalNestedBtnNo = document.createElement('button');

        modalContainer.classList.add('modal-container');
        modalContent.classList.add('modal-content');
        modalMessage.classList.add('modal-message');
        modalNestedBtnContainer.classList.add('modal-button-container');
        modalNestedBtnYes.classList.add('modal-button-yes');
        modalNestedBtnNo.classList.add('modal-button-no');

        modalMessage.innerText = 'Are you sure?';
        modalNestedBtnYes.innerText = 'DELETE';
        modalNestedBtnNo.innerText = 'SLIP OFF';

        modalNestedBtnContainer.append(modalNestedBtnYes, modalNestedBtnNo);
        modalContent.append(modalMessage, modalNestedBtnContainer);
        modalContainer.append(modalContent);

        return modalContainer;
    }
    scoreSorter() {
        function orderScoreBoxes(commentsContainer) {
            let arr = [];
            commentsContainer.forEach( (c,i) => {
                let cVal = Number.parseInt(c.querySelector('.comment-rate-element-value').innerText);
                arr.push({val: cVal, ind: i});
            });
            return arr.sort( (a, b) => b.val - a.val );
        }

        const ccnt = document.querySelector('.comment-container'),
            cngc = ccnt.querySelectorAll('.comment-container > .comment-user-main-grid-container'),
            cuar = ccnt.querySelector('.comment-user-add-response'),
            cOrdered = orderScoreBoxes(cngc);

        cOrdered.forEach(c => {
            let cind = c.ind;
            if(cngc[cind].nextElementSibling.matches('.comment-user-nested-grid-container')) {
                ccnt.append(cngc[cind], cngc[cind].nextElementSibling);
            } else {
                ccnt.append(cngc[cind]);
            }
        });
        ccnt.append(cuar);
    }


}