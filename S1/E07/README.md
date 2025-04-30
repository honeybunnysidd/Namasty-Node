Episode-07 | sync, async, setTimeoutZero - code

Learn differences between synchronous and asynchronous code.

---

## 📜 Description of Files

### `async.js`

- Shows how Node.js handles:
  - Asynchronous HTTP requests using `https.get()`
  - File reading using `fs.readFile()`
  - Delayed execution with `setTimeout`
- Also includes a synchronous read using `fs.readFileSync()` for contrast.

### `sync.js`

- Contains blocking code using `fs.readFileSync()` and synchronous functions.
- Demonstrates how synchronous operations block further execution.

### `blocking.js`

- You can use this file to experiment further with other blocking patterns (e.g., CPU-bound tasks).

### `file.txt`

- Sample file content used by both `async.js` and `sync.js`.

### `output.txt`

- Can be used to write outputs from any script if needed.

---

## 🏃‍♂️ How to Run

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
node async.js
node sync.js
```
