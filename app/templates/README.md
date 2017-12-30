## pure-statistics


***pure-statistics 为一个工具类库，实现功能如下***

* 可以统计当前项目中源代码目录下所有代码文件的行数。    
* 函数可以允许使用者指定源代码目录的位置，文件后缀，包含文件或目录、排除文件或目录，  

函数的返回值是一个数组，数组中每一项都是一个对象，对象中应包含属性为：1）文件路径（相对于项目）2）该文件统计行数

##方法
***statisticsLine***


statisticsLine方法是个异步函数，返回promise对象


##参数说明



* workDic 函数统计的起始目录，默认当前工作目录（__dirname）    
* filenameExtension 要统计文件后缀，是个数组，如[".js", ".css"]  
* include 包含的文件或者目录，正则匹配
* exclude 排除的文件或者目录，正则匹配


## 安装

`yarn install pure-statistics`

## 示例

```
import statisticsLine from "pure-statistics"
const path = require("path")
const result = statisticsLine({
    workDic: path.resolve(process.cwd(), "src/testdir"),
    "filenameExtension": [".js", ".css"]
}).then(function (result) {
    console.log("result=", JSON.stringify(result))
})
```


