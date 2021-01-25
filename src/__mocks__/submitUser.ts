export function submitUser(name: string, lastName: string) {
    console.log("This is mocked. Good job!!")
    return new Promise(resolve => resolve({ name, lastName }));
};