const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const xmlescape = require('xml-escape')
const md = require('markdown-it')()

const getPosts = () => {
  let blogPosts = [{
    path: '/episode'
  }]

  fs.readdirSync(path.join(__dirname, '../content/episode/')).forEach(blogPost => {
    const filename = `${blogPost.substr(0, blogPost.length - 8)}`
    const urlPath = `/episode/${filename.substr(11, blogPost.length)}`
    const post = fs.readFileSync(path.resolve(`content/episode/${blogPost}`), 'utf8')
    const frontmatter = fm(post)

    blogPosts.push({
      path: urlPath,
      title: frontmatter.attributes.title,
      date: frontmatter.attributes.date,
      topics: frontmatter.attributes.topics,
      duration: frontmatter.attributes.duration,
      audio_file_path: frontmatter.attributes.audio_file_path,
      audio_file_size: frontmatter.attributes.audio_file_size,
      actor_ids: frontmatter.attributes.actor_ids,
      body: xmlescape(md.render(frontmatter.body))
    })
  })

  return blogPosts
}

module.exports.sitemap = {
  all: Array.prototype.concat(getPosts().map(p => p.path)),
  posts: getPosts()
}
