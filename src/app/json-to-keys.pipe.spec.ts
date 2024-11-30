import { JsonToKeysPipe } from './json-to-keys.pipe';

describe('JsonToKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonToKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
