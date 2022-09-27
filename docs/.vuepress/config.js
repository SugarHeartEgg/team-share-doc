module.exports = {
    title: 'SAAS【前端】周分享文档',
    description: '每周例行文档',
    port: 7086,
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        // subSidebar: 'auto', // auto | none
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'TEAM GitHub Doc',
                items: [
                    { text: 'Github 连怡恒', link: 'https://github.com/SugarHeartEgg' },
                    { text: 'Github 吴月琴', link: '' },
                    { text: 'Github 焦自强', link: '' },
                    { text: 'Github 罗鑫', link: '' },
                ]
            }
        ],
        sidebar: [
            {
                title: '简介',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "文件简介", path: "/README" },
                ]
            },
            {
                title: "连怡恒",
                path: '/PEOPLE-LianYiHeng/demo',
                collapsable: false, // 不折叠
                children: [
                    { title: "个人信息", path: "/PEOPLE-LianYiHeng/demo" },
                    { title: "技术选型？", path: "/PEOPLE-LianYiHeng/2022/July/2022-07-13" },
                    { title: "Ts的使用!", path: "/PEOPLE-LianYiHeng/2022/September/2022-09-27" },
                ],
            },
            {
                title: "吴月琴",
                path: '/PEOPLE-WuYueQin/demo',
                collapsable: false, // 不折叠
                children: [
                    { title: "个人信息", path: "/PEOPLE-WuYueQin/demo" },
                    { title: "敬请期待", path: "/PEOPLE-WuYueQin/2022/July/2022-07-13" },
                ],
            },
            {
                title: "焦自强",
                path: '/PEOPLE-JiaoZiQiang/demo',
                collapsable: false, // 不折叠
                children: [
                    { title: "个人信息", path: "/PEOPLE-JiaoZiQiang/demo" },
                    { title: "敬请期待", path: "/PEOPLE-JiaoZiQiang/2022/July/2022-07-13" },
                ],
            },
            {
                title: "罗鑫",
                path: '/PEOPLE-LuoXin/demo',
                collapsable: false, // 不折叠
                children: [
                    { title: "个人信息", path: "/PEOPLE-LuoXin/demo" },
                    { title: "敬请期待", path: "/PEOPLE-LuoXin/2022/July/2022-07-13" },
                ],
            },
            {
                title: "组件文档",
                path: '/doc-components/public',
                collapsable: false, // 不折叠
                children: [
                    { title: "公共组件", path: "/doc-components/public" },
                ]
            },
            {
                title: "方法文档",
                path: '/doc-utils/public',
                collapsable: false, // 不折叠
                children: [
                    { title: "公共方法", path: "/doc-utils/public" },
                ]
            },
        ]
    }
}