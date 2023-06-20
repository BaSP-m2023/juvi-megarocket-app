import React, { useState } from 'react';
import { Button, Input } from 'Components/Shared';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button type="submit" />
    </form>
  );
};

export default LoginForm;
