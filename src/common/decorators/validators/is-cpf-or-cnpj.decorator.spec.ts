import { validate } from 'class-validator';
import { IsCpfOrCnpj } from './is-cpf-or-cnpj.decorator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

class TestClass {
  @IsCpfOrCnpj()
  document: string;
}

describe('IsCpfOrCnpj', () => {
  let testClass: TestClass;

  beforeEach(() => {
    testClass = new TestClass();
  });

  it('deve aceitar um CPF válido', async () => {
    testClass.document = cpf.generate();
    const errors = await validate(testClass);

    expect(errors.length).toBe(0);
  });

  it('deve aceitar um CNPJ válido', async () => {
    testClass.document = cnpj.generate();
    const errors = await validate(testClass);

    expect(errors.length).toBe(0);
  });

  it('deve rejeitar um CPF inválido', async () => {
    testClass.document = '12345678900';
    const errors = await validate(testClass);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('IsCpfOrCnpjConstraint');
  });

  it('deve rejeitar um CNPJ inválido', async () => {
    testClass.document = '12345678000100';
    const errors = await validate(testClass);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('IsCpfOrCnpjConstraint');
  });

  it('deve rejeitar um valor que não é nem CPF nem CNPJ', async () => {
    testClass.document = 'abcdef';
    const errors = await validate(testClass);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('IsCpfOrCnpjConstraint');
  });
});
