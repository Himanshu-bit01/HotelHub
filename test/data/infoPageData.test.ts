import { getInfoPageData } from '../../src/screens/InfoPages/infoPageData';

describe('infoPageData', () => {
  it('should return meals info page data', () => {
    const data = getInfoPageData('meals');
    expect(data).toBeDefined();
    expect(data!.title).toBe('Meals');
  });

  it('should return rules info page data', () => {
    const data = getInfoPageData('rules');
    expect(data).toBeDefined();
    expect(data!.title).toBe('Villa Rules');
  });

  it('should return deposit info page data', () => {
    const data = getInfoPageData('deposit');
    expect(data).toBeDefined();
    expect(data!.title).toBe('Security Deposit');
  });

  it('should return checkin info page data', () => {
    const data = getInfoPageData('checkin');
    expect(data).toBeDefined();
    expect(data!.title).toBe('Check-in');
  });

  it('should return undefined for unknown type', () => {
    expect(getInfoPageData('unknown')).toBeUndefined();
  });

  it('should have title, subtitle, and sections for each page', () => {
    const types = ['meals', 'rules', 'deposit', 'checkin'];
    types.forEach((type) => {
      const data = getInfoPageData(type)!;
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('subtitle');
      expect(data).toHaveProperty('sections');
    });
  });

  it('should have sections array with title and content', () => {
    const data = getInfoPageData('meals')!;
    expect(Array.isArray(data.sections)).toBe(true);
    data.sections.forEach((section) => {
      expect(section).toHaveProperty('title');
      expect(section).toHaveProperty('content');
    });
  });

  it('meals should have Breakfast, Lunch, Dinner, Other Services sections', () => {
    const data = getInfoPageData('meals')!;
    const sectionTitles = data.sections.map((s) => s.title);
    expect(sectionTitles).toContain('Breakfast');
    expect(sectionTitles).toContain('Lunch');
    expect(sectionTitles).toContain('Dinner');
    expect(sectionTitles).toContain('Other Services');
  });

  it('rules should have Check-in, Noise, Property Care, Pool sections', () => {
    const data = getInfoPageData('rules')!;
    const sectionTitles = data.sections.map((s) => s.title);
    expect(sectionTitles.some((t) => t.includes('Check-in'))).toBe(true);
    expect(sectionTitles.some((t) => t.includes('Noise'))).toBe(true);
    expect(sectionTitles.some((t) => t.includes('Property Care'))).toBe(true);
    expect(sectionTitles.some((t) => t.includes('Pool'))).toBe(true);
  });
});
