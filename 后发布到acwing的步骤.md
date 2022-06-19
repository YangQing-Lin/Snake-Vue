# snake-vue

```shell
npm run build
```

- 在开头加入`const myfunc = `并在后面的括号中填入`myappid`
- 删除最后的括号让函数不执行
- 回到最后，将`.mount("#app")`改为`.mount(myappid)`
- 在最后添加下面的代码

```javascript
export class Game {
    constructor(id, AcWingOS) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        AcWingOS.api.window.resize(59.5 * vh / vw, 64.5);
        myfunc('#' + id);
    }
}
```