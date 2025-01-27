import { cnpj, cpf } from 'cpf-cnpj-validator';

/**
 * Formats a CPF or CNPJ string if valid, otherwise returns null.
 * @param value The value to be validated and formatted.
 * @returns A formatted CPF or CNPJ string, or null if invalid.
 */
export function formatCpfOrCnpj(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  if (cpf.isValid(value)) return cpf.format(value);

  if (cnpj.isValid(value)) return cnpj.format(value);

  return null;
}
