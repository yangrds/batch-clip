
export default {
    /* state指定更新 */
    setState(state: any, res: any) {
        state[res.name] = res.data
    },
    /* 弹性高度适配 */
    setScrollH(state: any) {
        window.onresize = resize;
        function resize() {
            state.scrollH = document.querySelector('.cloud-main').getBoundingClientRect().height
        }
        resize()
    }
}