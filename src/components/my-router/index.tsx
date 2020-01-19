/// <reference path="./index.d.ts" /> 

import React from "react";
import "./less/index.less";
import history from "./lib/History.class.js";

let 
ID: number = 0,
DEBUG: boolean = true;

export default class MyRouter extends React.Component {
    static defaultProps: Props = {
        routes: [],
        basename: ""
    }
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
        this.resetPages();
        const 
        path:   string = (this as any).getRoutePath(),
        pages:  Page[] = (this as any).state.pages, 
        routes: Page[] = (this as any).props.routes;
        const 
        pageInPages:  Page = pages.find((page: Page): boolean => this.find(page)),
        pageInRoutes: Page = routes.find((page: Page): boolean => this.find(page)),
        error404:     Page = routes.find((page: Page): boolean => page.path === "*");
        if (pageInPages) {
            pageInPages.$DISPLAY = true;
        }
        else if (pageInRoutes) {
            pageInRoutes.$DISPLAY = true;
            pages.push(pageInRoutes);
        }
        else if (error404 && path !== "") {
            error404.$DISPLAY = true;
            pages.push(error404);
        } 
        else {
            DEBUG && this.log("页面没有被匹配到");
        }
        this.setState({});
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
            <div className="router-wrap">
                {state.pages.map((page: Page): any => {
                    return (
                        <div 
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