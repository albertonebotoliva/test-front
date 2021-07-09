type Address = {
    line1: string,
    line2: string,
    postalCode: string,
    city: string,
    country: string
}

export default interface IDoctor {
    id: string,
    name: string,
    address?: Address
}