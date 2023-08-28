export const typeDefs = `
  type Device {
    name: String!, 
  }

  type Query {
    devices: [Device!]!
  }
`;
