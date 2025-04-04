import { AnyZodObject, z } from 'zod';

// input sanitize for prevent xss
const inputSanitize = (input: unknown): unknown => {
  if (typeof input === 'string') {
    return (
      input
        .replace(/</g, '&lt;') // Replace < with &lt;
        .replace(/>/g, '&gt;') // Replace > with &gt;
        .replace(/&/g, '&amp;') // Replace & with &amp;
        // .replace(/"/g, '&quot;') // Replace " with &quot; // optional but recommended
        // .replace(/'/g, '&#39;') // Replace ' with &#39; // optional but recommended
        .trim()
    ); // Remove leading/trailing spaces
  }

  if (typeof input === 'object' && input !== null) {
    if (Array.isArray(input)) {
      return input.map(inputSanitize);
    }

    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => {
        if (key === 'password') {
          return [key, value]; // Keep the password field as it is
        }
        return [key, inputSanitize(value)];
      }),
    );
  }

  return input;
};

// zod object every value sanitized and use common for every schema strict mode
export const zodWithInputSanitize = <T extends AnyZodObject>(
  zodSchema: T,
): z.ZodEffects<T, z.infer<T>> => {
  const processedSchema = zodSchema.strict() as T;

  return processedSchema.transform((data) => inputSanitize(data) as z.infer<T>);
};
