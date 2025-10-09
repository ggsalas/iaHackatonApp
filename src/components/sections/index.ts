// Hero component removed; GenericContent covers hero behavior
import { Features } from './Features';
import { TrustBuilder } from './TrustBuilder';
import { Testimonials } from './Testimonials';
import { Brands } from './Brands';
import { People } from './People';
import { BlogPosts } from './BlogPosts';
import { GenericContent } from './GenericContent';
import { SocialProof } from './SocialProof';
import { Capabilities } from './Capabilities';

export const registry = {
  Features,
  SocialProof,
  Capabilities,
  TrustBuilder,
  Testimonials,
  Brands,
  People,
  BlogPosts,
  GenericContent,
};

export type RegistryKey = keyof typeof registry;

export function getSectionComponent(id: string) {
  return (registry as any)[id] || GenericContent; // eslint-disable-line @typescript-eslint/no-explicit-any
}
