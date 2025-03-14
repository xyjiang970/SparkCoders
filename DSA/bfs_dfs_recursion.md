# More BFS, DFS, and Recursion

<a href="https://leetcode.com/problems/path-sum/description/" target="\_blank">Leetcode: Path Sum</a>

Balanced Binary Tree:

- For every node, the absolute difference between the height (or depth) of its left and right subtrees is no greater than 1. Specifically, the difference in height between the left and right subtrees of each node can only be 1 or 0.
- Ex of self-balancing binary search tree: AVL Tree, Red-Black Tree
- Benefits:
  - Efficient Search: ensure that search operations remain efficient (O(log N)) time complexity
  - Efficient Insert/ Delete: maintain O(log N) time complexity

\( O(N) \)
\[ O(N ) \]

<img src="images/path_sum.jpg" alt="path_sum" width="800"/>

```JavaScript
/** DFS easier than BFS here!
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */

// return true if there's a path that adds up to targetSum
// return false if there is not
// backtracking: if there are no more branches, go back up until you find another branch
var hasPathSum = function(root, targetSum) {

};
```

<br>

<a href="https://leetcode.com/problems/binary-tree-level-order-traversal/description/" target="\_blank">Leetcode: Binary Tree Level Order Traversal</a>
