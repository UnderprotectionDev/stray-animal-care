import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

const GLOBAL_TAGS = [
  'global_header',
  'global_footer',
  'global_site-settings',
  'global_ui-strings',
]

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  for (const tag of GLOBAL_TAGS) {
    revalidateTag(tag)
  }

  return NextResponse.json({ revalidated: true, tags: GLOBAL_TAGS })
}
