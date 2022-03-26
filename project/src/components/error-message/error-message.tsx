import {useAppSelector} from '../../hooks/hooks';

function ErrorMessage(): JSX.Element | null {
  const {error} = useAppSelector(({DATA}) => DATA);

  if (error) {
    return (
      <div
        style = {{
          position: 'fixed',
          top: '30px',
          right: '30px',
          padding: '10px',
          backgroundColor: '#d96666',
          color: 'white',
          borderRadius: '5px',
          zIndex: 100,
        }}
        data-testid = 'error-message'
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
