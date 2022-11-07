module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // transform: {
    //     '^.+\\.ts?$': 'ts-jest',
    // },
    testEnvironment: 'jest-environment-node',
    transform: {}
    // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};