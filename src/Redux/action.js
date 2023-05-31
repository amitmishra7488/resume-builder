export const SAVE_FORM_DATA = 'SAVE_FORM_DATA';

export const saveFormData = (formData) => ({
  type: SAVE_FORM_DATA,
  payload: formData,
});
