// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import 'core-js/actual/structured-clone';
import 'whatwg-fetch';
import "@testing-library/jest-dom";

// Mock Firebase Messaging
jest.mock('firebase/messaging', () => ({
    getToken: jest.fn(() => Promise.resolve("mockToken")),
    onMessage: jest.fn(),
    onBackgroundMessage: jest.fn(),
  }));
  