import { Jar } from './jar';

describe('Jar', () => {
  it('should create an instance', () => {
    expect(new Jar()).toBeTruthy();
  });

  it('should accept values in the constructor',() =>{
    let jar = new Jar({
      jarName: 'My Jar',
      
    });
    expect(jar.jarName).toEqual('My Jar');
  });

});
