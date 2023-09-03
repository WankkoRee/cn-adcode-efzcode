# cn-adcode-efzcode

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)](#)[![NPM Version](https://img.shields.io/npm/v/cn-adcode-efzcode?label=NPM%20Version&logo=npm&style=flat-square&labelColor=CB3837&logoColor=white&color=6f94cd "NPM Version")](https://www.npmjs.com/package/cn-adcode-efzcode?activeTab=versions)[![Gzip Min Size](https://img.shields.io/bundlephobia/minzip/cn-adcode-efzcode?label=Gzip%20Min%20Size&logo=Google-Chrome&style=flat-square&labelColor=4285F4&logoColor=white&color=6f94cd "Gzip Min Size")](https://bundlephobia.com/package/cn-adcode-efzcode)[![GitHub Repo stars](https://img.shields.io/github/stars/WankkoRee/cn-adcode-efzcode?label=Github%20Stars&logo=Github&style=flat-square&labelColor=181717&logoColor=white&color=6f94cd "GitHub Repo stars")](https://github.com/WankkoRee/cn-adcode-efzcode)[![NPM Downloads](https://img.shields.io/npm/dt/cn-adcode-efzcode?label=NPM%20Downloads&logo=npm&style=flat-square&labelColor=CB3837&logoColor=white&color=6f94cd "NPM Downloads")](https://www.npmjs.com/package/cn-adcode-efzcode)

> 中国行政区划代码和经济功能区代码

## 数据来源

### 行政区划代码

- 数据完全来自[行政区划代码_中华人民共和国民政部门户网站](https://www.mca.gov.cn/n156/n186/index.html)
- 每年更新一次，当前版本: 2021
- 基于[GB/T 2260-2007](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=C9C488FD717AFDCD52157F41C3302C6D)
- 本项目数据: [GB_T_2260.json](src/data/GB_T_2260.json)

### 经济功能区代码

- 数据来源未找到，纯手打
- 经济功能区从属关系和简称全靠上网查找，还没找完，欢迎补充到[GB_T 37028-2018.json](src/raw/GB_T_37028/data/GB_T 37028-2018.json)中并提交pr
- 当前只收录：
  - **非直辖市**的
    - **国家级**的
      - **经济技术开发区**(`101`)
      - **高新技术产业开发区**(`103`)
  > 一方面，直辖市的经济功能区从属关系不好处理，比如北京的中关村就存在一区十六园这种离谱情况，而且如果用户想选择行政区的话可能会没法选择
  > 
  > 另一方面，**其他国家级**经济功能区和**所有省级**经济功能区通常无存在感，且大部分没有gov.cn域名，也没有设立人民法院等机关单位
- 不知道啥时候更新，当前版本: 2018
- 基于[GB/T 37028-2018](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=241A4BB1E525D9491A72E5BF3DF15D5A)
- 本项目数据: [GB_T_37028.json](src/data/GB_T_37028.json)

## 项目特色

- 收录了自行政区划代码出现的1980年以来，**所有**经中央政府承认的行政区划代码。
- 无多余数据，只专注于提供层级关系和对应代码，真正做好一个模块只干一件事。

## 关于港澳台

港澳台自古以来就是中国领土的一部分，但因民政部未给出完整数据，且没有其他政府官方数据来源，故未完全收录。

## 注意

以下为本项目特殊约定:
1. 本项目数据由于没有数据来源的原因，不包含`台湾省`、`香港特别行政区`、`澳门特别行政区`，所以以下提及的**省**未特别说明都指不包含`台湾省`的**省**。
2. 与其他项目相同，县级以上行政区通常有3个层级。
   > 以`河北-石家庄-长安`(`130102`)为例，获取代码为`China.getChild('13')?.getChild('01')?.getChild('02')?`。
3. 由于存在`省-县/县级市/林区`、`自治区-县级市`、`直辖市-市辖区/县/自治县`等以及没有县级行政区的`广东-东莞`、`广东-中山`、`海南-儋州`、`甘肃-嘉峪关`等和未分配县级行政区化代码的`海南-三沙`等特殊情况，这些行政区**在不包含经济功能区时**只有2个层级。
   > - 以`北京-东城`(`110101`)为例，获取代码为`China.getChild('11')?.getChild('0101')?`。
   > - 以`河南-济源`(`419001`)为例，获取代码为`China.getChild('41')?.getChild('9001')?`。
   > - 以`广东-东莞`(`441900`)为例，获取代码为`China.getChild('44')?.getChild('19')?`。
4. 由于经济功能区在数据落地和实际使用中更喜欢按`省级行政区-地级行政区-经济功能区`进行层级选择，经济功能区代码不使用`GB/T 37028`的`省级行政区-经济功能区类型-经济功能区`三级规范，而是使用自定义的`省级行政区-地级行政区-经济功能区类型+经济功能区`三级规范，其中将`经济功能区类型`代码和`经济功能区`代码拼接后作为第三级代码是为了防止不同`经济功能区类型`中存在相同`经济功能区`代码的情况。
   > - 以`北京-经济技术开发区-北京经济技术开发区`(`11101001`)为例，在本项目中应理解为`北京-大兴-北京经济技术开发区`(`110115101001`)，获取代码为`China.getChild('11')?.getChild('0115')?.getChild('101001')?`。
   > - 以`江苏-经济技术开发区-苏州工业园区`(`32101004`)为例，在本项目中应理解为`江苏-苏州-苏州工业园区`(`3205101004`)，获取代码为`China.getChild('32')?.getChild('05')?.getChild('101004')?`。
5. 基于上述约定，本项目获取到的：
   - 第1级行政区划代码理论范围为`11~99`(实际为`11~82`)
   - 第2级行政区划代码理论范围为`01~99`(实际为`01~70`)和`0101~9999`(实际为`0101~9031`+`0001~0036`(海南在2003年之前存在特殊情况，如`460001`的`海南-五指山`，会解析成`0001`，但在以数字存储时，会与`海南-海口`的`4601XX`重复，所以如果不需要考虑海南在2003年前的数据的话，下文提到的以数字存储的方案可以使用，如果需要考虑其数据的话，请不要使用数字存储方案))
   - 第3级行政区划代码理论范围为`01~99`(实际为`01~88`)和`101001~299999`(实际为`101001~299099`)
6. 基于上述约定，数据库字段设计有三个方案：
   - 合并存储，类型为`varchar(12)`(通常占用7字节，最多占用13字节)或`char(12)`(占用12字节)
     > 便于解析(后续会出解析完整区划代码的方法)，但是涉及筛选需求时，正确的筛选条件较为复杂
   - 拆分存储，类型为`char(2)`+`varchar(4)`+`varchar(6)`(通常占用2+3+3=8字节，最多占用2+5+7=14字节)或`char(2)`+`char(4)`+`char(6)`(占用12字节)
     > 便于解析和筛选，但存储开销通常大于合并存储方案
   - 拆分存储，类型为`tinyint unsigned`+`smallint unsigned`+`int unsigned`(占用1+2+4=7字节)
     > 便于解析和筛选，存储开销最小，但在一些与`00`相关的特殊数据存储上可能会存储不正确

## 安装

```shell
npm i cn-adcode-efzcode
````

```shell
yarn add cn-adcode-efzcode
```

```shell
pnpm add cn-adcode-efzcode
```

## 使用

### 导入/引用

```typescript
import China from 'cn-adcode-efzcode'
```

### 逐级获取

#### 省级行政区-地级行政区-县级行政区

```typescript
China.getChild('13')?.getChild('01')?.getChild('02')?.getName() === '长安区'
// 也可以👇
China.getChild(13)?.getChild(1)?.getChild(2)?.getName() === '长安区'
```

#### 直辖市-地级行政区

```typescript
China.getChild('11')?.getChild('0101')?.getName() === '东城区'
// 也可以👇
China.getChild(11)?.getChild(101)?.getName() === '东城区'
```

#### 省级行政区-地级行政区-经济功能区

```typescript
China.getChild('13')?.getChild('03')?.getChild('101001')?.getName() === '秦皇岛经济技术开发区'
// 也可以👇
China.getChild(13)?.getChild(3)?.getChild(101001)?.getName() === '秦皇岛经济技术开发区'
```

#### 直辖市-地级行政区-经济功能区

```typescript
China.getChild('11')?.getChild('0115')?.getChild('101001')?.getName() === '北京经济技术开发区'
// 也可以👇
China.getChild(11)?.getChild(115)?.getChild(101001)?.getName() === '北京经济技术开发区'
```

### 获取具体信息

```typescript
const province = China.getChild('11')!
province.getLevel() === 1 // 获取当前层级，通常没什么用
province.getCodeString() === '11' // 获取当前区划 字符串代码
province.getCodeInteger() === 11 // 获取当前区划 整数代码
province.getName() === '北京市' // 获取当前区划 名称
province.getShortName() === '北京' // 获取当前区划 简称
province.isDeprecated() === false // 检查当前区划 是否已废除
province.isEnded() === false // 检查当前区划 是否可作为区划结尾，通常用来判断是否可作为叶子节点选中
province.getFullCodeString() === '11' // 获取完整区划 字符串代码
province.getFullCodeInteger() === 11 // 获取完整区划 整数代码
province.getFullName('-') === '北京市' // 获取完整区划 名称，用`-`连接，默认用` `连接
province.getFullShortName('') === '北京' // 获取完整区划 简称，无连接字符，默认用` `连接


const prefecture = province.getChild('0115')!
prefecture.getLevel() === 2
prefecture.getCodeString() === '0115'
prefecture.getCodeInteger() === 115
prefecture.getName() === '大兴区'
prefecture.getShortName() === '大兴'
prefecture.isDeprecated() === false
prefecture.isEnded() === true // 大兴区属于市辖区，已经可以作为区划结尾
prefecture.getFullCodeString() === '110115'
prefecture.getFullCodeInteger() === 110115
prefecture.getFullName('-') === '北京市-大兴区'
prefecture.getFullShortName('') === '北京大兴'


const county = prefecture.getChild('101001')!
county.getLevel() === 3
county.getCodeString() === '101001'
county.getCodeInteger() === 101001
county.getName() === '北京经济技术开发区'
county.getShortName() === '北京经济技术开发区'
county.isDeprecated() === false
county.isEnded() === true // 北京经济技术开发区无子级区划，必须作为区划结尾
county.getFullCodeString() === '110115101001'
county.getFullCodeInteger() === 110115101001
county.getFullName('-') === '北京市-大兴区-北京经济技术开发区'
county.getFullShortName('') === '北京大兴北京经济技术开发区'
```

### 获取所有子级区域

```typescript
/*
 参数 includeDeprecated: 是否包含已废除的区划，仅筛选当前子级，可选，默认为 false，因为通常不需要列出已废除的区划
 */
China.listChildren() // === China.listChildren(false)

```

```typescript
// 如果需要三级结果都包含已废除的区划，则应当每级都传入includeDeprecated = true
China.listChildren(true).map((child) => ({
    value: child.getCodeInteger(), // 如需获取字符串可以使用 getCodeString 如需和前置层级一起获取可以使用 getFullCodeInteger 或 getFullCodeString
    label: child.getName(), // 如需和前置层级一起获取可以使用 getFullName
    children: child.listChildren(true).map((child) => ({
        value: child.getCodeInteger(),
        label: child.getName(),
        children: child.listChildren(true).map((child) => ({
            value: child.getCodeInteger(),
            label: child.getName(),
        })),
    })),
}))
```
