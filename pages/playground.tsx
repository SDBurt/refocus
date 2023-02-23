import Head from "next/head"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import TaskList from "@/components/TaskList"

export default function PlaygroundPage() {

  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
        <meta
          name="description"
          content={siteConfig.description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container max-w-[980px] items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-2 space-y-8">
          <TaskList />
        </div>
      </section>
    </Layout>
  )
}
