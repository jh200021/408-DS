import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Data Structures', zhLabel: '数据结构', match: a => a.category === 'Data Structures' },
  { label: 'Tree', zhLabel: '树', match: a => a.category === 'Tree' },
  { label: 'Graph', zhLabel: '图', match: a => a.category === 'Graph' },
  { label: 'Sorting', zhLabel: '排序', match: a => a.category === 'Sorting' },
  { label: 'Searching', zhLabel: '查找', match: a => a.category === 'Searching' },
  { label: 'Algorithms', zhLabel: '算法思想', match: a => a.category === 'Algorithms' },
];

const ZH_NAMES = {
  'bubble-sort': '冒泡排序',
  'selection-sort': '选择排序',
  'insertion-sort': '插入排序',
  'merge-sort': '归并排序',
  'quick-sort': '快速排序',
  'heap-sort': '堆排序',
  'shell-sort': '希尔排序',
  'counting-sort': '计数排序',
  'radix-sort': '基数排序',
  'bucket-sort': '桶排序',
  'linear-search': '线性查找',
  'binary-search': '二分查找',
  'jump-search': '跳跃查找',
  'interpolation-search': '插值查找',
  stack: '栈',
  queue: '队列',
  'linked-list': '链表',
  bst: '二叉搜索树',
  bfs: '广度优先搜索',
  dfs: '深度优先搜索',
  dijkstra: 'Dijkstra最短路径',
  'bellman-ford': 'Bellman-Ford最短路径',
  mst: '最小生成树',
  'prim-mst': 'Prim最小生成树',
  array: '数组',
  'hash-table': '哈希表',
  heap: '堆',
  'skip-list': '跳表',
  trie: '字典树/前缀树',
  graph: '图-邻接表',
  recursion: '递归',
  'hash-algorithm': '哈希算法',
  greedy: '贪心算法',
  'divide-conquer': '分治算法',
  backtracking: '回溯算法',
  'dynamic-programming': '动态规划',
  'string-matching': '字符串匹配',
  kmp: 'KMP算法',
};

export default function AlgorithmList({ algorithms, selected, onSelect }) {
  return (
    <nav className="algo-list">
      {CATEGORIES.map(cat => {
        const items = algorithms.filter(cat.match);
        return (
          <div key={cat.label} className="algo-group">
            <div className="algo-group-title">
              <span>{cat.label}</span>
              <span className="algo-group-title-zh">{cat.zhLabel}</span>
            </div>
            {items.map(algo => (
              <div
                key={algo.id}
                className={`algo-item ${selected?.id === algo.id ? 'active' : ''}`}
              >
                <button className="algo-item-main" onClick={() => onSelect(algo)}>
                  <span className="algo-name">{algo.name}</span>
                  <span className="algo-name-zh">{ZH_NAMES[algo.id]}</span>
                  <span className="algo-avg">{algo.timeComplexity.average}</span>
                </button>
                <Link
                  className="algo-details-link"
                  to={`/details/${algo.id}`}
                  title={`${algo.name} details`}
                  aria-label={`View details for ${algo.name}`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
