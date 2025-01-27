import { formatCpfOrCnpj } from './formatters';
import { cpf, cnpj } from 'cpf-cnpj-validator';

describe('formatCpfOrCnpj', () => {
  it('should format valid CPF', () => {
    const validCpf = cpf.generate();
    const formattedCpf = formatCpfOrCnpj(validCpf);

    expect(formattedCpf).toBe(cpf.format(validCpf));
  });

  it('should format valid CNPJ', () => {
    const validCnpj = cnpj.generate();
    const formattedCnpj = formatCpfOrCnpj(validCnpj);

    expect(formattedCnpj).toBe(cnpj.format(validCnpj));
  });

  it('should return null for invalid CPF', () => {
    const invalidCpf = '123.456.789-99';
    const result = formatCpfOrCnpj(invalidCpf);

    expect(result).toBeNull();
  });

  it('should return null for invalid CNPJ', () => {
    const invalidCnpj = '12.345.678/0001-00';
    const result = formatCpfOrCnpj(invalidCnpj);

    expect(result).toBeNull();
  });

  it('should return null for invalid input', () => {
    const result1 = formatCpfOrCnpj([]);
    const result2 = formatCpfOrCnpj({});
    const result3 = formatCpfOrCnpj(123);
    const result4 = formatCpfOrCnpj(true);
    const result5 = formatCpfOrCnpj(null);
    const result6 = formatCpfOrCnpj(() => {});
    const result7 = formatCpfOrCnpj(undefined);
    const result8 = formatCpfOrCnpj(Symbol('test'));
    const result9 = formatCpfOrCnpj('@#$%^&*()1234567890');

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
    expect(result4).toBeNull();
    expect(result5).toBeNull();
    expect(result6).toBeNull();
    expect(result7).toBeNull();
    expect(result8).toBeNull();
    expect(result9).toBeNull();
  });
});
