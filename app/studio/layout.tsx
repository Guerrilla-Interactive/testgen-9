export const metadata = {
  title: 'Studio',
  description: 'Studio for Sanity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>

  )
}
