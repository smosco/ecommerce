import React, { useState } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from '../../firebase/utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import FormInput from '../forms/formInput';
import Button from '../forms/button';
import AuthWrapper from '../authWrapper';

const SignUp = () => {
  const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  };

  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formState;

    if (password !== confirmPassword) {
      const err = ['비밀번호가 일치하지 않아요!'];
      setFormState((prev) => ({
        ...prev,
        errors: err,
      }));
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await handleUserProfile(user, {
        displayName,
      });

      setFormState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: '회원가입',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {formState.errors.length > 0 && (
          <ul className='errorMessages'>
            {formState.errors.map((err, idx) => {
              return <li key={idx}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={formState.displayName}
            placeholder='아이디'
            handleChange={handleChange}
          />
          <FormInput
            type='email'
            name='email'
            value={formState.email}
            placeholder='이메일'
            handleChange={handleChange}
          />
          <FormInput
            type='password'
            name='password'
            value={formState.password}
            placeholder='비밀번호'
            handleChange={handleChange}
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={formState.confirmPassword}
            placeholder='비밀번호 확인'
            handleChange={handleChange}
          />

          <Button type='submit'>회원가입</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
