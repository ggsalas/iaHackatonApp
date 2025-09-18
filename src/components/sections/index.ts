import { Hero } from './Hero';
import { Features } from './Features';
import { TrustBuilder } from './TrustBuilder';
import { Testimonials } from './Testimonials';
import { Brands } from './Brands';
import { People } from './People';
import { BlogPosts } from './BlogPosts';
import { GenericContent } from './GenericContent';

export const registry = {
  Hero,
  Features,
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
