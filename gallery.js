const dir = './media/img/';
var images = ['', 
''];

document.getElementById("viewer").onclick = function () {
    document.getElementById("viewer").style.display = "none";
};

window.onload = function() {
    shuffle(images);
    //doFullRandomGallery(document.getElementById('content'), 1);
    doPartRandomGallery(document.getElementById('content'), 1);
}

function makeGalleryElement(i, col_st, col_end, row_st, row_end) {
    var temp = document.createElement("div");
    temp.className = "gal-image";
    temp.style.gridColumnStart = col_st;
    temp.style.gridColumnEnd = col_end;
    temp.style.gridRowStart = row_st;
    temp.style.gridRowEnd = row_end;
    temp.onclick = function () {
        var view = document.getElementById("viewer");
        view.style.display = "block";
        view.style.backgroundImage = "url(\"" + dir + images[i] + "\")";
        setLeftRight(i);
    };
    var inn = document.createElement("div");
    inn.className = "gal-inner";
    inn.style.backgroundImage = "url(\"" + dir + images[i] + "\")";
    temp.appendChild(inn);
    return temp;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function setLeftRight(i) {
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    if(i > 0) {
        left.onclick = function () {
            event.stopPropagation();
            document.getElementById("viewer").style.backgroundImage = "url(\"" + dir + images[i - 1] + "\")";
            setLeftRight(i - 1);
        };
    } else {
        left.onclick = function () {
            event.stopPropagation();
            document.getElementById("viewer").style.backgroundImage = "url(\"" + dir + images[images.length - 1] + "\")";
            setLeftRight(images.length - 1);
        };
    }
    if(i < images.length - 1) {
        right.onclick = function () {
            event.stopPropagation();
            document.getElementById("viewer").style.backgroundImage = "url(\"" + dir + images[i + 1] + "\")";
            setLeftRight(i + 1);
        };
    } else {
        right.onclick = function () {
            event.stopPropagation();
            document.getElementById("viewer").style.backgroundImage = "url(\"" + dir + images[0] + "\")";
            setLeftRight(0);
        };
    }
}

function doPatternOneImage(target, i, row_base) {
    //add one 2x3 element
    target.appendChild(makeGalleryElement(i, 1, 4, row_base, row_base + 2));
    return row_base + 2;
}

function doPatternTwoImages(target, i, row_base) {
    // add one 2x1 element
    target.appendChild(makeGalleryElement(i, 1, 2, row_base, row_base + 2));
    i++;
    // add one 2x2 element
    target.appendChild(makeGalleryElement(i, 2, 4, row_base, row_base + 2));
    return row_base + 2;
}

function doPatternThreeImages1(target, i, row_base) {
    //add one 2x2 element
    target.appendChild(makeGalleryElement(i, 1, 3, row_base, row_base + 2));
    i++;
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 3, 4, row_base, row_base + 1));
    i++;
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 3, 4, row_base + 1, row_base + 2));
    return row_base + 2;
}

function doPatternThreeImages2(target, i, row_base) {
    //add one 1x2 element
    target.appendChild(makeGalleryElement(i, 1, 3, row_base, row_base + 1));
    i++;
    //add one 1x2 element
    target.appendChild(makeGalleryElement(i, 1, 3, row_base + 1, row_base + 2));
    i++;
    //add one 2x1 element
    target.appendChild(makeGalleryElement(i, 3, 4, row_base, row_base + 2));
    return row_base + 2;
}

function doPatternThreeImages3(target, i, row_base) {
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 1, 2, row_base, row_base + 1));
    i++;
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 2, 3, row_base, row_base + 1));
    i++;
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 3, 4, row_base, row_base + 1));
    return row_base + 1;
}

function doPatternFourImages(target, i, row_base) {
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 1, 2, row_base, row_base + 1));
    i++;
    //add one 1x2 element
    target.appendChild(makeGalleryElement(i, 2, 4, row_base, row_base + 1));
    row_base += 1;
    i++
    //add one 1x2 element
    target.appendChild(makeGalleryElement(i, 1, 3, row_base, row_base + 1));
    i++
    //add one 1x1 element
    target.appendChild(makeGalleryElement(i, 3, 4, row_base, row_base + 1));
    return row_base + 1;
}

function doFullRandomGallery(target, row_base) {
    for(var i = 0; i < images.length; i++) {
        switch(Math.floor(Math.random() * Math.min(4, images.length - i)) + 1){
            case 1:
                //add one 2x3 element
                row_base = doPatternOneImage(target, i, row_base);
                break;
            case 2:
                row_base = doPatternTwoImages(target, i, row_base);
                i++;
                break;
            case 3:
                switch(Math.floor(Math.random() * 3)) {
                    case 2:
                        row_base = doPatternThreeImages1(target, i, row_base);
                        break;
                    case 1:
                        row_base = doPatternThreeImages2(target, i, row_base);
                        break;
                    default:
                        row_base = doPatternThreeImages3(target, i, row_base);
                        break;
                }
                i += 2;
                break;
            default:
                row_base = doPatternFourImages(target, i, row_base);
                i += 3;
                break;
        }
    }
    return row_base;
}

function doPartRandomGallery(target, row_base) {
    var pattern = [1, 2, 3, 4, 5, 6];
    shuffle(pattern);
    var i = 0, j = 0;
    while(images.length - i > 4) {
        //semi-random pattern for most images
        if(j >= pattern.length) {
            shuffle(pattern);
            j = 0;
        }
        switch (pattern[j]){
            case 1:
                row_base = doPatternOneImage(target, i, row_base);
                i++;
                break;
            case 2:
                row_base = doPatternTwoImages(target, i, row_base);
                i += 2;
                break;
            case 3:
                row_base = doPatternThreeImages1(target, i, row_base);
                i += 3;
                break;
            case 4:
                row_base = doPatternThreeImages2(target, i, row_base);
                i += 3;
                break;
            case 5:
                row_base = doPatternThreeImages3(target, i, row_base);
                i += 3;
                break;
            default:
                row_base = doPatternFourImages(target, i, row_base);
                i += 4;
                break;
        }
        j++;
    }
    //preselected pattern for the rest of images
    switch(images.length - i){
        case 4:
            row_base = doPatternFourImages(target, i, row_base);
            break;
        case 3:
            switch(Math.floor(Math.random() * 3)) {
                case 2:
                    row_base = doPatternThreeImages1(target, i, row_base);
                    break;
                case 1:
                    row_base = doPatternThreeImages2(target, i, row_base);
                    break;
                default:
                    row_base = doPatternThreeImages3(target, i, row_base);
                    break;
            }
            break;
        case 2:
            row_base = doPatternTwoImages(target, i, row_base);
            break;
        default:
            row_base = doPatternOneImage(target, i, row_base);
            break;
    }
    return row_base;
}