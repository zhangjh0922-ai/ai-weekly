export const capabilityIds = ['text', 'vision', 'search', 'code', 'files', 'image', 'audio-in', 'audio-out', 'video', 'tools', 'browser', 'computer'] as const;
export type CapabilityId = typeof capabilityIds[number];
export type CapabilityStatus = 'native' | 'tool' | 'product' | 'unsupported';
export interface CapabilityEvidence {
  status: CapabilityStatus;
  detail: string;
  source: string;
  sourceLabel: string;
  checkedAt: string;
}
export interface CapabilityModel {
  id: string;
  name: string;
  org: string;
  kind: 'general' | 'specialist';
  entry: string;
  note: string;
  capabilities: Partial<Record<CapabilityId, CapabilityEvidence>>;
}
