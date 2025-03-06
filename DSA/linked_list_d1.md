# Linked Lists Day 1

## Table of Contents

1. [Time Complexity Table (Most Relevant in Real World Scenarios)](#time-complexity-table-most-relevant-in-real-world-scenarios)
2. [Classes](#classes)
3. [Linked List Setup](#linked-list-setup)
4. [Queue](#queue)

## Time Complexity Table (Most Relevant in Real World Scenarios)

| Data Structure | Insert to Back            | Insert to Arbitrary Place?               | Access an Arbitrary Element | Deleting from End | Deleting from Anywhere              |
| -------------- | ------------------------- | ---------------------------------------- | --------------------------- | ----------------- | ----------------------------------- |
| Array          | O(1) (amortized)          | O(N)                                     | O(1) (amortized)            | O(1)              | O(N)                                |
| Map            | ❌ (N/A)                  | O(1) (amortized)                         | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)                    |
| Set            | ❌ (N/A)                  | O(1) (amortized)                         | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)                    |
| Object         | ❌ (N/A)                  | O(1) (amortized)                         | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)                    |
| Linked List    | O(1) (if at head or tail) | O(1) (if pointer to postition available) | O(N) (traverse to find)     | O(1) (tail)       | O(1) (if pointer to node available) |

_amortized_ here means average time per per operation over a sequence of operations.

## Classes

```javascript
class Game {
  // you can define games using classes
  // each game has a name, genre, and dataReleased
  constructor(name, genre, dateReleased) {
    // this.name = "GTA6";
    // this.genre = "RPG";
    // this.dateReleased = "2025-10-01";
    console.log(name, genre, dateReleased);
  }
}
// constructor gets called whenever you run new Game()
const gta6 = new Game("gta6", "RPG", "2025-10-01"); // console log will output: gta6 RPG 2025-10-01

// ---------------------------------------------------------

// updated:
class Game {
  constructor(name, genre, dateReleased) {
    this.name = name;
    this.genre = genre;
    this.dateReleased = dateReleased;
  }
}
const gta6 = new Game("gta6", "RPG", "2025-10-01"); // will no longer output anything
console.log(gta6.genre); // output: RPG

gta6.genre = "COOL"; // will change the genre
console.log(gta6.genre); // output: COOL

// ---------------------------------------------------------

class Game {
  constructor(name, genre, dateReleased) {
    this.name = name;
    this.genre = genre;
    this.dateReleased = dateReleased;
    this.gameVersion = 0;
  }
  // class methods
  incrementGameVersion() {
    this.gameVersion++;
  }

  // another class method
  foo() {
    this.incrementGameVersion();
    console.log(this.name);
  }
}
```

## Linked List Setup

<img src="images/linkedlist.jpg" alt="linkedlist" width="500"/>
<img src="images/linkedlist2.jpg" alt="linkedlistheadandnull" width="500"/>

```JavaScript
// definition of a node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
const head = new Node(1); // new node with value of 1
console.log(node); // output: Node { value: 1, next: null }

const node2 = new Node(2);
```

<img src="images/linkedlist3.jpg" alt="head_and_node2_creation" width="500"/>

```javascript
// definition of a node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
const head = new Node(1); // new node with value of 1
console.log(node); // output: Node { value: 1, next: null }

const node2 = new Node(2);
head.next = node2;
console.log(head); // output: Node { value: 1, next: Node { value: 2, next: null } }
```

<img src="images/linkedlist4.jpg" alt="arrow_to_next_node" width="500"/>

## Queue

FIFO = First in, first out | Remove from front | array.unshift O(N)
LILO = Last in, last out | Insert from back | array.push O(1)

<u>For Linked Lists:</u>
Remove from front: O(1)
Insert from back: O(1)
