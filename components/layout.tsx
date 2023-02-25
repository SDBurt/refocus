interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>
        <div className="flex justify-center items-center w-screen h-screen">{children}</div>
      </main>
    </>
  )
}
