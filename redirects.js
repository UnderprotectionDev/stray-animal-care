const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const postsToGunlukLocale = {
    source: '/:locale(tr|en)/posts/:slug*',
    destination: '/:locale/gunluk/:slug*',
    permanent: true,
  }

  const postsToGunluk = {
    source: '/posts/:slug*',
    destination: '/gunluk/:slug*',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, postsToGunlukLocale, postsToGunluk]

  return redirects
}

export default redirects
