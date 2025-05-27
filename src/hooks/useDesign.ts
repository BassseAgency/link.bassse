import { useCMS } from '../context/CMSContext';

export const useDesign = () => {
  const { artistData } = useCMS();
  
  const primaryColor = artistData?.design?.primaryColor || '#f69f16';
  const secondaryColor = artistData?.design?.secondaryColor || '#e6950f';
  
  const design = artistData?.design || {
    primaryColor: '#f69f16',
    secondaryColor: '#e6950f',
    photosLayout: 'grid',
    buttonStyle: 'rounded'
  };

  const getButtonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
    const baseClasses = 'font-bold transition-all duration-300 flex items-center gap-2 justify-center';
    
    const styleClasses = {
      rounded: 'rounded-lg',
      square: 'rounded-none',
      pill: 'rounded-full'
    };
    
    const variantClasses = {
      primary: 'text-black hover:opacity-90',
      secondary: 'bg-transparent border-2 hover:bg-opacity-10'
    };
    
    return `${baseClasses} ${styleClasses[design.buttonStyle]} ${variantClasses[variant]}`;
  };

  const getButtonStyle = (variant: 'primary' | 'secondary' = 'primary') => {
    if (variant === 'primary') {
      return {
        backgroundColor: design.primaryColor,
        color: '#000'
      };
    } else {
      return {
        borderColor: design.primaryColor,
        color: design.primaryColor,
        backgroundColor: 'transparent'
      };
    }
  };

  const getGradientStyle = () => {
    return {
      background: `linear-gradient(to right, ${design.primaryColor}, ${design.secondaryColor})`
    };
  };

  const getPhotosGridClasses = () => {
    if (design.photosLayout === 'centered') {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center';
    }
    return 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4';
  };

  return {
    primaryColor,
    secondaryColor,
    design,
    getButtonClasses,
    getButtonStyle,
    getGradientStyle,
    getPhotosGridClasses,
    buttonStyle: design.buttonStyle,
    photosLayout: design.photosLayout,
    getPrimaryStyle: (opacity = 1) => ({
      color: primaryColor,
      opacity
    }),
    getSecondaryStyle: (opacity = 1) => ({
      color: secondaryColor,
      opacity
    }),
    getPrimaryBgStyle: (opacity = 1) => ({
      backgroundColor: primaryColor,
      opacity
    }),
    getSecondaryBgStyle: (opacity = 1) => ({
      backgroundColor: secondaryColor,
      opacity
    }),
    getPrimaryBorderStyle: (opacity = 1) => ({
      borderColor: primaryColor,
      opacity
    }),
    getCSSVariables: () => ({
      '--primary-color': primaryColor,
      '--secondary-color': secondaryColor
    })
  };
}; 