type ErrorScreenProps = {
  error: string;
}

function ErrorScreen({error}: ErrorScreenProps): JSX.Element {
  return (
    <p>{error}</p>
  );
}

export default ErrorScreen;
