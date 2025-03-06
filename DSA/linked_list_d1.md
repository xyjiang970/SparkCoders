# Linked Lists Day 1

## Time Complexity Table (Most Relevant in Real World Scenarios)

| Data Structure | Insert to Back   | Insert to Arbitrary Place? | Access an Arbitrary Element | Deleting from End | Deleting from Anywhere |
| -------------- | ---------------- | -------------------------- | --------------------------- | ----------------- | ---------------------- |
| Array          | O(1) (amortized) | O(N)                       | O(1) (amortized)            | O(1)              | O(N)                   |
| Map            | ❌ (N/A)         | O(1) (amortized)           | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)       |
| Set            | ❌ (N/A)         | O(1) (amortized)           | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)       |
| Object         | ❌ (N/A)         | O(1) (amortized)           | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)       |
| Linked List    |                  |                            |                             |                   |                        |

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
```

<img src="images/linkedlist3.jpg" alt="head_and_node2_creation" width="500"/>
