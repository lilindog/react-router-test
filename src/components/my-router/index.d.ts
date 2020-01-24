
/**
 * ！！！带有 $ 符号开头并且是大写的属性是系统操作的，人为不需要设定，不要与其重复
 */

interface Props {
    readonly debugName?: string|number,
    readonly routes:    Page[],
    readonly deep?: number,
    readonly transition?: boolean,
    readonly changeRules?: string[]
}

interface State {
    pages: Page[]
}

interface Page {
    title?:     string,
    path:       string|RegExp,
    component:  any,
    keepAlive?: boolean,
    children?:  Page[]
    $DISPLAY?:  boolean,
    $ANIMATION?: string,
    $UNIQUEID?: string
}