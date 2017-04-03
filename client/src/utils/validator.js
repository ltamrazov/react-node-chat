export const required = value => value ? undefined : 'This is a required field';
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
export const minValue = min => value =>
  value && value.length < min ? `Must be at least ${min}` : undefined;
export const minValuePwd = minValue(8);
