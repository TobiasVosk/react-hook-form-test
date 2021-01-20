export function submitUser(name, lastName) {
    return new Promise(resolve => setTimeout(() => {
        resolve({ name, lastName });
    }, 1000))
}