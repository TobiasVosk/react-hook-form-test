import { render, screen } from '@testing-library/react';
import App from './App';

describe("Name input", () => {
  it("exists in document", () => {
    const { queryByPlaceholderText } = render(<App />);
    const nameInput = queryByPlaceholderText("Name");
    expect(nameInput).toBeInTheDocument();
  })
})