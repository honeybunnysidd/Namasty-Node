Episode-07 | sync, async, setTimeoutZero - code

Learn differences between synchronous and asynchronous code.

---

## 📜 Description of Scripts

### ✅ `async.js`

Demonstrates:

- **Asynchronous operations**: `fs.readFile`, `https.get`, `setTimeout`
- **Synchronous operation**: `fs.readFileSync`
- Mixes both blocking and non-blocking code for comparison.

### ✅ `blocking.js`

Demonstrates:

- **Blocking function**: `crypto.pbkdf2Sync()` freezes main thread
- **Non-blocking version**: `crypto.pbkdf2()` uses libuv threadpool
- Event loop behavior with `setTimeout(0)`

### ✅ `setTimeout.js`

Demonstrates:

- Delayed execution with `setTimeout(0)` and `setTimeout(3000)`
- Shows how JavaScript's **event loop** and **call stack** behave

### ✅ `sync.js`

Demonstrates:

- Simple synchronous operations
- A pure execution path with no asynchronous logic

---

## 📂 Input Files

- **file.txt** – Contains sample text used for reading in `async.js`.

---

## 📄 Output Reference (`output.txt`)

Contains real sample output logs of running:

- `async.js`
- `blocking.js`
- `setTimeout.js`

This helps compare **actual output order** from different types of functions.

---

## 🏃 How to Run

Make sure Node.js is installed:

```bash
node async.js
node blocking.js
node setTimeout.js
node sync.js
```
