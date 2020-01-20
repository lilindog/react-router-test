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
        deep: 0,
        transition: false
    }
    uniqueid = 0;
    id: number = 0;
    prevPathname: string = "";
    state: State = {
        pages: []   
    }
    prevPage: Page = null;
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
        console.log(`%c [deep: ${(this as any).props.deep}]%c : %c ${str}`, "color: green", "color: red", "color: black; font-weight: 900");
    }

    init (): any {
        history.on("change", () => {
            const newPath: string = this.getRoutePath();
            this.log("change触发：" + newPath);
            if (newPath === this.prevPathname) {
                this.log("change与上次pathname相同，不予动作！");
                return;
            } else {
                this.prevPathname = newPath;
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
        const hasTransition: boolean = (this as any).props.transition;
        let oldPage: Page = this.prevPage;
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

        // if (oldPage === newPage) oldPage = undefined;

        //过渡动画参照设定
        if ((this as any).props.transition && (newPage !== oldPage)) {
            if (oldPage) {
                oldPage.$UNIQUEID = this.buildUniqueid();
                oldPage.$ANIMATION = LEAVE_CLASS;
                oldPage.$DISPLAY = true;
                !pages.includes(oldPage) && pages.push(oldPage);
            }
            newPage && (newPage.$ANIMATION = ENTER_CLASS);
        }

        newPage && (newPage.$UNIQUEID = this.buildUniqueid());

        let is404 = false;

        if (pageInPages) {
            (this as any).log(1);
            if (!hasTransition) pageInPages.$DISPLAY = true;
        }
        else if (pageInRoutes) {
            (this as any).log(2);
            if (!hasTransition) pageInRoutes.$DISPLAY = true;
            pages.push(pageInRoutes);
        }
        else if (error404 && path !== "") {
            (this as any).log(3);
            is404 = true;
            if (!hasTransition) error404.$DISPLAY = true;
            error404.$UNIQUEID = this.buildUniqueid();
            error404.$ANIMATION = ENTER_CLASS;
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
                //404页面动画
                if (is404) {
                    this.prevPage = error404;
                    (this as any).refs[error404.$UNIQUEID].style.display = "block";
                    (this as any).refs[error404.$UNIQUEID].style.animation = `router-enter ${ANIMATION_TIME / 1000}s`;
                } 
                //正常离去、进入动画
                else if (oldPage) {
                    //离去动画
                    if (oldPage) {
                        (this as any).refs[oldPage.$UNIQUEID].style.animation = `router-leave ${ANIMATION_TIME / 1000}s`;
                    }
                    //进入动画
                    setTimeout(() => {
                        if (oldPage) {
                            ((this as any).refs[oldPage.$UNIQUEID].style.display = "none");
                        }
                        if (newPage) {
                            this.prevPage = newPage;
                            (this as any).refs[newPage.$UNIQUEID].style.display = "block";
                            (this as any).refs[newPage.$UNIQUEID].style.animation = `router-enter ${ANIMATION_TIME / 1000}s`;
                        } else {
                            this.prevPage = null;
                        }
                    }, ANIMATION_TIME);
                } 
                //仅有进入页面时候的进入动画
                else {
                    if (newPage) {
                        this.prevPage = newPage;
                        (this as any).refs[newPage.$UNIQUEID].style.display = "block";
                        (this as any).refs[newPage.$UNIQUEID].style.animation = `router-enter ${ANIMATION_TIME / 1000}s`;
                    } else {
                        this.prevPage = null;
                    }
                }
            }
        });
    }

    /**
     * 获取当前路由url 不包含basename 
     */
    getRoutePath (): string {
        const deep = (this as any).props.deep;
        let pathname: string = location.pathname;
        pathname = pathname.replace(/^\//, "");
        if (!pathname.indexOf("?")) {
            pathname = pathname.split("?")[0];
        }
        const pathArr: string[] = pathname.split("\/");
        return pathArr[deep] ? pathArr[deep] : "";
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