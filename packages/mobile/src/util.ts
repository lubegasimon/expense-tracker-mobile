export function catchError(
  error: { [key: string]: any },
  setError: React.Dispatch<React.SetStateAction<string>>,
) {
  if (!error.response || !error.response.data) {
    console.error("No response data received from the server:", error);
    setError(
      "Failed to connect to the server. Confirm that you are connected to the internet and try again",
    );
    return;
  }
  setError(error.response.data.error);
}
