import { describe, expect, it } from 'vitest';
import { hardSkillsList, softSkillsList } from './data/portfolio';

describe('Skills Lists', () => {
  it('defines hard skills with verifiable evidence', () => {
    expect(hardSkillsList.length).toBeGreaterThan(0);
    
    for (const category of hardSkillsList) {
      expect(category.title.pt).toBeDefined();
      expect(category.title.en).toBeDefined();
      expect(category.description.pt).toBeDefined();
      expect(category.description.en).toBeDefined();
      expect(category.items.length).toBeGreaterThan(0);
      
      for (const item of category.items) {
        expect(item.name.pt).toBeDefined();
        expect(item.name.en).toBeDefined();
        expect(item.evidence.pt).toBeDefined();
        expect(item.evidence.en).toBeDefined();
        expect(item.tags.length).toBeGreaterThan(0);
      }
    }
  });

  it('defines soft skills with verifiable evidence', () => {
    expect(softSkillsList.length).toBeGreaterThan(0);
    
    for (const category of softSkillsList) {
      expect(category.title.pt).toBeDefined();
      expect(category.title.en).toBeDefined();
      expect(category.description.pt).toBeDefined();
      expect(category.description.en).toBeDefined();
      expect(category.items.length).toBeGreaterThan(0);
      
      for (const item of category.items) {
        expect(item.name.pt).toBeDefined();
        expect(item.name.en).toBeDefined();
        expect(item.evidence.pt).toBeDefined();
        expect(item.evidence.en).toBeDefined();
        expect(item.tags.length).toBeGreaterThan(0);
      }
    }
  });
});
