function useFormSubmit(inputRefs: React.RefObject<HTMLInputElement | null>[]) {
  function submitForm(
    formEvent: React.FormEvent<HTMLFormElement>,
    submitFunction: () => void
  ) {
    formEvent.preventDefault();

    submitFunction();

    inputRefs.forEach((inputRef) => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    });
  }

  return submitForm;
}
export default useFormSubmit;
