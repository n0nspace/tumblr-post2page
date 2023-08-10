function buildArray(json) {
  const posts = json.posts;
  let cards = [];

  if (posts.length > 0) {
      let card = {};
      
      for (let id in posts) {
          card = {};
          let pid = posts[id];
          
          let html = pid["regular-body"];
          let elem = document.createElement("div"); /*im creating it here...*/
          let fakeDom = new DOMParser().parseFromString(html, 'text/html');
          let postID = pid.id;
          
          /*get first image*/
          let postImage = fakeDom.getElementsByTagName('img');
          if (postImage.length > 0) {
              postImage = fakeDom.getElementsByTagName('img')[0].src;
          } else {
              postImage = "";
          }
          
          card["img"] = postImage;
          /*console.log(postImage);*/
          
          /*get subtitle*/
          let postSub = fakeDom.getElementsByTagName("blockquote");
          if (postSub.length > 0) {
              postSub = postSub[0].innerText;
          } else {
              postSub = "";
          }
          
          card["subtitle"] = postSub;
          /*console.log(postSub)*/
          
          /*get details*/
          let postDetailsWrap = fakeDom.querySelectorAll(".npf_chat");
           if (postDetailsWrap.length > 0) {
              postDetailsWrap = postDetailsWrap[0];
              
              let details = postDetailsWrap.getElementsByTagName('b');
              let details2 = postDetailsWrap.getElementsByTagName('i');
              let keys; 
              let values;
              
              for (i = 0; i < details.length; i++) {
                 if (details[i] === undefined) {
                  keys = " ";
                 } else {
                  keys = details[i].innerText.replace(/\s|:/g,"");
                 }
                 if (details2[i] === undefined) {
                   values = " ";
                 } else {
                   values = details2[i].innerText;
                 }
                
                 card[keys] = values;
              }
          } else {
              postDetailsWrap = "";
          }
          
          
          
          /*get link*/
          let postLink = fakeDom.getElementsByTagName("a");
          if (postLink.length > 0) {
              let len = postLink.length - 1;
              console.log(len);
              postLink = postLink[len].href;
          } else {
              postLink = "";
          }
          
          card["link"] = postLink;
          /*console.log(postLink);*/
          
          /*get description*/
          let postDesc = fakeDom.querySelectorAll('.npf_chat + p');
          if (postDesc.length > 0) {
              postDesc = postDesc[0].innerHTML;
          } else {
              postDesc = "";
          }
          
          card["description"] = postDesc;
          /*console.log(postDesc);*/
         
         
         /*get tags*/
         let postTags = pid.tags;
         
         card["tags"] = postTags;
         /*console.log(postTags);*/
         
         cards[id] = card;
         //card = {};*/
         
        
         //console.log(card);
          
      } //end for
  }//end if 
  
  return cards;
}
