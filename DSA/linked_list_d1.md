# Linked Lists Day 1

### Time Complexity Table (Most Relevant in Real World Scenarios)

| Data Structure | Insert to Back   | Insert to Arbitrary Place? | Access an Arbitrary Element | Deleting from End | Deleting from Anywhere |
| -------------- | ---------------- | -------------------------- | --------------------------- | ----------------- | ---------------------- |
| Array          | O(1) (amortized) | O(N)                       | O(1) (amortized)            | O(1)              | O(N)                   |
| Map            | ❌ (N/A)         | O(1) (amortized)           | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)       |
| Set            | ❌ (N/A)         | O(1) (amortized)           | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)       |
| Object         | ❌ (N/A)         | O(1) (amortized)           | O(1) (amortized)            | ❌ (N/A)          | O(1) (amortized)       |

_amortized_ here means average time per per operation over a sequence of operations.

### Time Complexity Table (Worst Case)

| Data Structure                       | Insert to Back             | Insert to Arbitrary Place?            | Access an Arbitrary Element           |
| ------------------------------------ | -------------------------- | ------------------------------------- | ------------------------------------- |
| **Array**                            | **O(N)** (due to resizing) | **O(N)** (shifting required)          | **O(1)** (direct indexing)            |
| **Map (HashMap / Dictionary)**       | ❌ N/A                     | **O(N)** (in case of hash collisions) | **O(N)** (in case of hash collisions) |
| **Set (HashSet)**                    | ❌ N/A                     | **O(N)** (in case of hash collisions) | **O(N)** (in case of hash collisions) |
| **Object (JS Object / Python Dict)** | ❌ N/A                     | **O(N)** (in case of hash collisions) | **O(N)** (in case of hash collisions) |
