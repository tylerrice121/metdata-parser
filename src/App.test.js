import { render, screen, fireEvent, findByTestId, waitFor} from '@testing-library/react';
import App from './App';

test('renders textfield', () => {
  render(<App />);
  const textFieldElement = screen.getByRole("textbox");
  expect(textFieldElement).toBeInTheDocument();
});

// test text field to update data state

test('User types into text field and the target value changes', () => {
  render(<App />);
  const textFieldElement = screen.getByRole("textbox");
  fireEvent.change(textFieldElement, { target: {value: "This is a test"} });
  expect(textFieldElement.value).toBe("This is a test");
});

// when button is pressed, information should show up in 

test('Error message shows if user does not type in metadata', () => {
  render(<App />);
  const textFieldElement = screen.getByRole("textbox");
  const buttonElement = screen.getByTestId("button")
  fireEvent.change(textFieldElement, { target: {value: ""} });
  fireEvent.click(buttonElement);

  waitFor(()=> expect(findByTestId('error')).toBeInTheDocument());
});