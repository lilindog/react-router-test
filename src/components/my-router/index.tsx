/// <reference path="./index.d.ts" /> 

import React from "react";
import "./less/index.less";
import history from "./lib/History.class.js";
import { deepClone } from "./lib/tools.js";

const 
DEBUG: boolean = true,
ANIMATION_CLASS = "router-enter",
ANIMATION_TIME = 500;

export default class MyRouter extends React.Component {
    static defaultProps: Props = {
        routes: [],
        deep: 0,
        transition: false,
        changeRules: [],
    }
    uniqueid = 0;
    prevPathname: string = null;
    state: State = {
        pages: []   
    }
    constructor (props: any) {
        super(props);
        this.state.pages = this.clonePages();
        this.init();    
    }

    //克隆page， 并为每个page设置唯一id
    clonePages (): Page[] {
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
        console.log(`%c [${(this as any).props.debugName ? (this as any).props.debugName : "未命名"}-${(this as any).props.deep}]%c : %c ${str}`, "color: green", "color: red", "color: black; font-weight: 900");
    }

    hasChange (): boolean {
        const 
        changeRules: string[] = (this as any).props.changeRules,
        oldPath: string = this.prevPathname,
        newPath: string = this.getRoutePath();
        console.log(newPath || "/", oldPath || "/");
        //用指定的changeRules规则来判断是否变动
        if (changeRules && changeRules.length > 0) {
            if (newPath === this.prevPathname) {
                this.log("t0");
                return false;
            }
            //新进入
            if (oldPath === null) {
                this.log("t1");
                this.prevPathname = newPath;
                return true;
            }
            //眺望非规则路由
            else if (changeRules.includes(oldPath) && !changeRules.includes(newPath)) {
                this.log("t2");
                this.prevPathname = newPath;
                return true;
            }   
            //非规则路由眺望规则路由
            else if (changeRules.includes(newPath) && !changeRules.includes(oldPath)) {
                this.log("t3");
                this.prevPathname = newPath;
                return true;
            }
            //规则路由之间跳转
            else if (changeRules.includes(oldPath) && changeRules.includes(newPath)) {
                this.log("t4");
                this.prevPathname = newPath;
                return true;
            }
            //非规则路由之间的跳转
            else {
                this.log("t5");
                this.prevPathname = newPath;
                return false;
            }
        }
        //用pathname来比对判断是否变动
        else {
            if (newPath === this.prevPathname) {
                return false;
            } else {
                this.prevPathname = newPath;
                return true;
            }
        }
    }

    init (): any {
        history.on("change", () => {
            const newPath: string = this.getRoutePath();
            if (!this.hasChange()) {
                this.log("change与上次pathname相同，不予动作！");
                return;
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
        newPage: Page = this.find(),
        error404: Page = (this as any).state.pages.find((page: Page): boolean => page.path === "*");

        //显示匹配页面
        if (newPage) {
            this.log(1);
            newPage.$DISPLAY = true;
            if (hasTransition) newPage.$ANIMATION = ANIMATION_CLASS;
        } 
        else if (error404) {
            this.log(2);
            error404.$DISPLAY = true;
            if (hasTransition) error404.$ANIMATION = ANIMATION_CLASS;
        } 
        else {
            this.log("哦，谢特；没有任何page匹配上！");
        }
        
        this.setState({});
    }

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
                            style={{display: "block", animation: page.$ANIMATION ? `${page.$ANIMATION} ${ANIMATION_TIME / 1000}s` : ""}}
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