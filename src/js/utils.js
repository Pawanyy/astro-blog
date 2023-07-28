// slugify function
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

export function fromatDate(date) {
    return new Date(date).toLocaleDateString("en-US",{ timeZone: "UTC"});
}

export function formatBlogPosts(posts, {
    filterOutDrafts = true,
    filterOutFuterPosts = true,
    sortByDate = true,
    reverseOrder = false,
    randomize = false,
    limit = 0,
} = {}) {

    let filteredPosts = posts;
    
    if (filterOutDrafts) {
        filteredPosts = filteredPosts.filter(post => !post.frontmatter.draft);
    }
    
    if (filterOutFuterPosts) {
        filteredPosts = filteredPosts.filter(post => new Date(post.frontmatter.date) <= new Date());
    }
    
    if (sortByDate) {
        filteredPosts = filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    }
    
    if (reverseOrder) {
        filteredPosts = filteredPosts.reverse();
    }

    if(randomize){
        filteredPosts = filteredPosts.sort(() => Math.random() - 0.5);
    }
    
    if (typeof limit === "number" && limit != 0) {
        filteredPosts = filteredPosts.slice(0, limit);
    }
    
    return filteredPosts;
}