import {useAppSelector} from '../../hooks/hooks';
import styles from './styles';

function ErrorMessage(): JSX.Element | null {
  const {error} = useAppSelector(({DATA}) => DATA);

  if (error) {
    return (
      <div
        style = {styles}
        data-testid = 'error-message'
      >
        {error}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
