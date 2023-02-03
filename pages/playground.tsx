import Head from "next/head"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import PomodoroClock from "@/components/PomodoroClock"
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

      <section className="container items-center gap-6 pt-6 pb-8 md:py-10 max-w-[980px]">
        <div className="flex flex-col gap-2 items-center space-y-8 justify-center">
          <PomodoroClock />
          <TaskList />
        </div>
      </section>
    </Layout>
  )
}
