export const initializeApp = jest.fn();
export const getMessaging = jest.fn(() => ({
  getToken: jest.fn(() => Promise.resolve('mockToken')),
  onMessage: jest.fn(),
}));
export const getToken = jest.fn(() => Promise.resolve('mockToken'));
export const onMessage = jest.fn();
