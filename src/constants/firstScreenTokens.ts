export const FIRST_SCREEN_TOKENS = {
  colors: {
    background: '#f0f0f0',
    text: '#343434',
    heading: '#4d4d4d',
    subtleText: '#c8c9ca',
    faintText: '#c0c0c0',
    accent: '#1985cc',
    accentHover: '#1570ad',
    canvasBlue: '#226ab3',
    controlBorder: 'rgba(233, 233, 233, 1)',
    glassSurface: 'rgba(229, 229, 229, 0.5)',
    whiteBorder: 'rgba(255, 255, 255, 0.62)',
    headerSurface: 'rgba(240, 240, 240, 0.92)',
    sidebarSurface: 'rgba(248, 248, 248, 0.85)',
    canvasSurface: 'rgba(248, 248, 248, 0.90)',
  },
  gradients: {
    warmBackground: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  },
  shadows: {
    surface: '0 0 42.733px 1.682px rgba(0, 0, 0, 0.05)',
    glass: '0 0 25.097px 0.988px rgba(0, 0, 0, 0.05)',
    primary: '0 8px 20px 0 rgba(25, 133, 204, 0.3)',
  },
  blur: {
    glass: '17.65px',
    sidebar: '60.313px',
  },
  radii: {
    frame: '12px',
    field: '16px',
    upload: '22px',
    pill: '27.867px',
    heroPill: '41.924px',
    actionPill: '35.907px',
  },
  layout: {
    headerHeight: '80px',
    sidebarWidth: '445px',
  },
} as const;
