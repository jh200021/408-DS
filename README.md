# 408-DS Interactive DSA

中文 | [English](#english)

## 项目简介

408-DS Interactive DSA 是一个面向数据结构与算法学习的交互式可视化项目。它通过动画、步骤控制和同步代码高亮，把常见算法的执行过程拆解成可以观察、暂停、回退和复盘的学习材料。

项目适合用于 408 复习、课堂演示、算法入门学习和个人知识整理。

## 主要功能

- 覆盖数据结构、树、图、排序、查找和经典算法等多个类别
- 支持播放、暂停、单步前进、单步后退、跳到开头、跳到结尾
- 支持速度调节和时间线拖动，便于观察关键步骤
- 同步展示 C、Python、JavaScript 三种语言代码
- 当前步骤会高亮对应代码行，方便理解状态变化
- 提供复杂度速查表，便于横向比较时间复杂度和空间复杂度
- 每个算法包含独立说明页，用于补充原理、过程和适用场景
- 支持重新生成部分算法的输入数据，便于重复练习

## 包含内容

| 分类 | 内容 |
| --- | --- |
| 数据结构 | 数组、链表、栈、队列、哈希表、堆、跳表 |
| 树 | 二叉搜索树、Trie |
| 图 | BFS、DFS、邻接表图、Dijkstra、Bellman-Ford、Kruskal 最小生成树、Prim 最小生成树 |
| 排序 | 冒泡排序、选择排序、插入排序、归并排序、快速排序、堆排序、希尔排序、计数排序、基数排序、桶排序 |
| 查找 | 线性查找、二分查找、跳跃查找、插值查找 |
| 算法思想 | 递归、哈希算法、贪心、分治、回溯、动态规划、字符串匹配 |

## 本地运行

```bash
npm install
npm run dev
```

开发服务器默认运行在：

```text
http://localhost:5173
```

## 构建与预览

```bash
npm run build
npm run preview
```

## 项目结构

```text
src/
  algorithms/    算法步骤生成逻辑
  components/    可视化组件、控制面板和布局组件
  data/          算法元数据、代码示例和说明数据
  hooks/         页面元信息等通用逻辑
  pages/         主可视化页、复杂度页和详情页
```

## 添加新算法

1. 在 `src/algorithms/` 中添加步骤生成逻辑。
2. 在 `src/components/` 中添加或复用可视化组件。
3. 在 `src/data/algorithms.js` 中注册算法元数据、分类、代码示例和输入生成逻辑。
4. 在主可视化页面中接入对应组件。
5. 根据需要补充样式、图例和详情说明。

## 技术栈

- React
- React Router
- Vite
- JavaScript
- CSS

## 许可证

本项目基于 MIT License 发布。

---

## English

# 408-DS Interactive DSA

## Overview

408-DS Interactive DSA is an interactive visualization project for learning data structures and algorithms. It breaks algorithm execution into observable steps with animation controls and synchronized code highlighting, making it easier to pause, rewind, inspect, and review each state transition.

The project is suitable for 408 exam review, classroom demonstrations, algorithm learning, and personal study notes.

## Features

- Covers data structures, trees, graphs, sorting, searching, and classic algorithmic techniques
- Supports play, pause, step forward, step backward, jump to first step, and jump to last step
- Includes speed control and a draggable timeline for detailed observation
- Shows C, Python, and JavaScript code side by side
- Highlights the active code line for the current algorithm step
- Provides a complexity reference table for time and space complexity comparison
- Includes detail pages for algorithm principles, procedures, and use cases
- Supports regenerated inputs for selected algorithms to enable repeated practice

## Included Topics

| Category | Topics |
| --- | --- |
| Data Structures | Array, Linked List, Stack, Queue, Hash Table, Heap, Skip List |
| Trees | Binary Search Tree, Trie |
| Graphs | BFS, DFS, adjacency-list graph, Dijkstra, Bellman-Ford, Kruskal MST, Prim MST |
| Sorting | Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Shell Sort, Counting Sort, Radix Sort, Bucket Sort |
| Searching | Linear Search, Binary Search, Jump Search, Interpolation Search |
| Algorithmic Techniques | Recursion, Hashing, Greedy, Divide and Conquer, Backtracking, Dynamic Programming, String Matching |

## Local Development

```bash
npm install
npm run dev
```

The development server usually runs at:

```text
http://localhost:5173
```

## Build and Preview

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  algorithms/    Step generation logic for algorithms
  components/    Visualizers, controls, and layout components
  data/          Metadata, code examples, and detail content
  hooks/         Shared page logic
  pages/         Visualizer, complexity guide, and detail pages
```

## Adding a New Algorithm

1. Add the step generator under `src/algorithms/`.
2. Add or reuse a visualizer component under `src/components/`.
3. Register metadata, category, code examples, and optional input generation in `src/data/algorithms.js`.
4. Wire the visualizer into the main visualization page.
5. Add styles, legends, and detail content when needed.

## Tech Stack

- React
- React Router
- Vite
- JavaScript
- CSS

## License

This project is released under the MIT License.
