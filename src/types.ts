export interface CampaignMetric {
  id: string;
  title: string;
  category: 'quytap' | 'mo_lietsi' | 'than_nhan' | 'giam_dinh';
  current: number;
  target: number;
  unit: string;
  subText?: string;
  highlight?: string;
  growthRate?: string;
  qualified?: number; // for qualified samples
  qualifiedUnit?: string;
  iconName: string;
}

export interface RegionData {
  id: string;
  name: string;
  militaryZone: string;
  gravesSurveyed: number;
  gravesTarget: number;
  qualifiedSamples: number;
  relativeSamples: number;
  remainsFound: number;
  lastUpdated: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'current' | 'target';
  status: 'completed' | 'in_progress' | 'upcoming';
}

export interface LiveFeedItem {
  id: string;
  timestamp: string;
  unit: string;
  action: string;
  count: number;
  unitLabel: string;
  location: string;
}
