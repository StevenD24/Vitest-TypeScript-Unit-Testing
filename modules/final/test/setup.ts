import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest's expect method with methods from testing-library
expect.extend(matchers);