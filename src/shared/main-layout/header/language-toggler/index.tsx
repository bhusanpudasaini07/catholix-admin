//React
import { useEffect, useState } from "react";

//Next
import { useRouter } from "next/router";

//UI
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const LanguageToggler = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router: any = useRouter();
  const { pathname, asPath, query } = router;
  const options = [
    { value: "en", text: "English" },
    { value: "np", text: "नेपाली" },
  ];

  // const [selected, setSelected] = useState<string>("en-US");

  useEffect(() => {
    setIsMounted(true);
    // setSelected(router.locale);
  }, [router.locale]);
  if (!isMounted) return null;

  const handleChange = (event: any) => {
    // setSelected(event);
    router.push(pathname, asPath, { locale: event });
    // Adds locales prior to main route dynamically.Example:
  };

  return (
    <div>
      <Select defaultValue="en" onValueChange={(e) => handleChange(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageToggler;
