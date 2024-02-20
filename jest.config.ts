module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@prisma/client$': 'backend-developer-test/node_modules/@prisma/client',
  },
};
