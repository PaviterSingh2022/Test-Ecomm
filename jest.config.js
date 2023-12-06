module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: { "\\.(css|less)$": "<rootDir>/styleMock.js", "^.+\\.svg$": "<rootDir>/svgTransform.js" }
};