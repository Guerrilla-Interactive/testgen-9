import React from 'react';
import { fetchFrontPage } from './blog-slug.server-actions';
import Blocks from '@/features/page-builder-blocks/block-indexer';

// generateStaticParams

export default async function Page() {
  const frontPageData = await fetchFrontPage();
  return (
    <>
    <Blocks blocks={frontPageData?.blocks} />
    </>
  )
}


