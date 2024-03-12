import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { InputHTMLAttributes, useState } from 'react';

import { FormControl } from '../ui/form';
import { Input } from '../ui/input';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          className="placeholder:text-gray-270 text-color pr-12"
          placeholder={placeholder}
          {...props}
        />
      </FormControl>
      <div
        onClick={toggleShowPassword}
        className="p-0 h-auto absolute right-4 top-2 cursor-pointer"
      >
        {showPassword ? (
          <EyeIcon stroke="#84919A" width={20} />
        ) : (
          <EyeOffIcon stroke="#84919A" width={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
