let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
];

const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

const getPostDetail = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error("No post id " + id);
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(post);
  }
};

const creatNewPost = (req, res, next) => {
  const data = req.body;

  const newPost = {
    id: posts.length + 1,
    title: data.title,
  };

  if (!newPost.title) {
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);

  res.status(201).json(newPost);
};

const updatePost = (req, res, next) => {
  const id = JSON.parse(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error("No post id " + id);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;

  res.status(200).json(posts);
};

const deletePost = (req, res, next) => {
  const id = JSON.parse(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error("No post id " + id);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};

const postController = {
  getPosts,
  getPostDetail,
  creatNewPost,
  updatePost,
  deletePost,
};

export default postController;
