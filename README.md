# Instructions to run back-end
- Clone the repo to a folder, say ```back-end```
- Install dependencies
```bash
cd back-end
npm install --save express cors morgan body-parse fabric-network
```
- Open a terminal window in ```back-end``` and start the server. The server will start at http://localhost:4000
```bash
node index.js
```
- Most importantly, go through ```createClient.js``` and ```fabricClient.js``` and ensure all specified paths match the paths on your machine