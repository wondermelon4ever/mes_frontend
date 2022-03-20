
var subMenuItemsGroupList = [];

const baseInfoSubMenuItems = [
    {
        type: "ListItem",
        name: '코드관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
        items: [
            {
                type: "ListItem",
                 name: '공통코드',
                 state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'Counter' },
               },
            {
                type: "ListItem",
                name: '다국어',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'TEST-21' },
            }
        ]
    },
    {
        type: "ListItem",
        name: '공정관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: 'BOM관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '설비관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '라벨관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },

]

const materialsSubMenuItems = [
    {
        type: "ListItem",
        name: '자재입출고',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
        items: [
            {
                type: "ListItem",
                name: '입고',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'Counter' },
               },
            {
                type: "ListItem",
                name: '불출',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'TEST-21' },
            },
            {
                type: "ListItem",
                name: '반납',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'TEST-21' },
            }
        ]
    },
    {
        type: "ListItem",
        name: '위치현황',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
        items: [
            {
                type: "ListItem",
                name: '자재위치',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'Counter' },
               },
            {
                type: "ListItem",
                name: '자재위치',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'TEST-21' },
            },
        ]
    },
    {
        type: "ListItem",
        name: '불량관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const equipmentSubMenuItems = [
    {
        type: "ListItem",
        name: '설비관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '금형관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const manufacturingSubMenuItems = [
    {
        type: "ListItem",
        name: '생산계획',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
        items: [
            {
                type: "ListItem",
                 name: '작업지시',
                 state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'Counter' },
               },
            {
                type: "ListItem",
                name: '생산실적',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'TEST-21' },
            }
        ]
    },
    {
        type: "ListItem",
        name: '생산관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
        items: [
            {
                type: "ListItem",
                 name: '생산현황',
                 state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'Counter' },
               },
            {
                type: "ListItem",
                name: '부라부라',
                state: { leftMenuKey: "examplesLeftMenu", fromTemplate: true, selectedName: 'TEST-21' },
            }
        ]
    },
]

const logisticsSubMenuItems = [
    {
        type: "ListItem",
        name: '대차입고',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '대차출고',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '출하관리',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const qualitySubMenuItems = [
    {
        type: "ListItem",
        name: '홀딩현황',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const dashboardSubMenuItems = [
    {
        type: "ListItem",
        name: '종합현황',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '생산현황',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '출하현황',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
    {
        type: "ListItem",
        name: '창고현황',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const monitoringSubMenuItems = [
    {
        type: "ListItem",
        name: '실시간 모니터링',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const reportSubMenuItems = [
    {
        type: "ListItem",
        name: '정기보고서',
        state: { viewId: 'bodyMainView' },
        Icon: undefined, 
    },
]

const createSubMenuGroupList = () => {
    subMenuItemsGroupList.push(baseInfoSubMenuItems);
    subMenuItemsGroupList.push(materialsSubMenuItems);
    subMenuItemsGroupList.push(equipmentSubMenuItems);
    subMenuItemsGroupList.push(manufacturingSubMenuItems);
    subMenuItemsGroupList.push(logisticsSubMenuItems);
    subMenuItemsGroupList.push(qualitySubMenuItems);
    subMenuItemsGroupList.push(dashboardSubMenuItems);
    subMenuItemsGroupList.push(monitoringSubMenuItems);
    subMenuItemsGroupList.push(reportSubMenuItems);

    return subMenuItemsGroupList;
}

export {
    createSubMenuGroupList
}
