// Shared functions
function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Render blog on public page
if (document.getElementById("blog-list")) {
  const blogList = document.getElementById("blog-list");
  const posts = getPosts();

  if (posts.length === 0) {
    blogList.innerHTML = "<p>No blog posts yet.</p>";
  } else {
    posts.reverse().forEach(post => {
      const div = document.createElement("div");
      div.className = "blog-post";
      div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
      blogList.appendChild(div);
    });
  }
}

// Admin logic
if (document.getElementById("admin-section")) {
  window.addPost = function () {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    if (!title || !content) {
      alert("Please fill in both fields.");
      return;
    }

    const posts = getPosts();
    posts.push({ title, content });
    savePosts(posts);
    alert("Post added!");
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    showPosts();
  }

  window.deletePost = function (index) {
    const posts = getPosts();
    posts.splice(index, 1);
    savePosts(posts);
    showPosts();
  }

  function showPosts() {
    const postList = document.getElementById("post-list");
    const posts = getPosts();
    postList.innerHTML = "";

    posts.forEach((post, index) => {
      const div = document.createElement("div");
      div.className = "blog-post";
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
      `;
      postList.appendChild(div);
    });
  }

  // Show posts on load
  showPosts();
}
