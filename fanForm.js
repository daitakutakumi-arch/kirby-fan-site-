const form = document.getElementById('fanForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    message: formData.get('message'),
    date: new Date().toISOString()
  };

  try {
    const response = await fetch('https://api.github.com/repos/あなたのユーザー名/あなたのリポジトリ名/contents/posts.json', {
      method: 'PUT',
      headers: {
        'Authorization': 'token あなたのGitHubパーソナルアクセストークン',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add post by ${data.name}`,
        committer: {
          name: "GitHub Actions",
          email: "action@github.com"
        },
        content: btoa(JSON.stringify([data])), // 既存のJSONに追加する場合はfetchして配列にマージ
        sha: '' // 既存ファイルがある場合はSHAを指定
      })
    });

    if(response.ok) {
      status.textContent = '投稿成功！';
      form.reset();
      loadPosts();
    } else {
      status.textContent = '投稿に失敗しました';
      console.error(await response.json());
    }
  } catch(err) {
    status.textContent = 'エラー発生';
    console.error(err);
  }
});

// 投稿一覧表示（posts.json を読み込み）
async function loadPosts() {
  const postList = document.getElementById('postList');
  postList.innerHTML = '';
  
  try {
    const res = await fetch('posts.json');
    const posts = await res.json();
    
    posts.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.date.slice(0,10)} - ${p.name}: ${p.message}`;
      postList.appendChild(li);
    });
  } catch(err) {
    console.log('投稿読み込みエラー', err);
  }
}

// ページロード時に投稿読み込み
loadPosts();
