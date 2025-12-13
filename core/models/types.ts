// Brand Types
export interface Brand {
  id: string;
  name: string;
  industry: string;
  description: string;
  logoAsset?: {
    assetUrl: string;
    thumbnailUrl?: string;
  };
  mission: string;
}

// Campaign Types
export interface Campaign {
  campaignId: string;
  brandId: string;
  name: string;
  processingStatus?: {
    modelTraining?: {
      status: string;
      progress?: number;
    };
    assetsProcessing?: {
      status: string;
      progress?: number;
    };
  };
}

// Creative Types
export interface CreativeVariation {
  creativeVariationId: string;
  assetId: string;
  imageUrl: string;
  thumbnailUrl?: string;
  width: number;
  height: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  liked: boolean;
  disliked: boolean;
  parentVariationId?: string;
}

export interface CreativeTheme {
  themeId: string;
  prompt: string;
  variations?: CreativeVariation[];
}

// API Response Types
export interface ListBrandsResponse {
  data: Brand[];
}

export interface ListCampaignsResponse {
  data: Campaign[];
}

export interface ListCreativesResponse {
  data: CreativeTheme[];
}

// Flattened Creative for Swipe UI
export interface SwipeCreative extends CreativeVariation {
  themeId: string;
  prompt: string;
}
