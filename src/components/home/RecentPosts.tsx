import React from 'react'
import { getTranslations, getFormatter } from 'next-intl/server'
import type { Post } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type RecentPostsProps = {
  posts: Post[]
}

export async function RecentPosts({ posts }: RecentPostsProps) {
  const t = await getTranslations('home.posts')
  const format = await getFormatter()

  if (!posts.length) return null

  return (
    <Section>
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <Heading as="h2">{t('title')}</Heading>
          <Button variant="outline" render={<Link href="/posts" />}>
            {t('viewAll')}
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const image = post.meta?.image
            return (
              <Link key={post.id} href={`/posts/${post.slug}`} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  {image && typeof image !== 'number' && (
                    <div className="aspect-video overflow-hidden">
                      <Media
                        resource={image}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {post.excerpt && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    )}
                    {post.publishedAt && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {format.dateTime(new Date(post.publishedAt), { dateStyle: 'medium' })}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
