/**
 * @description: 
 * @param {*} len // 长度
 * @param {*} radix // 基数
 * @return {*} UUID
 */
export function uuid(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}


/* 获取DOM */
export function _q(node) {
    return document.querySelector(node)
}

export function _a(node) {
    return document.querySelectorAll(node)
}

/* url转img对象 */
export function toImage(src) {
    src = typeof (src) === 'string' ? src : getObjectURL(src)
    return new Promise((resolve) => {
        let img = new Image()
        img.src = src
        img.onload = function () {
            resolve(img)
        }
    })

};

// 将base64转换成file对象
export function dataURLtoFile(dataurl, filename = 'file.png') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    let file = new File([u8arr], `${filename}`, {
        type: mime
    })

    return file
}
/*  通过url转file对象（缩放） */
export function zoomImgTool({ url, fileName, width, height }) {
    let suffix = fileName.split('.')[fileName.split('.').length - 1]
    suffix = suffix.replace('jpg', 'jpeg')
    return new Promise((resolve) => {
        var img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            var cvs = document.createElement('canvas');
            var ctx = cvs.getContext('2d');
            cvs.width = width
            cvs.height = height
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
            resolve({ file: dataURLtoFile(cvs.toDataURL(`image/${suffix}`, 1), fileName), err: null })
        }
        img.onerror = function (err) {
            resolve({ file: null, err })
        }
    })
}

// 通过url转file对象（原图）
export function fileImgTool(url, fileName, size = {}) {
    let suffix = fileName.split('.')[fileName.split('.').length - 1]
    suffix = suffix.replace('jpg', 'jpeg')
    return new Promise((resolve) => {
        var img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            var cvs = document.createElement('canvas');
            var ctx = cvs.getContext('2d');
            cvs.width = size.swidth || img.width;
            cvs.height = size.sheight || img.height;
            cvs.sx = size.sx || 0
            cvs.sy = size.sy || 0
            ctx.drawImage(img, cvs.sx, cvs.sy, cvs.width, cvs.height, 0, 0, cvs.width, cvs.height);
            resolve({ file: dataURLtoFile(cvs.toDataURL(`image/${suffix}`, 1), fileName), err: null })
        }
        img.onerror = function (err) {
            resolve({ file: null, err })
        }
    })
}

// 通过字节计算文件大小
export function sizeCount(bytes) {
    var symbols = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var exp = Math.floor(Math.log(bytes) / Math.log(2));
    if (exp < 1) {
        exp = 0;
    }
    var i = Math.floor(exp / 10);
    bytes = bytes / Math.pow(2, 10 * i);

    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2);
    }
    return bytes + " " + symbols[i];
}

// 生成本地图片URL地址
export function getObjectURL(file) {
    let url = null;
    if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }
    return url;
}


/* 图片实际大小尺寸 */
export function sizeTool(file) {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = getObjectURL(file)
        img.onload = function () {
            resolve({
                w: img.naturalWidth,
                h: img.naturalHeight
            })
        }
    })

}

//获取相关CSS属性方法
export function getCss(o, key) {
    let str = o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    return str
};

export function Percentage(num, total) {
    if (num == 0 || total == 0) {
        return 0;
    }
    return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
}

