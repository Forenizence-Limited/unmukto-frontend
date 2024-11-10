'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../libs/redux-store/store'; // update with your store path

export const useAuth = () => {
  const { token, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  return { token, isAuthenticated, user };
};
