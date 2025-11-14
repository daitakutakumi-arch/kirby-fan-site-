const fs = require('fs');

const name = process.argv[2];
const message = process.argv[3];

const newPost = {
  name,
  message,
  date: new Date().toISOString()
};

const file = 'posts.json';
let posts = [];

if (fs.existsSync(file)) {
  posts = JSON.parse(fs.readFileSync(file, 'utf8'));
}

posts.push(newPost);

fs.writeFileSync(file, JSON.stringify(posts, null, 2));
