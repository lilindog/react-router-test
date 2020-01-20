/// <reference path="./index.d.ts" /> 

import React from "react";
import "./less/index.less";
import history from "./lib/History.class.js";

let 
DEBUG: boolean = true,
LEAVE_CLASS = "router-leave",
ENTER_CLASS = "router-enter",
ANIMATION_TIME = 300;

export default class MyRouter extends React.Component {
    static defaultProps: Props = {
        routes: [],
        basename: "",
        transition: false
    }
    uniqueid = 0;
    id: number = 0;
    prevPathname: string = "";
    state: State = {
        pages: []   
    }
    constructor (props: any) {
        super(props);
        this.init();    
    }

    buildUniqueid (): string {
        if (this.uniqueid > Number.MAX_SAFE_INTEGER) this.uniqueid = 0;
        this.uniqueid ++;
        return `UNIQUEID-${this.id}-${this.uniqueid}`;
    }

    log (str: string): void {
        DEBUG && 
        console.log(`%c [${(this as any).props.basename ? (this as any).props.basename : "/"}]%c : %c ${str}`, "color: green", "color: red", "color: black; font-weight: 900");
    }

    init (): any {
        history.on("change", () => {
            this.log("change触发：" + location.pathname);
            if (location.pathname === this.prevPathname) {
                this.log("change与上次pathname相同，不予动作！");
                return;
            } else {
                this.prevPathname = location.pathname;
            }
            this.changePage();
        });
        history.on("push", () => history.emit("change"));
        history.on("back", () => history.emit("change"));
    }
    
    resetPages (): void {
        this.state.pages.forEach((page: Page): void => {
            page.$DISPLAY = false;
            delete page.$ANIMATION;
        });
        this.state.pages = this.state.pages.filter((page: Page): boolean => page.keepAlive);
    }

    find (page: Page): boolean {
        const path: string = (this as any).getRoutePath();
        if (page.path instanceof RegExp) {
            return page.path.test(path);
        } else {
            return page.path.replace("\/", "") === path;
        }
    }

    changePage (): void {
        const oldPage: Page = this.state.pages.find((page: Page): boolean => page.$DISPLAY);

        this.resetPages();

        const 
        path:   string = (this as any).getRoutePath(),
        pages:  Page[] = (this as any).state.pages, 
        routes: Page[] = (this as any).props.routes;
        
        const 
        pageInPages:  Page = pages.find((page: Page): boolean => this.find(page)),
        pageInRoutes: Page = routes.find((page: Page): boolean => this.find(page)),
        error404:     Page = routes.find((page: Page): boolean => page.path === "*"),
        newPage = pageInRoutes || pageInPages;

        //过渡动画参照设定
        if ((this as any).props.transition && (newPage !== oldPage)) {
            if (oldPage) {
                oldPage.$UNIQUEID = this.buildUniqueid();
                oldPage.$ANIMATION = LEAVE_CLASS;
                oldPage.$DISPLAY = true;
                !pages.includes(oldPage) && pages.push(oldPage);
            }
            newPage.$ANIMATION = ENTER_CLASS;
        }

        newPage && (newPage.$UNIQUEID = this.buildUniqueid());

        if (pageInPages) {
            (this as any).log(1);
            pageInPages.$DISPLAY = true;
        }
        else if (pageInRoutes) {
            (this as any).log(2);
            pageInRoutes.$DISPLAY = true;
            pages.push(pageInRoutes);
        }
        else if (error404 && path !== "") {
            (this as any).log(3);
            error404.$DISPLAY = true;
            pages.push(error404);
        } 
        else {
            DEBUG && this.log("页面没有被匹配到");
        }

        (this as any).log("哦，谢特妈惹法克！");
        console.log("旧页面：");
        console.log(oldPage);
        console.log("当前：页面集合： ");
        console.log(pages);

        this.setState({pages: pages}, () => {
            if ((this as any).props.transition) {
                if (!oldPage) {
                    if (newPage) {
                        (this as any).refs[newPage.$UNIQUEID].style.display = "block";
                        (this as any).refs[newPage.$UNIQUEID].style.animation = `router-enter ${ANIMATION_TIME / 1000}s`;
                    }
                } else {
                    //开始离开动画
                    if (oldPage) {
                        (this as any).refs[oldPage.$UNIQUEID].style.animation = `router-leave ${ANIMATION_TIME / 1000}s`;
                    }
                    //取消显示离开页面， 并开始进入页面的显示
                    setTimeout(() => {
                        if (oldPage) {
                            oldPage.$DISPLAY = false;
                            ((this as any).refs[oldPage.$UNIQUEID].style.display = "none");
                        }
                        
                        if (newPage) {
                            (this as any).refs[newPage.$UNIQUEID].style.display = "block";
                            (this as any).refs[newPage.$UNIQUEID].style.animation = `router-enter ${ANIMATION_TIME / 1000}s`;
                        }
                    }, ANIMATION_TIME);
                    //删除离开旧页面
                    setTimeout(() => {
                        if (newPage) {
                            // newPage.$DISPLAY = false;
                            // oldPage && console.dir((this as any).refs[oldPage.$UNIQUEID])
                            // oldPage && document.body.removeChild((this as any).refs[oldPage.$UNIQUEID]);
                        }
                    }, ANIMATION_TIME * 2);
                }
            }
        });
    }

    /**
     * 获取当前路由url 不包含basename 
     */
    getRoutePath (): string {
        let 
        basename: string = (this as any).props.basename,
        pathname: string = location.pathname;
        pathname = pathname.replace(basename, "");
        pathname = pathname.replace(/^\//, "");
        if (~pathname.indexOf("\/")) {
            pathname = pathname.split("\/")[0];
        }
        return pathname.replace(/\//, "");
    }

    componentDidMount (): void {
        history.emit("change");
    }

    render (): any {
        const 
        state: State = (this as any).state, 
        props: Props = (this as any).props;

        return (
            <div className="router-wrap" ref="router-wrap">
                {state.pages.map((page: Page): any => {
                    return (
                        <div
                        key={page.$UNIQUEID}
                        ref={page.$UNIQUEID}
                        className="router-inwrap"
                        style={{display: page.$DISPLAY ? "block" : "none"}}
                        >
                            <page.component history={history} route={page}/>
                        </div>
                    );
                })}
            </div>
        );
    }

}