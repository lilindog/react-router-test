/// <reference path="./index.d.ts" /> 

import React from "react";
import "./less/index.less";
import history from "./lib/History.class.js";
import { deepClone } from "./lib/tools.js";

let 
DEBUG: boolean = true,
LEAVE_CLASS = "router-leave",
ENTER_CLASS = "router-enter",
ANIMATION_TIME = 1000;

export default class MyRouter extends React.Component {
    static defaultProps: Props = {
        routes: [],
        deep: 0,
        transition: false
    }
    uniqueid = 0;
    prevPathname: string = "";
    state: State = {
        pages: []   
    }
    prevPage: Page = null;
    constructor (props: any) {
        super(props);
        this.state.pages = this.clonePages();
        this.init();    
    }

    //克隆page， 并为每个page设置唯一id
    clonePages (): Page[] {
        console.log((this as any).props.routes);
        const pages: Page[] = deepClone((this as any).props.routes);
        pages.forEach((page: Page): void => {
            page.$UNIQUEID = this.buildUniqueid();
        });
        return pages;
    }

    buildUniqueid (): string {
        if (this.uniqueid > Number.MAX_SAFE_INTEGER) this.uniqueid = 0;
        this.uniqueid ++;
        return `UNIQUEID-${(this as any).props.deep}-${this.uniqueid}`;
    }

    log (str: string|number): void {
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
    }

    find (): Page {
        const path: string = (this as any).getRoutePath();
        const page: Page = (this as any).state.pages.find((page: Page): boolean => {
            if (page.path instanceof RegExp) {
                return page.path.test(path);
            } else {
                return page.path.replace("\/", "") === path;
            }
        });
        return page;
    }

    changePage (): void {
        this.resetPages();

        const 
        hasTransition: boolean = (this as any).props.transition,
        path = this.getRoutePath(),
        oldPage: Page = this.prevPage,
        newPage: Page = this.find(),
        error404: Page = path ? (this as any).state.pages.find((page: Page): boolean => page.path === "*") : undefined;

        //显示匹配页面
        if (oldPage) {
            oldPage.$DISPLAY = true;
        }
        if (newPage) {
            this.log(1);
            newPage.$DISPLAY = true;
        } 
        else if (error404) {
            this.log(2);
            error404.$DISPLAY = true;
        } 
        else {
            this.log("哦，谢特；没有任何page匹配上！");
        }

        console.log(this.state.pages);
        this.setState({});
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
                    if (page.$DISPLAY) {
                        return (
                            <div
                            className="router-inwrap"
                            style={{display: "block"}}
                            >
                                <page.component history={history} route={page}/>
                            </div> 
                        );
                    } else {
                        if (page.keepAlive) {
                            return (
                                <div
                                className="router-inwrap"
                                style={{display: "none"}}
                                >
                                    <page.component history={history} route={page}/>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    }
                })}
            </div>
        );
    }

}