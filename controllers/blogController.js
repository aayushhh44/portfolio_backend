const Blog = require("../model/BlogModel");

exports.createBlog = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      tags,
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

exports.getBlogs = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // const totalBlogs = blogs.length;
    const blogs = await Blog.find({}, "title content date slug tags")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const blogs2 = await Blog.find({}, "title content date").sort({ date: -1 });

    const totalBlogs = await Blog.countDocuments();

    res.json({
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs2,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getIndividualBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await Blog.find({}, { tags: 1 });
    const resp = tags.map((item) => {
      return item.tags.map((ite) => ite);
    });

    const newArr = new Set(resp.flat());

    res.status(200).json({ tags: Array.from(newArr) });
    // const tagList = tags.map((tag) => tag._id);

    // res.status(200).json({ tags: tagList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching tags." });
  }
};

exports.getTagBlogs = async (req, res) => {
  const { tag } = req.params;
  try {
    // const
    const blogs = await Blog.find({ tags: tag });

    res.status(200).json({ message: blogs });
  } catch (error) {
    console.log("Error fetching blog by tag", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();

    res.status(200).json({message:"Blog deleted successfully"})
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
