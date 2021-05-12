// window.onload=function() {
//   let file=document.getElementById("input_file");
//   let img=document.getElementsByClassName("img")[0];
//   file.onchange=function() {
//     let dataURL=window.URL.createObjectURL(file.files[0]);
//     img.setAttribute("src",dataURL);
//   }    
//   let canvas=document.getElementById("canvas");
//   showColorInfo(canvas,img,.1)
// }
function showColorInfo(canvas, img, scalePower) {
  // let canvas=document.getElementById("canvas");
  let context = canvas.getContext('2d');
  let imgData = null;
  let pixels = [];
  img.style.display = "block";
  let canvasWidth = 0;
  let canvasHeight = 0;
  let offsetLeft;
  let offsetTop;
  let scrollTop;
  let infoTextR=document.getElementsByClassName("info_text")[0];
  let infoTextG=document.getElementsByClassName("info_text")[1];
  let infoTextB=document.getElementsByClassName("info_text")[2];
  let infoTextA=document.getElementsByClassName("info_text")[3];
  let infoImgR=document.getElementsByClassName("info_img")[0];
  let infoImgG=document.getElementsByClassName("info_img")[1];
  let infoImgB=document.getElementsByClassName("info_img")[2];
  let showBox=document.getElementsByClassName("show_box")[0];
  let box=document.getElementsByClassName("left")[0];

  img.addEventListener("load", function () {
    this.style.display="block";
    canvas.width = img.clientWidth * scalePower;
    canvas.height = img.clientHeight * scalePower;
    this.style.display = "none";
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    // console.log(canvasWidth);
  })
  img.addEventListener("load", function () {
    context.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    offsetTop = canvas.offsetTop;
    offsetLeft = canvas.offsetLeft;
    imgData = context.getImageData(0, 0, canvasWidth, canvasHeight)
    let imgDataArray = imgData.data;
    for (let i = 0; i < imgDataArray.length; i += 4) {
      pixels.push({
        r: imgDataArray[i],
        g: imgDataArray[i + 1],
        b: imgDataArray[i + 2],
        a: imgDataArray[i + 3],
        xCoordinate: (i / 4) % canvasWidth + offsetLeft,
        yCoordinate: offsetTop + Math.floor(((i / 4) / canvasWidth))
      })
    }
    // console.log(imgData);
  })
  function printRBGa(r, g, b, a, xCoordinate, yCoordinate) {
    console.log(`R:${r}\nG:${g}\nB:${b}\na:${a}\nX:${xCoordinate},Y:${yCoordinate}`);
  }

  // canvas.addEventListener("click",function(event){
  //   // console.log(eventType)

  // })
  canvas.addEventListener("click", function (event) {
    scrollTop = Number.parseInt(document.documentElement.scrollTop, 0);
    // printRBGa(pixel  s[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].r,
    //   pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].g,
    //   pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].b,
    //   pixels[(event.clientY + scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft].a,
    //   event.clientX,
    //   event.clientY + scrollTop);
    infoTextR.innerHTML=pixels[(event.clientY + scrollTop + box.scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft+box.scrollLeft].r;
    infoTextG.innerHTML=pixels[(event.clientY + scrollTop + box.scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft+box.scrollLeft].g;
    infoTextB.innerHTML=pixels[(event.clientY + scrollTop + box.scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft+box.scrollLeft].b;
    infoTextA.innerHTML=pixels[(event.clientY + scrollTop + box.scrollTop - offsetTop) * canvasWidth + event.clientX + offsetLeft+box.scrollLeft].a;
    infoImgR.style.backgroundColor=`rgba(${infoTextR.innerHTML},0,0,0)`;
    infoImgG.style.backgroundColor=`0,rgba(${infoTextG.innerHTML},0)`;
    infoImgB.style.backgroundColor=`0,0,rgba(${infoTextB.innerHTML})`;
    showBox.style.backgroundColor=`rgba(${infoTextR.innerHTML},${infoTextG.innerHTML},${infoTextB.innerHTML},${infoTextA.innerHTML})`
  })
}
