export class IcsBuildTools {
    constructor() {};

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
            commentRatePlusObj = document.createElement('object'),
            commentRateValue = document.createElement('span'),
            commentRateMinus = document.createElement('button'),
            commentRateMinusObj = document.createElement('object'),
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
        commentRatePlusObj.classList.add('vote');
        commentRatePlusObj.setAttribute('type', 'image/svg+xml');
        commentRatePlusObj.setAttribute('data', 'images/icon-plus.svg');
        commentRateValue.classList.add('comment-rate-element', 'comment-rate-element-value');
        commentRateMinus.classList.add('comment-rate-element', 'comment-rate-element-minus');
        commentRateMinusObj.classList.add('vote');
        commentRateMinusObj.setAttribute('type', 'image/svg+xml');
        commentRateMinusObj.setAttribute('data', 'images/icon-minus.svg');
        commentTopFb.classList.add('comment-user-grid-element', 'comment-user-flexbox-container');
        commentTopFbAvatar.classList.add('comment-user-flexbox-element', 'comment-avatar');
        commentTopFbUid.classList.add('comment-user-flexbox-element', 'comment-uid');
        commentTopFbDate.classList.add('comment-user-flexbox-element', 'comment-date');        
        commentBottomContent.classList.add('comment-user-grid-element', 'comment-content');
        //Connect elements
        comment.append(commentUserGrid, commentTopFb, commentBottomContent);
        commentUserGrid.append(commentRate);
        commentRatePlus.append(commentRatePlusObj, commentRatePlusObj);
        commentRateMinus.append(commentRateMinusObj, commentRateMinusObj);
        commentRate.append(commentRatePlus, commentRateValue, commentRateMinus);
        commentTopFb.append(commentTopFbAvatar, commentTopFbUid, commentTopFbDate);
        
        return comment;
    }
    createInteractButtons(type, target) {
        const replyEditDeleteBtn = (btnType) => {
            const commentTopFbBtn = document.createElement('button'),
                commentTopFbBtnImage = document.createElement('object'),
                commentTopFbBtnContent = document.createElement('span');

            commentTopFbBtn.classList.add('comment-user-flexbox-element', `comment-${btnType}`);
            commentTopFbBtnImage.classList.add('interact');
            commentTopFbBtn.type = 'button';
            commentTopFbBtnImage.type = 'image/svg+xml';
            
            commentTopFbBtnImage.data = `images/icon-${btnType}.svg`;
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
    
        tgInd = ts.findIndex((e) => {
            if(gap < e) return true;  //always returns value provided by the function (here 'index found');
        });    
        function timeSlotDefiner(ind) {
            let cInd = (ind === -1)? tsInd.length: ind;
            let gTmp, tailRes;
    
            gTmp = (ind === -1)? 
                Math.round(gap/ts[ts.length - 1]): 
                (ind === 0)? gap: Math.round(gap/ts[ind - 1]);
            tailRes = (gTmp === 1)? ' ago' : 's ago';            
            return gTmp + tsInd[cInd-1] + tailRes;
        }    
        return timeSlotDefiner(tgInd);
    }

}