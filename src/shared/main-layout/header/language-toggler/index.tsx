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

  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    setSelected(router.locale);
  }, [router.locale]);
  if (!isMounted) return null;

  const handleChange = (event: any) => {
    setSelected(event.target.value);
    router.push(pathname, asPath, { locale: event.target.value });
    // Adds locales prior to main route dynamically.Example:
  };

  return (
    <div>
      {/* <Select>
        <SelectTrigger
          value={selected}
          onChange={handleChange}
          className="w-[180px]"
        >
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <label htmlFor="language-select">Select:</label>

      <select id="language-select" value={selected} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageToggler;
