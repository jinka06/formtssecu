let mockUserCount = 11_456;

export interface MockUser {
  name: string;
  email: string;
  age: string;
  username: string;
  bio?: string;
}

const mockUsers: MockUser[] = [];

export const getMockUserCount = () => mockUserCount;
export const getMockUsers = () => mockUsers;

export const addMockUser = (user: MockUser) => {
  mockUsers.push(user);
  mockUserCount++;
  console.log(
    `New user registered: ${user.username} (total: ${mockUserCount})`
  );
};

export const resetMockUserCount = () => {
  mockUserCount = 11_456;
};
export const wipeMockUsers = () => {
  mockUsers.length = 0;
  mockUserCount = 0;
};
