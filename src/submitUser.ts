export function submitUser(name: string, lastName: string): Promise<{name: string, lastName: string}> {
    return new Promise(resolve => setTimeout(() => {
        resolve({ name, lastName });
    }, 1000))
}