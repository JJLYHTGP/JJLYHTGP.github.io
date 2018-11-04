[TOC]
# Number类型

- 十进制 55
- 八进制 
  070 // 56
  080 // 80 字面值范围应为0-7，超出范围则忽略先导0，将之后的数字作为十进制解析
- 十六进制
  0x开头
- 在计算时它们都转换为十进制数值
- js保留+0和-0 相等 ===
## 浮点数值
## 数值范围
Number.MIN_VALUE
Number.MAX_VALUE

## NaN
### Not a Number
表示本来返回数值的操作数未返回数值的情况
+1/0 = Infinity
-1/0 = -Infinity
0/0 = NaN
不会抛出错误

### 任何涉及NaN的操作都返回NaN
### NaN不和任何值相等 NaN != NaN
### isNaN()，是否“不是数值”
接收参数，如果不是数值类型则将其转为数值，能转成数值的则返回false
```
isNaN(NaN) // true
isNaN(10) // false  10 is number
isNaN('10') // false trans to 10
isNaN('blue') // true cannot trans to number
isNaN({}) // true 
isNaN([]) // false [] == 0
isNaN([1]) // false ==1
isNaN([0,0]) // true 
isNaN(null) // false trans to 0
isNaN(undefined) // true trans to NaN
```

### 数值转换
#### Number()函数转换规则
##### true 1 false 0
##### 数值
##### null转为0，但是null != 0，因为null和undefined值在相等运算里不转换
##### undefined转为NaN 
##### 字符串
- 只包含数字，正负号，忽略先导0转换为十进制
- 有效的十六进制，转换为十进制
- 有效浮点数转为浮点数
- 空串返回0
- 其他格式返回NaN

###### 对象 先调valueOf，再调用toString，再转值
###### Array.prototype.valueOf([])与直接访问数组一样，调用toString就是对每一项调用toString再用,join再转数值
```
[] 转值0 真骚 [].toString() ''
[0] 转值0 [0].toString() '0'
[1] 转值1
[0,0] 转值NaN '0,0'
```

#### parseInt与parseFloat