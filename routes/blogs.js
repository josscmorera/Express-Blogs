const express = require('express');
const { route } = require('./blogs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const blogs = [
  {
    id: 'blog1',
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming language.',
    author: 'Michael Johnson',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: 'blog2',
    title: 'Mastering React Framework',
    description: 'Become proficient in building web applications using React.',
    author: 'Jane Smith',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: 'blog3',
    title: 'Deep Dive into Node.js',
    description: 'Explore the advanced concepts of Node.js and server-side development.',
    author: 'Michael Johnson',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: 'blog4',
    title: 'CSS Tricks for Web Designers',
    description: 'Discover useful CSS techniques to enhance your web designs.',
    author: 'Emily Davis',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: 'blog5',
    title: 'Effective Database Management',
    description: 'Learn best practices for managing databases and optimizing performance.',
    author: 'Robert Johnson',
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  }
];

router.get('/', (req, res) => {
  res.json({ message: 'hello from blog route' })
});

router.get('/all-blogs', (req, res) => {
  res.json({ success: true, blogs: blogs });
});

router.delete('/delete-blog/:id', (req, res) => {
  const id = req.params.id;
  const findIndex = blogs.findIndex(blog => blog.id.toString() === id);

  if (findIndex === -1) {
    return res.status(400).json({ success: false, message: 'Blog not found' });
  }


  blogs.splice(findIndex, 1);
  res.status(200).json({ success: true, message: 'Blog deleted successfully' });
});

// get one blog by id route
router.get('/get-blog/:id', (req, res) => {
  const id = req.params.id;
  const findIndex = blogs.findIndex(blog => blog.id === id);

  if (findIndex === -1) {
    return res.status(400).json({ success: false, message: 'Blog not found' });
  }

  const blog = blogs[findIndex];
  res.status(200).json({ success: true, blog: blog });
});

// get some blocks route by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const filteredBlogs = blogs.filter(blog => blog.author === author);

  if (filteredBlogs.length === 0) {
    return res.status(400).json({ success: false, message: 'Blog not found' });
  }

  res.status(200).json({ success: true, blogs: filteredBlogs });
});

// post one blog route

router.post('/new-blog', (req, res) => {
  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newBlog = {
    id: uuidv4(),
    title,
    description,
    author,
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };

  blogs.push(newBlog);
  res.status(201).json({ success: true, message: 'Blog created successfully', blog: newBlog });
});

// update one blog route

router.put('/update-blog/:id', (req, res) => {
  const id = req.params.id;
  const findIndex = blogs.findIndex(blog => blog.id.toString() === id);

  if (findIndex === -1) {
    return res.status(400).json({ success: false, message: 'Blog not found' });
  }

  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  if (title !== blogs[findIndex].title) {
    return res.status(400).json({ success: false, message: 'Title not the same' });
  }

  const updatedBlog = {
    id,
    title,
    description,
    author,
    createdAt: blogs[findIndex].createdAt,
    lastModified: new Date().toISOString()
  };

  blogs[findIndex] = updatedBlog;
  res.status(200).json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });
});


module.exports = router;