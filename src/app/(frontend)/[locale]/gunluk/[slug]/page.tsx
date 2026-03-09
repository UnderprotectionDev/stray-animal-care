import { BlogDetail, getBlogPostBySlug } from "@/modules/blog"

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  return <BlogDetail post={post} />
}
