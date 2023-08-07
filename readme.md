# cn-adcode-efzcode

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)](#)[![NPM Version](https://img.shields.io/npm/v/cn-adcode-efzcode?label=NPM%20Version&logo=npm&style=flat-square&labelColor=CB3837&logoColor=white&color=6f94cd "NPM Version")](https://www.npmjs.com/package/cn-adcode-efzcode?activeTab=versions)[![Gzip Min Size](https://img.shields.io/bundlephobia/minzip/cn-adcode-efzcode?label=Gzip%20Min%20Size&logo=Google-Chrome&style=flat-square&labelColor=4285F4&logoColor=white&color=6f94cd "Gzip Min Size")](https://bundlephobia.com/package/cn-adcode-efzcode)[![GitHub Repo stars](https://img.shields.io/github/stars/WankkoRee/cn-adcode-efzcode?label=Github%20Stars&logo=Github&style=flat-square&labelColor=181717&logoColor=white&color=6f94cd "GitHub Repo stars")](https://github.com/WankkoRee/cn-adcode-efzcode)[![NPM Downloads](https://img.shields.io/npm/dt/cn-adcode-efzcode?label=NPM%20Downloads&logo=npm&style=flat-square&labelColor=CB3837&logoColor=white&color=6f94cd "NPM Downloads")](https://www.npmjs.com/package/cn-adcode-efzcode)

> 中国行政区划代码和经济功能区代码

## 数据来源

### 行政区划代码

- 数据完全来自[行政区划代码_中华人民共和国民政部门户网站](https://www.mca.gov.cn/n156/n186/index.html)
- 每年更新一次
- 基于[GB/T 2260-2007](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=C9C488FD717AFDCD52157F41C3302C6D)

### 经济功能区代码

- 数据来源未找到, 纯手打, 还没打完
- 不知道啥时候更新
- 基于[GB/T 37028-2018](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=241A4BB1E525D9491A72E5BF3DF15D5A)

## 项目特色

- 收录了自行政区划代码出现的1980年以来，**所有**经中央政府承认的行政区划代码。
- 无多余数据，只专注于提供层级关系和对应代码，真正做好一个模块只干一件事。

## 关于港澳台

港澳台自古以来就是中国领土的一部分，但因民政部未给出完整数据，且没有其他政府官方数据来源，故未完全收录。


## 安装

```shell
npm i cn-adcode-efzcode

yarn add cn-adcode-efzcode

pnpm add cn-adcode-efzcode
```

## 使用

### 导入/引用

```typescript
import China from 'cn-adcode-efzcode'
```

### 获取所有子级区域

```typescript
/*
 参数 includeDeprecated: 是否包含已废除的区划, 仅筛选当前子级, 可选, 默认为 false, 因为通常不需要列出已废除的区划
 */
China.listChildren() // === China.listChildren(false)
China.listChildren(true)?.listChildren(true)?.listChildren(true) // 如果需要三级结果都包含已废除的区划, 则应当每级都传入includeDeprecated = true
```

### 逐级获取

#### 省-市-县

```typescript
China.getChild('11')?.getChild('01')?.getChild('01')?.getName() === '东城区'
// 也可以👇
China.getProvince('11')?.getPrefecture('01')?.getCounty('01')?.getName() === '东城区'
```

#### 省-类-区

```typescript
China.getChild('11')?.getChild('101')?.getChild('001')?.getName() === '北京经济技术开发区'
// 也可以👇
China.getProvince('11')?.getClassification('101')?.getZone('001')?.getName() === '北京经济技术开发区'
```

### 获取具体信息

```typescript
const province = China.getProvince('11')!
county.getLevel() === 1
province.getCode() === '11'

const prefecture = province.getProvince('01')!
county.getLevel() === 2
prefecture.getCode() === '1101'

const county = prefecture.getProvince('01')!
county.getLevel() === 3
county.getCode() === '110101'
county.getName() === '东城区'
county.getShortName() === '东城'
county.isDeprecated() === false
```
