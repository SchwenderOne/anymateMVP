import breadcrumbChevron from '../assets/first-screen/breadcrumb-chevron.svg';
import characterShaman from '../assets/first-screen/character-shaman.png';
import createCharacterIcon from '../assets/first-screen/create-character-icon.svg';
import dropdownChevron from '../assets/first-screen/dropdown-chevron.svg';
import editIcon from '../assets/first-screen/edit-icon.svg';
import generatePill from '../assets/first-screen/generate-pill.svg';
import gridIcon from '../assets/first-screen/grid-icon.svg';
import logo from '../assets/first-screen/logo.svg';
import playIcon from '../assets/first-screen/play-icon.svg';
import savePill from '../assets/first-screen/save-pill.svg';
import settingsIcon from '../assets/first-screen/settings-icon.svg';
import shieldIcon from '../assets/first-screen/shield-icon.svg';
import sidebarHandle from '../assets/first-screen/sidebar-handle.svg';
import uploadCloud from '../assets/first-screen/upload-cloud.svg';
import uploadDotMd from '../assets/first-screen/upload-dot-md.svg';
import uploadDotSm from '../assets/first-screen/upload-dot-sm.svg';
import uploadDotXs from '../assets/first-screen/upload-dot-xs.svg';
import uploadPaperCenter from '../assets/first-screen/upload-paper-center.svg';
import uploadPaperLeft from '../assets/first-screen/upload-paper-left.svg';
import uploadPaperRight from '../assets/first-screen/upload-paper-right.svg';
import zoomMinus from '../assets/first-screen/zoom-minus.svg';
import zoomPlus from '../assets/first-screen/zoom-plus.svg';

export const FIRST_SCREEN_ASSETS = {
  header: {
    logo,
    savePill,
    playIcon,
    settingsIcon,
    breadcrumbChevron,
  },
  sidebar: {
    createCharacterIcon,
    dropdownChevron,
    generatePill,
    sidebarHandle,
    upload: {
      cloud: uploadCloud,
      dotMd: uploadDotMd,
      dotSm: uploadDotSm,
      dotXs: uploadDotXs,
      paperCenter: uploadPaperCenter,
      paperLeft: uploadPaperLeft,
      paperRight: uploadPaperRight,
    },
  },
  canvas: {
    characterShaman,
    editIcon,
    gridIcon,
    shieldIcon,
    zoomMinus,
    zoomPlus,
  },
} as const;
