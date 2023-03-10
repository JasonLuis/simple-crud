declare const parent: any;

const MOCK = process.env.MOCK_ENABLED === 'true';

export function getStoreAcronym() {
  return MOCK ? 'telerese' : parent?.CMSmenu?.profile?.storecompanyacronym;
}
