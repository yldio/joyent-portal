import Lunr from 'lunr';

Lunr.tokenizer.separator = /[\s\-|_]+/;

export default items =>
  Lunr(function() {
    const fields = items
      .map(item => Object.keys(item))
      .reduce((all, keys) => all.concat(keys), [])
      // eslint-disable-next-line no-implicit-coercion
      .reduce((all, key) => (~all.indexOf(key) ? all : all.concat(key)), [])
      .filter(key => !key.match(/^__/));

    fields.forEach(field => this.field(field));
    items.forEach(item => this.add(item));
  });
