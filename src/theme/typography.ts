export const getFontFamily = (weight?: string) => {
  switch (weight) {
    case '100':
      return 'Poppins-Thin';
    case '200':
      return 'Poppins-ExtraLight';
    case '300':
      return 'Poppins-Light';
    case '400':
      return 'Poppins-Regular';
    case '500':
      return 'Poppins-Medium';
    case '600':
      return 'Poppins-SemiBold';
    case '700':
      return 'Poppins-Bold';
    case '800':
      return 'Poppins-ExtraBold';
    case '900':
      return 'Poppins-Black';
    default:
      return 'Poppins-Regular';
  }
};
