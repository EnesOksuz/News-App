import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config/v3';

const customConfig = {
  theme: {
    font: {
      family: 'System', // Use system font instead of Inter
    },
  },
};

export default createTamagui({ ...config, ...customConfig });