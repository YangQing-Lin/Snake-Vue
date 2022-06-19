# snake-vue

```shell
npm run build
```

- 在开头，将`(function(){`替换为`const myfunc = (function(myappid, AcWingOS){`
- 搜索替换`"AcWingOS"`为`AcWingOS`
- 删除最后的括号让函数不执行
- 回到最后，将`.mount("#app")`改为`.mount(myappid)`
- 在最后添加下面的代码

```javascript
export class Game {
    constructor(id, AcWingOS) {
        myfunc('#' + id, AcWingOS);
    }
}
```