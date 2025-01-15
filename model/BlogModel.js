const mongoose = require("mongoose");
const cheerio = require("cheerio"); // Library to parse HTML

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true, required: true },
  toc: { type: Array, default: [] },
});

blogSchema.pre("save", function (next) {
  const content = this.content;
  const $ = cheerio.load(content);

  const toc = [];

  $("h1, h2, h3, h4, h5, h6").each((index, element) => {
    const headingText = $(element).text();
    const headingId =
      $(element).attr("id") || headingText.toLowerCase().replace(/\s+/g, "-");

    $(element).attr("id", headingId);

    toc.push({ text: headingText, link: `#${headingId}` });
  });

  this.toc = toc;
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
