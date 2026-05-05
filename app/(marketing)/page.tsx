import { Hero } from '@/components/marketing/Hero'
import { Tracks } from '@/components/marketing/Tracks'
import { RoadmapPreview } from '@/components/marketing/RoadmapPreview'
import { ContentTypes } from '@/components/marketing/ContentTypes'
import { Outcomes } from '@/components/marketing/Outcomes'
import { BlogPreview } from '@/components/marketing/BlogPreview'
import { Newsletter } from '@/components/marketing/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="divider" />
      <Tracks />
      <hr className="divider" />
      <RoadmapPreview />
      <hr className="divider" />
      <ContentTypes />
      <hr className="divider" />
      <Outcomes />
      <hr className="divider" />
      <BlogPreview />
      <Newsletter />
    </>
  )
}
