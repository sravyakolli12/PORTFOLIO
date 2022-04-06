let c = document.getElementById("myCanvas");
let context = c.getContext("2d");

let loadImage = (src, callback) => {
   let img = document.createElement("img");
   img.onload = () => callback(img);
   img.src = src;
};

let imagePath = (frameNum, animation) => {
   return "./finisher/images/"+ animation +"/" + frameNum + ".png";
};

let frames = {
   idle: [1, 2, 3, 4, 5, 6, 7, 8],
   kick: [1, 2, 3, 4, 5, 6, 7],
   punch:[1, 2, 3, 4, 5, 6, 7],
   backward:[1, 2, 3, 4, 5, 6],
   block:[1, 2, 3, 4, 5, 6, 7, 8, 9],
   forward:[1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
   let images = {idle: [], kick: [], punch: [], backward: [], block: [], forward: []};
   let imagesToLoad = 0;

   ["idle", "kick", "punch", "backward", "block", "forward"].forEach((animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNum) => {
         let path = imagePath(frameNum, animation);

         loadImage(path, (image) => {
            images[animation][frameNum - 1] = image;
            imagesToLoad = imagesToLoad - 1;
   
            if(imagesToLoad === 0) {
               callback(images);
            }
         });
      })
   });
};

let animate = (context, images, animation, callback) => {
   images[animation].forEach((image, index) => {
      setTimeout(() => {
         context.clearRect(0, 0, 700, 700);
         context.drawImage(image, 0, 0, 700, 700);
      }, index * 100);
   });
   setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
   let queuedAnimation = [];

   let aux = () => {
      let selectedAnimation;

      if(queuedAnimation.length === 0) {
         selectedAnimation = "idle";
      }
      else{
            selectedAnimation = queuedAnimation.shift();
      }

      animate(context, images, selectedAnimation, aux);
   };
   aux();

   document.getElementById("kick").onclick = () => {
      queuedAnimation.push("kick");
   };

   document.getElementById("punch").onclick = () => {
      queuedAnimation.push("punch");
   };

   document.getElementById("backward").onclick = () => {
      queuedAnimation.push("backward");
   };

   document.getElementById("block").onclick = () => {
      queuedAnimation.push("block");
   };

   document.getElementById("forward").onclick = () => {
      queuedAnimation.push("forward");
   };

   document.addEventListener("keyup", (Event) => {
      const key = Event.key;

      if(key == "ArrowLeft"){
         queuedAnimation.push("kick");
      }
      else if(key == "ArrowRight"){
         queuedAnimation.push("punch");
      }
      else if(key == "ArrowUp"){
         queuedAnimation.push("forward");
      }
      else if(key == "ArrowDown"){
         queuedAnimation.push("backward");
      }
      else if(key == "0"){
         queuedAnimation.push("block");
      }
   });
});
