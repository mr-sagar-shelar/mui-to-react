export type UnitType = 'px' | 'rem' | 'remAs10px' | 'sx'
export type LanguageType = 'javascript' | 'typescript'

export function buildSizeStringByUnit(pixelValue: number, type: UnitType): string {
  if (type === 'px') {
    return pixelValue + 'px'
  }
  if (type === 'rem') {
    return pixelValue / 16 + 'rem'
  }
  return pixelValue / 10 + 'rem'
}
