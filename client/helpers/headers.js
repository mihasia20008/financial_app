const getFetchOptions = options => {
  return {
    method: options.method,
    headers: new Headers(),
    mode: 'cors',
    cache: 'default',
		body: options.body || ''
  };
};

export { getFetchOptions };
