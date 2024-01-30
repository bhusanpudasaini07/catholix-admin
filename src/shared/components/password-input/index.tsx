import React, { useState, InputHTMLAttributes } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

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
    <>
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          className="placeholder:text-gray-270 text-color border-0 h-auto px-2"
          placeholder={placeholder}
          {...props}
        />
      </FormControl>
      <div onClick={toggleShowPassword} className="p-0 h-auto cursor-pointer">
        {showPassword ? (
          <EyeIcon stroke="#84919A" width={40} />
        ) : (
          <EyeOffIcon stroke="#84919A" width={40} />
        )}
      </div>
    </>
  );
};

export default PasswordInput;
