declare const parent: any;

const MOCK = process.env.MOCK_ENABLED === 'true';

export function getCompId() {
  return MOCK ? 4019068 : parent?.CMSmenu?.profile?.compId;
}
