// cypress/utils/dataGenerator.ts

export function generateRandomString(length: number = 7): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const allChars = letters + digits;
  
   let result = digits.charAt(Math.floor(Math.random() * digits.length));

  // Fills the rest
  for (let i = 1; i < length; i++) {
    result += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle the result
  return result.split('').sort(() => 0.5 - Math.random()).join('');
};
 

 export function generateRandomEmail(domain: string = 'example.com'): string {
  return `${generateRandomString(8).toLowerCase()}@${domain}`;
};

export function generateRandomPhoneNumber(): string {
  const digits = '0123456789';
  let rawNumber = '';

  // Generate 10 random digits
  for (let i = 0; i < 10; i++) {
    rawNumber += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  // Format as xxx-xxx-xxxx
  const formatted = `${rawNumber.slice(0, 3)}-${rawNumber.slice(3, 6)}-${rawNumber.slice(6)}`;
  return formatted;
};


export function generateRandomProvince(): string {
  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan'
  ];

  const randomIndex = Math.floor(Math.random() * provinces.length);
  return provinces[randomIndex];
};

export function generateRandomBCcity(): string {
  const bcCities = [
  "Abbotsford",
  "Armstrong",
  "Burnaby",
  "Campbell River",
  "Castlegar",
  "Chilliwack",
  "Colwood",
  "Coquitlam",
  "Courtenay",
  "Cranbrook",
  "Dawson Creek",
  "Delta",
  "Duncan",
  "Enderby",
  "Fort St. John",
  "Grand Forks",
  "Greenwood",
  "Kamloops",
  "Kelowna",
  "Kimberley",
  "Kitimat",
  "Langley",
  "Maple Ridge",
  "Merritt",
  "Mission",
  "Nanaimo",
  "Nelson",
  "New Westminster",
  "North Vancouver",
  "Penticton",
  "Pitt Meadows",
  "Port Coquitlam",
  "Port Moody",
  "Prince George",
  "Prince Rupert",
  "Quesnel",
  "Revelstoke",
  "Rossland",
  "Surrey",
  "Terrace",
  "Trail",
  "Vancouver",
  "Vernon",
  "Victoria",
  "West Vancouver",
  "Williams Lake",
  "White Rock",
  "Hope",
  "Powell River"
];

  const randomIndex = Math.floor(Math.random() *bcCities.length);
  return bcCities[randomIndex];
};

export function generateRandomCanadianPostalCode(): string {
  const letters = 'ABCEGHJKLMNPRSTVXY'; // allowed first letters (no D, F, I, O, Q, U, W, Z)
  const digits = '0123456789';

  const getRandom = (set: string) => set.charAt(Math.floor(Math.random() * set.length));

  return (
    getRandom(letters) +
    getRandom(digits) +
    getRandom(letters) +
    getRandom(digits) +
    getRandom(letters) +
    getRandom(digits)
  );
}
