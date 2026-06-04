const emptyTypeScriptParser = {
  parseForESLint(code) {
    return {
      ast: {
        type: 'Program',
        sourceType: 'module',
        body: [],
        comments: [],
        tokens: [],
        range: [0, code.length],
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: code.length }
        }
      },
      visitorKeys: {
        Program: []
      }
    };
  }
};

export default [
  {
    ignores: ['dist/**', 'coverage/**']
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: emptyTypeScriptParser,
      sourceType: 'module'
    },
    rules: {}
  }
];
