import tokens from '../../data/tokens.json';

export const font = tokens.font;

export const color = {
  cream: tokens.color.cream.hex,
  ink: tokens.color.ink.hex,
  rust: tokens.color.rust.hex,
} as const;

export const signatures = {
  areoid: tokens.signatures.areoid.hex,
  prospectors: tokens.signatures.prospectors.hex,
  domes: tokens.signatures.domes.hex,
  tharsis: tokens.signatures.tharsis.hex,
} as const;

export default tokens;
