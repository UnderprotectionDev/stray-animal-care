import { BlogList, BlogFilter, getBlogPosts } from "@/modules/blog"

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return (
    <>
      <BlogFilter />
      <BlogList posts={posts} />
    </>
  )
}
