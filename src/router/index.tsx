import Page1 from "../pages/page1";
import Page2 from "../pages/page2";
import Page3 from "../pages/page3";

import Pagex from "../pages/pagex";
import Pagey from "../pages/pagey";
import Pagez from "../pages/pagez";

import error404 from "../pages/error404";

export default [
    {
        title: "页面1",
        path: "/page1",
        component: Page1,
        keepAlive: true,
        children: [
            {
                path: "/pagex",
                component: Pagex,
                keepAlive: !true
            },
            {
                path: "/pagey",
                component: Pagey
            },
            {
                path: "/pagez",
                component: Pagez
            },
            {
                path: "*",
                component: error404
            }
        ]
    },
    {
        title: "页面2",
        path: '/page2',
        component: Page2,
        children: []
    },
    {
        title: "页面3",
        path: '/page3',
        component: Page3,
        children: []
    },
    {
        path: "*",
        component: error404
    }
]