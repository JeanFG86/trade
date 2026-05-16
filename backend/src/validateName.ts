export function validateName(name: string): boolean {
    return !!name.match(/^[A-Za-z]+ [A-Za-z]+$/);
}
