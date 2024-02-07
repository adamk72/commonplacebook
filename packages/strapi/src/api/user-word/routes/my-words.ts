export default {
  routes: [
    {
      method: 'GET',
      path: '/my-words',
      handler: 'my-words.exampleAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
