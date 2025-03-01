import React from 'react';
import { fetchFrontPage } from './page-index.server-actions';
import { Blocks } from '@/features/page-builder-blocks/shared/export-blocks';
;

// generateStaticParams

export default async function Page() {
  const frontPageData = await fetchFrontPage();
  return (
    <>
    <Blocks blocks={frontPageData?.blocks} />
    </>
  )
}


