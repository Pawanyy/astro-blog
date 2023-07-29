import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function get(context) {
  const postImportResult = import.meta.glob('./blog/*.md', {eager: true});
  const posts = Object.values(postImportResult);
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: 'My Astro Blog',
    description: 'A Simple blog to test Astro',
    site: import.meta.env.SITE,
    items: posts.map((post) => {
      return {
        title: post.frontmatter.title,
        link: post.url,
        pubDate: post.frontmatter.date,
        author: post.frontmatter.author,
        description: post.frontmatter.description,
      }
    }),
  });
}