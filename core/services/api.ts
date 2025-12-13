import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './helpers/base-query.service';
import type { Brand, Campaign, SwipeCreative, ListBrandsResponse, ListCampaignsResponse, ListCreativesResponse } from '@/core/models/types';

export const mobileApi = createApi({
  reducerPath: 'mobileApi',
  baseQuery,
  tagTypes: ['Creatives'],
  endpoints: (builder) => ({
    // 1. GET /v1/brands
    getBrands: builder.query<Brand[], void>({
      query: () => ({ url: 'brands', method: 'GET' }),
      transformResponse: (response: ListBrandsResponse) => response.data.reverse(),
    }),

    // 2. GET /v1/brands/{brandId}/campaigns
    getBrandCampaigns: builder.query<Campaign[], string>({
      query: (brandId) => ({
        url: `brands/${brandId}/campaigns`,
        method: 'GET',
      }),
      transformResponse: (response: ListCampaignsResponse) => response.data,
    }),

    // 3. GET /v1/campaigns/{campaignId}/creatives
    getCampaignCreatives: builder.query<SwipeCreative[], string>({
      query: (campaignId) => ({
        url: `campaigns/${campaignId}/creatives`,
        method: 'GET',
      }),
      transformResponse: (response: ListCreativesResponse) => {
        // Flatten variations from all themes
        const creatives = response.data || [];
        return creatives.flatMap((theme) =>
          (theme.variations || []).map((v) => ({
            ...v,
            themeId: theme.themeId,
            prompt: theme.prompt,
          }))
        );
      },
      providesTags: ['Creatives'],
    }),

    // 4. POST /v1/creatives/{creativeId}/like
    likeCreative: builder.mutation<void, string>({
      query: (creativeId) => ({
        url: `creatives/${creativeId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Creatives'],
    }),

    // 5. POST /v1/creatives/{creativeId}/dislike
    dislikeCreative: builder.mutation<void, string>({
      query: (creativeId) => ({
        url: `creatives/${creativeId}/dislike`,
        method: 'POST',
      }),
      invalidatesTags: ['Creatives'],
    }),
  }),
});

export const { useGetBrandsQuery, useGetBrandCampaignsQuery, useGetCampaignCreativesQuery, useLikeCreativeMutation, useDislikeCreativeMutation } = mobileApi;
