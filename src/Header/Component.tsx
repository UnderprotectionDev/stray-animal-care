import { HeaderClient } from './Component.client'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderType, SiteSetting, UiString } from '@/payload-types'

type HeaderLabels = NonNullable<UiString['layout']>['header']
type SearchLabels = UiString['search']

type Props = {
  locale: string
  headerLabels?: HeaderLabels | null
  searchLabels?: SearchLabels | null
  siteSettings?: SiteSetting | null
}

export async function Header({ locale, headerLabels, searchLabels, siteSettings }: Props) {
  let headerData: HeaderType | null = null
  try {
    headerData = (await getCachedGlobal('header', 2, locale)()) as HeaderType
  } catch {
    // header global fetch failed — continue with null
  }

  return (
    <HeaderClient
      headerLabels={headerLabels}
      searchLabels={searchLabels}
      navItems={headerData?.navItems ?? null}
      socialLinks={siteSettings?.socialLinks ?? null}
      brandName={headerData?.brandName ?? null}
      logo={headerData?.logo ?? null}
    />
  )
}
