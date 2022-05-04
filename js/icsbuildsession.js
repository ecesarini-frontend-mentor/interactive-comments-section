export class BuildSession {
    constructor(jFile) {
        this.jFile = jFile;
        this.jsonData = null;
        this.container = document.querySelector('.comment-container');

        this.btn = this.commentBox = this.commentBoxTextarea = null;

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
        }
        else {
            this.initBS();
        }
    }
    //BUILD section
    initBS() {
        this.drawUp();
        this.listenEvents();
    }
    drawUp() {
        let cmt = this.jsonData.comments;
        
        cmt.forEach( c => {
            this.addElement(c, true, false);
            if(c.replies.length > 0) {
                c.replies.forEach( r => {
                    this.addElement(r, true, true);
                });
            } 
        });
        this.container.append(this.responseSec());
    }
    //EVENT section
    storeEvents(obj) {
        let localJson = JSON.parse(localStorage['dataJson']);

        localJson.comments.push(obj);
        localStorage['dataJson'] = JSON.stringify(localJson);
    }
    listenEvents() {
        this.btn = document.querySelectorAll('button');
        this.commentBox = document.querySelector('.comment-user-add-response');
        this.commentBoxTextarea = document.querySelector('.add-response-textarea');        
        this.btn.forEach( b => b.addEventListener('click', this));
    }
    getCommentObj() {
        function getMaxId(obj) {
            let a = [];
            const getMax = (a,b) => Math.max(a, b);
            obj.comments.forEach( c => {
                a.push(c.id);
                if(c.replies.length > 0) {
                    c.replies.forEach( r => a.push(r.id) );
                }
            });
            return a.reduce(getMax);
        }
        const cuObj = {};
        
        cuObj.id = getMaxId(this.jsonData) + 1; 
        cuObj.content = this.commentBoxTextarea.value;
        cuObj.createdAt = new Date().getSeconds();
        cuObj.score = 0;
        cuObj.user = this.jsonData.currentUser;
        cuObj.replies = [];
        return cuObj;
    }
    //ELEMENT section
    addElement(cmtProp, isBuilding, isReply, insertReplyTarget) {
        let currentUser = JSON.parse(localStorage['dataJson']).currentUser.username;
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
            commentBottomContent = document.createElement('div'),
            //only replies
            commentRepliesLine = document.createElement('div'),
            commentRepliesGrid = document.createElement('div');
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
            //only replies
        commentRepliesGrid.classList.add('comment-user-nested-grid-container');
        commentRepliesLine.classList.add('comment-user-nested-grid-container-line');
        //Connect elements
        comment.append(commentUserGrid, commentTopFb, commentBottomContent);
        commentUserGrid.append(commentRate);
        commentRatePlus.append(commentRatePlusObj, commentRatePlusObj);
        commentRateMinus.append(commentRateMinusObj, commentRateMinusObj);
        commentRate.append(commentRatePlus, commentRateValue, commentRateMinus);
        commentTopFb.append(commentTopFbAvatar, commentTopFbUid, commentTopFbDate);
            //only replies
        commentRepliesGrid.append(commentRepliesLine);

        //Replies functions
        const activeBtn = (btnType) => {
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
        }
        const qualifyUser = (obj) => {
            commentRateValue.innerText = obj.score;
            commentTopFbAvatar.src = obj.user.image.png;
            commentTopFbUid.innerText = obj.user.username;
            commentTopFbDate.innerText = obj.createdAt;
            if(currentUser !== obj.user.username) {
                commentTopFb.append(activeBtn('reply'));
            } else {
                commentTopFb.append(activeBtn('delete'), activeBtn('edit'));
            }
            commentBottomContent.innerText = obj.content;
        }
        
        if(isBuilding) {
            if(isReply) {
                if(!this.container.lastElementChild.matches('.comment-user-nested-grid-container')) {
                    this.container.append(commentRepliesGrid);                
                }
            qualifyUser(cmtProp);
            this.container.lastElementChild.append(comment);  // you gotta involve 'this.container' to let you manage html by javascript
            } else {
                qualifyUser(cmtProp);
                this.container.append(comment);
            }
        } else {
            if(insertReplyTarget){
                qualifyUser(cmtProp);
                insertReplyTarget.after(comment);
            }
        }
    }
    handleEvent(e) {
        let ect = e.currentTarget,
            replyElement = this.container.querySelector('.comment-user-add-response'),
            replyElementBtn = replyElement.querySelector('button'),
            mainGridContainer = ect.closest('.comment-user-main-grid-container');

        switch(e.type) {
            case 'click':
                let cmtProp = this.getCommentObj();
                if(ect.matches('.add-response-send-button') && !replyElement.matches('.comment-user-add-reply')) {
                    this.addElement(cmtProp, false, false);
                    this.container.append(this.commentBox);
                    this.storeEvents(this.getCommentObj()); // order matters to update textarea
                    this.commentBoxTextarea.value = '';
                }
                else if(ect.matches('.comment-reply')) {
                    replyElement.classList.toggle('.comment-user-add-reply');
                    //replyElementBtn.classList.toggle('.add-reply-send-button');
                    replyElement.querySelector('textarea').placeholder = '...Reply';
                    replyElementBtn.innerText = 'REPLY';
                    mainGridContainer.after(replyElement);
                    replyElementBtn.addEventListener('click', () => {
                        this.addElement(cmtProp, false, true, mainGridContainer);
                            replyElement.classList.toggle('.comment-user-add-reply');
                            //replyElementBtn.classList.toggle('.add-reply-send-button');
                            //this.container.append(replyElement);
                    });


                }
                break;
        }
    }

    //responseSec(appendElement) {
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


} 