import { reactive } from "vue";
import { uuid } from '../Utils/Tool'

interface Children {
    title: string
    id: string,
    checked: boolean,
    path?: string,
    oneKey?: string
}

interface Menu {
    title: string,
    icon: string,
    id: string,
    checked: boolean,
    path?: string,
    open: boolean,
    children?: Children[],
    oneKey?: string
}

export const _menus: Menu[] = [
    {
        title: "个人空间",
        icon: "icon-home",
        path: '/CloudFiles',
        oneKey: 'CloudFiles',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: []
    },
    {
        title: "公司共享",
        icon: "icon-home",
        path: '/CloudFiles',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: []
    },
    {
        title: "部门共享",
        icon: "icon-huabanfuben",
        path: '/CloudFileClass/img',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: [
            {
                title: '产品研发部',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
            {
                title: '数字化运营部',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
        ]
    },
    {
        title: "公司成员",
        icon: "icon-huabanfuben",
        path: '/CloudFileClass/img',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: [
            {
                title: '于庆应',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
            {
                title: '李少华',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
            {
                title: '黄华麒',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
        ]
    },
    {
        title: "系统设置",
        icon: "icon-huabanfuben",
        path: '/CloudFileClass/img',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: [
            {
                title: '角色管理',
                oneKey: 'roleControl',
                path: '/roleControl',
                checked: false,
                id: uuid(32, 32)
            },
            {
                title: '用户管理',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
            {
                title: '部门管理',
                path: '/CloudFiles',
                checked: false,
                id: uuid(32, 32)
            },
        ]
    },
    {
        title: "最近浏览",
        icon: "icon-home",
        path: '/CloudFiles',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: []
    },
    {
        title: "外链分享",
        icon: "icon-home",
        path: '/CloudFiles',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: []
    },
    {
        title: "回收站",
        icon: "icon-home",
        path: '/CloudFiles',
        open: false,
        checked: false,
        id: uuid(32, 32),
        children: []
    },
]





// const _menus: Menu[][] = [
//     [
//         {
//             title: "传输列表",
//             icon: "icon-home",
//             activeIndex: '0',
//             index: 0,
//             path: "/CloudDataTransmission",
//         }
//     ],
//     [
//         {
//             title: "主目录",
//             icon: "icon-home",
//             activeIndex: '1',
//             path: '/CloudFiles',
//             suffixs: []
//         },
//         {
//             title: "视频",
//             icon: "icon-shipin1",
//             activeIndex: '2',
//             path: '/CloudFileClass/video',
//             suffixs: ['mp4,flv,avi']
//         },
//         {
//             title: "图片",
//             icon: "icon-huabanfuben",
//             activeIndex: '3',
//             path: '/CloudFileClass/img',
//             suffixs: ['png', 'jpg', 'jpeg', 'webp', 'gif']
//         },
//         {
//             title: "文档",
//             icon: "icon-wendang2",
//             activeIndex: '4',
//             path: '/CloudFileClass/office',
//             suffixs: ['pdf', 'docx', 'md', 'xlsx']
//         },
//         {
//             title: "压缩包",
//             icon: "icon-yasuobao",
//             activeIndex: '5',
//             path: '/CloudFileClass/zip',
//             suffixs: ['zip', 'rar', '7z', 'gz', 'xz', 'tar']
//         },
//     ],
//     [
//         {
//             title: "Java",
//             icon: "icon-3lishi",
//             activeIndex: '6',
//             path: '/CloudFileClass/java',
//             suffixs: ['java', 'class', 'jar']
//         },
//         {
//             title: "JavaScript",
//             icon: "icon-home",
//             activeIndex: '7',
//             path: '/CloudFileClass/js',
//             suffixs: ['js']
//         },
//         {
//             title: "Vue",
//             icon: "icon-home",
//             activeIndex: '8',
//             path: '/CloudFileClass/vue',
//             suffixs: ['vue']
//         },
//         {
//             title: "JSON",
//             icon: "icon-home",
//             activeIndex: '9',
//             path: '/CloudFileClass/json',
//             suffixs: ['json']
//         },
//         {
//             title: "样式文件",
//             icon: "icon-home",
//             activeIndex: '10',
//             path: '/CloudFileClass/style',
//             suffixs: ['css', 'scss', 'style', 'less']
//         },
//     ],
// ];
