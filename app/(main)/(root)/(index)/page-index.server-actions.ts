

import { sanityFetch } from "@/sanity/lib/live";
import { GET_FRONT_PAGE_QUERY } from "./page-index.route-query";

export async function fetchFrontPage() {
    const { data } = await sanityFetch({
        query: GET_FRONT_PAGE_QUERY,
        
    });
    return data;
}



