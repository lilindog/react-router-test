/// <reference path="./index.d.ts" /> 

import React from "react";
import "./less/index.less";
import history from "./lib/History.class.js";

let 
ID: number = 0,
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
        this.id = (++ID);
        this.init();    
    }

    buildUniqueid (): string {
        if (this.uniqueid > Number.MAX_SAFE_INTEGER) this.uniqueid = 0;
        this.uniqueid ++;
        return `UNIQUEID-${this.id}-${this.uniqueid}`;
    }

    log (str: string): void {
        DEBUG && 
        console.log(`%c [${this.id}]%c : %c ${str}`, "color: green", "color: red", "color: black; font-weight: 900");
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
        error404:     Page = routes.find((page: Page): boolean => page.path === "*");

        //过渡动画参照设定
        if ((this as any).props.transition) {
            if (oldPage) {
                oldPage.$UNIQUEID = this.buildUniqueid();
                oldPage.$DISPLAY = true;
                !pages.includes(oldPage) && pages.push(oldPage);
            }
            if (pageInPages) {
                pageInPages.$UNIQUEID = this.buildUniqueid();
                pageInPages.$ANIMATION = ENTER_CLASS;
            }
            if (pageInRoutes) {
                pageInRoutes.$UNIQUEID = this.buildUniqueid();
                pageInRoutes.$ANIMATION = ENTER_CLASS;
            }
        }

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

        (this as any).log("pages ===>");
        console.log(pages);

        this.setState({pages: pages}, () => {
            if ((this as any).props.transition) {
                console.log("哦，泻特妈惹法克！");

                let oldPageEle = null;
                const 
                newPage = pageInRoutes || pageInPages,
                newPageEle = document.getElementById(newPage.$UNIQUEID);
                newPageEle.style.animation = `router-enter 1s`;
                if (oldPage) {
                    newPageEle.style.animation = `router-enter 1s ease 1s`;
                    oldPageEle = document.getElementById(oldPage.$UNIQUEID);
                    oldPageEle.style.animation = `router-leave 1s`;
                }
                setTimeout(() => {
                    newPageEle.style.animation = "";
                    delete newPage.$UNIQUEID;
                    if (oldPage) {
                        oldPageEle.style.display = "none";
                        delete oldPage.$UNIQUEID;
                        oldPageEle.style.animation = "";
                        if (!oldPage.keepAlive) {
                            document.body.removeChild(oldPageEle);
                        }
                    }
                }, 1000);

                
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
                        id={page.$UNIQUEID}
                        className="router-inwrap"
                        style={{
                            display: page.$DISPLAY ? "block" : "none"
                        }}
                        >
                            <page.component history={history} route={page}/>
                        </div>
                    );
                })}
            </div>
        );
    }

}