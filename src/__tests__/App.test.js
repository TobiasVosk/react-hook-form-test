import { act, fireEvent, getByTitle, render } from '@testing-library/react';
import App from '../App';

jest.mock('../submitUser');

describe("Form", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  })
})

describe("Name input", () => {
  it("can be written on", () => {
    const { queryByTitle } = render(<App />);
    const nameInput = queryByTitle("name");
    expect(nameInput.value).not.toBe("Changed the value");
    fireEvent.change(nameInput, { target: { value: "Changed the value" } })
    expect(nameInput.value).toBe("Changed the value");
  })
})

describe("Last name input", () => {
  it("can be written on", () => {
    const { queryByTitle } = render(<App />);
    const lastNameInput = queryByTitle("lastName");
    expect(lastNameInput.value).not.toBe("Changed the value");
    fireEvent.change(lastNameInput, { target: { value: "Changed the value" } })
    expect(lastNameInput.value).toBe("Changed the value");
  })
})

describe("Select input", () => {
  it("can be changed", () => {
    const { queryByTestId } = render(<App />);
    const categorySelect = queryByTestId("select-category");
    expect(categorySelect.value).toBe("");
    fireEvent.change(categorySelect, { target: { value: "A" } })
    expect(categorySelect.value).toBe("A");
  })
})

describe("Submit button", () => {
  it("should be disabled if no input is dirty", async () => {
    const { queryByTestId } = render(<App />);
    const submit = queryByTestId("submit-btn");

    expect(submit).toBeDisabled();
    await act(async () => {
      fireEvent.click(submit);
    });
  })

  it("should not submit if lastName is empty", async () => {
    const { queryByTitle, queryByTestId } = render(<App />);
    const submit = queryByTestId("submit-btn");

    const lastNameInput = queryByTitle("lastName");

    fireEvent.input(lastNameInput, { target: { value: "asd" } })
    fireEvent.input(lastNameInput, { target: { value: "" } })

    await act(async () => {
      fireEvent.click(submit);
    });

    const lastNameValidation = queryByTestId("last-name-validation-error")
    expect(lastNameValidation).toBeInTheDocument();
    expect(lastNameValidation.textContent).toEqual('Last name is required');
    expect(queryByTitle('submittedConfirmation')).not.toBeInTheDocument();
  })

  it("should not submit if lastName has symbols", async () => {
    const { queryByTitle, queryByTestId } = render(<App />);
    const submit = queryByTestId("submit-btn");

    const lastNameInput = queryByTitle("lastName");

    fireEvent.input(lastNameInput, { target: { value: "@" } })

    await act(async () => {
      fireEvent.click(submit);
    });

    const lastNameValidation = queryByTestId("last-name-validation-error")
    expect(lastNameValidation).toBeInTheDocument();
    expect(lastNameValidation.textContent).toEqual('Last name is invalid. Only letters and spaces are accepted');
    expect(queryByTitle('submittedConfirmation')).not.toBeInTheDocument();
  })

  it("should submit if lastName has letters and spaces, name is changed and select is empty", async () => {
    const { queryByTitle, queryByTestId } = render(<App />);
    const submit = queryByTestId("submit-btn");

    const name = "This is a wonderful name"
    const lastName = "This is a wonderful last name"

    const nameInput = queryByTitle("name");
    fireEvent.input(nameInput, { target: { value: name } })

    const lastNameInput = queryByTitle("lastName");
    fireEvent.input(lastNameInput, { target: { value: lastName } })

    expect(submit).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submit);
    });

    expect(queryByTitle('lastNameValidation')).not.toBeInTheDocument();
    expect(queryByTitle('submittedConfirmation')).toBeInTheDocument();

    const newNameInput = queryByTitle("name");
    expect(newNameInput.value).toEqual(name);

    const newLastNameInput = queryByTitle("lastName");
    expect(newLastNameInput.value).toEqual(lastName);

    const submittedLastName = queryByTestId("submitted-last-name");
    expect(submittedLastName).toBeInTheDocument();
    expect(submittedLastName.textContent).toEqual(lastName);

    const submittedName = queryByTestId("submitted-name")
    expect(submittedName).toBeInTheDocument();
    expect(submittedName.textContent).toEqual(name);

  })

  it("should submit if lastName has letters and spaces, name is changed and select is changed", async () => {
    const { queryByTitle, queryByTestId } = render(<App />);
    const submit = queryByTestId("submit-btn");

    const name = "This is a wonderful name"
    const lastName = "This is a wonderful last name"

    const nameInput = queryByTitle("name");
    fireEvent.input(nameInput, { target: { value: name } })

    const lastNameInput = queryByTitle("lastName");
    fireEvent.input(lastNameInput, { target: { value: lastName } })

    const categorySelect = queryByTestId("select-category");
    fireEvent.change(categorySelect, { target: { value: "A" } })

    expect(submit).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submit);
    });

    expect(queryByTitle('lastNameValidation')).not.toBeInTheDocument();
    expect(queryByTitle('submittedConfirmation')).toBeInTheDocument();

    const newNameInput = queryByTitle("name");
    expect(newNameInput.value).toEqual(name);

    const newLastNameInput = queryByTitle("lastName");
    expect(newLastNameInput.value).toEqual(lastName);

    const submittedLastName = queryByTestId("submitted-last-name");
    expect(submittedLastName).toBeInTheDocument();
    expect(submittedLastName.textContent).toEqual(lastName);

    const submittedName = queryByTestId("submitted-name")
    expect(submittedName).toBeInTheDocument();
    expect(submittedName.textContent).toEqual(name);

  })

})