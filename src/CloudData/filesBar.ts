interface bar {
    title: string
    click: string,
    size: string,
    bgColor: string,
    txtColor: string,
}
const bars: bar[] = [
    {
        title: '文件上传',
        click: 'SimplyUpload',
        size: '16px',
        bgColor: '#f5f5f5', txtColor: '#333'
    },
    {
        title: '复制',
        click: 'copy',
        size: '16px',
        bgColor: '#F08080', txtColor: '#fff'
    },
    {
        title: '移动',
        click: 'mobile',
        size: '16px',
        bgColor: '#BC8F8F', txtColor: '#fff'
    },
    {
        title: '删除',
        click: 'deleteFile',
        size: '16px',
        bgColor: 'red', txtColor: '#fff'
    },
]

export default bars