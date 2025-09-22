'use client'

import React from 'react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'

export default function EmotionRegistry({
  children
}: {
  children: React.ReactNode
}) {
  const [cache] = React.useState(() => {
    const cache = createCache({ key: 'mui' })
    cache.compat = true
    return cache
  })

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}