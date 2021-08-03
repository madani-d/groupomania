const createImage = url => 
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    })
function getRadiantAngle(degreeValue) {
    return (degreeValue * Math.PI) / 100;
}

export default async function getCroppedImg(imageSrc, pixelCrop, rotation=0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadiantAngle(rotation));
    ctx.translate(-safeArea /2, -safeArea /2);

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    return canvas;
}

export const generateDownload = async (imageSrc, crop, imageData) => {
    if (!crop || ! imageSrc) {
        return;
    }
    const { type, name } = imageData
    const canvas = await getCroppedImg(imageSrc, crop);
    function dataURLtoFile(dataurl, filename, type) {
        var arr = dataurl.split(','),
            mime = type,
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }
    const test = dataURLtoFile(canvas.toDataURL(), name, type);
    return test;
};
