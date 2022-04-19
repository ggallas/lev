import { useState, ClipboardEvent, ChangeEvent } from 'react';

type InputHookProps = {
  validation?: (input: string) => boolean;
};

export const useInputHook = ({ validation }: InputHookProps) => {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event === 'string') {
      setInput('');
      return;
    }
    event.preventDefault();
    inputError && setInputError(false);
    if (validation && !validation(event.target.value)) {
      setInputError(true);
    }
    setInput(event.target.value);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = event.clipboardData.getData('text');
    if (validation && !validation(pastedValue)) {
      setInputError(true);
      setInput('');
    } else setInput(pastedValue);
  };
  return [input, inputError, handleInputChange, handlePaste] as const;
};
