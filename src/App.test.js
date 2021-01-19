import { act, fireEvent, getByTitle, render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';

describe("Form", () => {
  it("Should match the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe("Name input", () => {
  it("exists in document", () => {
    const { queryByTitle } = render(<App />);
    const nameInput = queryByTitle("name");
    expect(nameInput).toBeInTheDocument();
  })

  it("has the default text", () => {
    const { queryByTitle } = render(<App />);
    const nameInput = queryByTitle("name");
    expect(nameInput.value).toBe("test");
  })

  it("can be written on", () => {
    const { queryByTitle } = render(<App />);
    const nameInput = queryByTitle("name");
    expect(nameInput.value).not.toBe("Changed the value");
    fireEvent.change(nameInput, { target: { value: "Changed the value" } })
    expect(nameInput.value).toBe("Changed the value");
  })
})

describe("Last name input", () => {
  it("exists in document", () => {
    const { queryByTitle } = render(<App />);
    const lastNameInput = queryByTitle("lastName");
    expect(lastNameInput).toBeInTheDocument();
  })

  it("can be written on", () => {
    const { queryByTitle } = render(<App />);
    const lastNameInput = queryByTitle("lastName");
    expect(lastNameInput.value).not.toBe("Changed the value");
    fireEvent.change(lastNameInput, { target: { value: "Changed the value" } })
    expect(lastNameInput.value).toBe("Changed the value");
  })
})

describe("Submit button", () => {
  it("exists in document", () => {
    const { queryByTitle } = render(<App />);
    const submit = queryByTitle("submitButton");
    expect(submit).toBeInTheDocument();
  })

  it("Is not submitted if lastName is empty", async () => {
    const { queryByTitle } = render(<App />);
    const submit = screen.getByText('Submit');

    await act(async () => {
      fireEvent.click(submit);
    });
    const lastNameValidation = queryByTitle("lastNameValidation");
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(lastNameValidation).toBeInTheDocument();
  })

  it("Is not submitted if lastName has symbols", async () => {
    const { queryByTitle } = render(<App />);
    const submit = screen.getByText('Submit');

    const lastNameInput = queryByTitle("lastName");
    fireEvent.change(lastNameInput, { target: { value: "@" } })

    await act(async () => {
      fireEvent.click(submit);
    });
    expect(screen.getByText('Name is invalid. Only letters and spaces are accepted')).toBeInTheDocument();
    expect(queryByTitle('submittedConfirmation')).not.toBeInTheDocument();
  })

  it("Is submitted if lastName has letters and spaces and name is changed", async () => {
    const { queryByTitle } = render(<App />);
    const submit = screen.getByText('Submit');

    const nameInput = queryByTitle("name");
    fireEvent.change(nameInput, { target: { value: "This is a wonderful name" } })

    const lastNameInput = queryByTitle("lastName");
    fireEvent.change(lastNameInput, { target: { value: "This is a wonderful last name" } })

    await act(async () => {
      fireEvent.click(submit);
    });

    expect(queryByTitle('lastNameValidation')).not.toBeInTheDocument();
    expect(queryByTitle('submittedConfirmation')).toBeInTheDocument();
  })
})