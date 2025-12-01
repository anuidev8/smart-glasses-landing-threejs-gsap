import React from 'react';

export enum SceneType {
  HERO = 'HERO',
  // PAST
  PAST_1200 = 'PAST_1200',
  PAST_1780 = 'PAST_1780',
  PAST_FASHION = 'PAST_FASHION',
  // PRESENT
  PRESENT_ACCESS = 'PRESENT_ACCESS',
  PRESENT_LEARNING = 'PRESENT_LEARNING',
  PRESENT_NAV = 'PRESENT_NAV',
  PRESENT_WORK = 'PRESENT_WORK',
  // FUTURE
  FUTURE_TRANSLATE = 'FUTURE_TRANSLATE',
  FUTURE_HEALTH = 'FUTURE_HEALTH',
  FUTURE_COMPANION = 'FUTURE_COMPANION',
  // BREAKDOWN & CTA
  BREAKDOWN = 'BREAKDOWN',
  CTA = 'CTA'
}

export interface HUDProps {
  scene: SceneType;
}

export interface GlassesProps {
  wireframe?: boolean;
}
