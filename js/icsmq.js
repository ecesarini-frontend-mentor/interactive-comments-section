import { IcsBuildTools } from "./icsbuildtools.js";

export class IcsMq extends IcsBuildTools {
    constructor() {
        super();
    }
    rearrangeCommentContainer() {
        const cumgc = document.querySelectorAll('.comment-user-main-grid-container'),
            cuar = document.querySelector('.comment-user-add-response');

        cumgc.forEach(c => {
            if(!c.lastElementChild.matches('.comment-user-tail-container, .comment-edited-fb-button-container')) {
                const cumgcTail = document.createElement('div'),
                    cumgcTailActions = document.createElement('div');
                let cScore = c.querySelector('.comment-rate'),
                    cFbBtn = c.querySelectorAll('.comment-user-flexbox-container button');
                
                cumgcTail.classList.add('comment-user-tail-container');
                cumgcTailActions.classList.add('comment-user-tail-container-actions');
                c.append(cumgcTail);
                cumgcTail.append(cScore,cumgcTailActions);
                cFbBtn.forEach(cfb => cumgcTailActions.append(cfb));
            }
        });

        const cuarTail = document.createElement('div');
        cuarTail.classList.add('comment-user-add-response-tail');
        
        cuarTail.append(cuar.querySelector('img'), cuar.querySelector('button'));
        cuar.append(cuarTail);
        
    } 
}