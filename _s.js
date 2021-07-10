const fs = require('fs-extra')
const path = require('path')
const sass = require('node-sass');
const uuid = require('uuid').v4;
/* 打包编译 */
module.exports = () => {
    /* 创建临时目录 */
    fs.ensureDir(path.join(__dirname, 'lib'))
    fs.ensureDir(path.join(__dirname, 'temp'))

    /* 生成UUID */
    const id = uuid().replace(/-/g, '');

    /* 模板 */
    let template = fs.readFileSync('src/template.html', 'utf-8')


    /* 读取clip.js，根据uuid生成scoped */
    let clip = fs.readFileSync('src/clip.js', 'utf-8').replace(RegExp("#template#", "g"), template).replace(RegExp("#scoped", "g"), id)

    /* clip.js写入至临时文件 */
    fs.writeFileSync(path.join(__dirname, `temp/clip.js`), clip)

    /* utils.js写入至临时文件 */
    fs.copyFileSync(path.join(__dirname, 'src/utils.js'), path.join(__dirname, 'temp/utils.js'))



    /* 读取scss文件，编译为css */
    var style = sass.renderSync({
        file: path.join(__dirname, 'src/clip.scss'),
        outputStyle: 'expanded', // 压缩
        sourceComments: true, // 行号
    });

    /* 将编译完毕的css文件写入至lib */
    fs.writeFileSync(path.join(__dirname, 'lib/clip.css'), style.css.toString('utf-8').replace(RegExp("#scoped", "g"), id))

}
