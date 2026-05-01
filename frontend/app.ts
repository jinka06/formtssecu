import { RegisterRequest, RegisterResponse, ValidationError } from './types.js';

const API_BASE_URL = 'http://localhost:3000';

const form = document.getElementById('registration-form') as HTMLFormElement;
const submitButton = document.getElementById(
  'submit-button'
) as HTMLButtonElement;
const userCountDisplay = document.getElementById(
  'user-count'
) as HTMLDivElement;

function updateUserCount(count?: number): void {
  if (!userCountDisplay) return;
  userCountDisplay.textContent = count?.toLocaleString() || '0';
}

function setLoading(isLoading: boolean): void {
  if (isLoading) {
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
  } else {
    submitButton.textContent = 'Register';
    submitButton.disabled = false;
  }
}
async function fetchUserCount(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user-count`);
    const data = await res.json();
    updateUserCount(data.mockUserCount);
  } catch (error) {
    console.error('Error fetching user count:', error);
    updateUserCount();
  }
}

async function handleFormSubmit(event: Event): Promise<void> {
  event.preventDefault();
  submitButton.disabled = true;
  const formData = new FormData(form);
  const requestData: RegisterRequest = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    age: formData.get('age') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    bio: (formData.get('bio') as string) || undefined,
  };

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    const result: RegisterResponse = await response.json();

    if (response.ok) {
      alert(result.message || 'Registration successful!');
      updateUserCount(result.mockUserCount);
      form.reset();
    } else {
      const errorMessages =
        result.errors
          ?.map((err: ValidationError) => `${err.field}: ${err.message}`)
          .join('\n') ||
        result.message ||
        'An error occurred.';
      alert(`Registration failed:\n${errorMessages}`);
    }
  } catch (error) {
    console.error('Error submitting registration form:', error);
    alert('An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
}

fetchUserCount();
form.addEventListener('submit', handleFormSubmit);
