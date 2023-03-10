declare const parent: any;

const MOCK = process.env.MOCK_ENABLED === 'true';

export function getCompanyAcronym() {
  return MOCK ? 'TesteDomMicrosoft' : parent?.CMSmenu?.profile?.companyacronym;
}
