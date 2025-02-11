import React from 'react';
import { fetchFrontPage } from './blog-slug.server-actions';
import Blocks from '@/features/page-builder-blocks/block-indexer';

// generateStaticParams

export default async function Page() {
  const frontPageData = await fetchFrontPage();
  return (
    <>
    <h1>Front Page Data</h1>
    <pre>{JSON.stringify(frontPageData, null, 2)}</pre>
    <Blocks blocks={frontPageData?.blocks} />
    </>
  )
}


