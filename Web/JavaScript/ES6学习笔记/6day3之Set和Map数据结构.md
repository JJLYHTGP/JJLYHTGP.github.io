[TOC]

# Set和Map结构

## Set

### ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4 不会添加重复的值

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]
// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56
// 去除数组的重复成员
[...new Set(array)]
```

Set判断两个值是否相等时不发生类型转换，使用的算法类似于全等===，但是NaN等于自身

### Set实例的属性和方法

#### Set结构的实例有以下属性

##### `Set.prototype.constructor`：构造函数，默认就是`Set`函数。

##### `Set.prototype.size`：返回`Set`实例的成员总数。

#### Set 实例的操作方法（用于操作数据）

##### `add(value)`：添加某个值，返回 Set 结构本身。

##### `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。

##### `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。

##### `clear()`：清除所有成员，没有返回值。

##### `Array.from`方法可以将 Set 结构转为数组。 

#### Set实例的遍历方法（用于遍历成员）

##### `keys()`：返回键名的遍历器，与values()行为一致
##### `values()`：返回键值的遍历器
##### `entries()`：返回键值对的遍历器
##### `forEach()`：使用回调函数遍历每个成员

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

## WeakSet成员只能是对象，弱引用

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为`0`，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

### **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。

### **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。

### **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

WeakSet 没有`size`属性，没有办法遍历它的成员。 

## Map

### 键值对的集合，但是键的可以是各种类型

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作`Map`构造函数的参数。这就是说，`Set`和`Map`都可以用来生成新的 Map。 

```javascript
对同一个键连续多次赋值，后面的值会覆盖前面的值
读取一个未知的键，将返回undefined
new Map().get('asfddfsasadf')
// undefined
```

### 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。 

### 实例的属性和方法

#### 操作方法
###### size属性返回Map结构的成员总数

###### set(key, value)设置键名key对应的键值为value，然后返回Map结构。如果key已经有值，则键值会被更新，否则就新生产该键

###### get(key)读取key对应的键值，如果找不到key，返回undefined

###### has(key)返回布尔值，表示某个键是否在当前map对象中

###### delete(key)方法删除某个键，返回删除的结果

###### clear()方法清除所有成员

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

#### 遍历方法
###### keys 返回键名的遍历器

###### values返回键值的遍历器

###### entries返回所有成员的遍历器

###### forEach遍历所有成员



## WeakMap

### `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。 

### `WeakMap`的键名所指向的对象，不计入垃圾回收机制。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构。当该 DOM 元素被清除，其所对应的`WeakMap`记录就会自动被移除。

### `WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。 