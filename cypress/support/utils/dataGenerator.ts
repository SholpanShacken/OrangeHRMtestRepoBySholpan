// cypress/utils/dataGenerator.ts

export function generateRandomString(length: number = 5): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomEmail(domain: string = 'example.com'): string {
  return `<span class="math-inline">\{generateRandomString\(8\)\.toLowerCase\(\)\}@</span>{domain}`;
}