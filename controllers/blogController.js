const Blog = require("../model/BlogModel");

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog post", error: err.message || err });
  }
};

exports.getBlogs = async (req, res) =>{
    try{
        const blogs = await Blog.find({}, "title content date slug");
        res.json(blogs);
    }catch(err){
        console.log(err)
        res.status(500).json({err:"server errorr"})
    }
}
