export function formatarCelular(celular: string): string {
    const numeros = celular.replace(/\D/g, '');
    if (numeros.length !== 11) return celular; // retorna como está se não tiver 11 dígitos
    return numeros.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
}