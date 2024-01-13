import { groq } from 'next-sanity'
import { readClient } from '@/sanity/lib/client'
import { buildQuery } from '@/sanity/utils'

interface GetResourcesParams {
  query: string
  category: string
  page: string
}

export const getResources = async (params: GetResourcesParams) => {
  const { query, category, page } = params

  try {
    const resources = await readClient.fetch(
      groq`${buildQuery({
        type: 'resource',
        query,
        category,
        page: parseInt(page)
      })}{
        title,
        _id,
        downloadLink,
        "image": poster.asset->url,
        views,
        slug,
        category
      }`
    )

    return resources
  } catch (e) {
    console.log(e)
  }
}