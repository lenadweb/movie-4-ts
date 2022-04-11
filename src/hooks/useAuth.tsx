import { useSelector } from 'react-redux';
import { selectAuth } from 'redux/reducers/UserSlice';

export default function useAuth(): boolean {
    const isAuth = useSelector(selectAuth);
    return isAuth;
}
