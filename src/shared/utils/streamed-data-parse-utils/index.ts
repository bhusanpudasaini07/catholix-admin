export const parseStreamedData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>
) => {
  const decoder = new TextDecoder();
  let buffer = "";
  let parsedData: { [key: string]: any[] } = {};

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split(/(?<=\})\s*(?=\{)/);

    parts.slice(0, -1).forEach((part) => {
      try {
        const jsonString = part.trim();
        if (jsonString) {
          const keyMatch = jsonString.match(/"(\w+)":/);
          const valueMatch = jsonString.match(/:\s*(\[.*\])/);
          if (keyMatch && valueMatch) {
            const key = keyMatch[1];
            const value = JSON.parse(valueMatch[1]);
            parsedData[key] = parsedData[key] || [];
            parsedData[key].push(...value);
          }
        }
      } catch (e) {
        console.error("Failed to process JSON:", e);
      }
    });

    buffer = parts[parts.length - 1];
  }

  if (buffer.trim()) {
    try {
      const keyMatch = buffer.match(/"(\w+)":/);
      const valueMatch = buffer.match(/:\s*(\[.*\])/);
      if (keyMatch && valueMatch) {
        const key = keyMatch[1];
        const value = JSON.parse(valueMatch[1]);
        parsedData[key] = parsedData[key] || [];
        parsedData[key].push(...value);
      }
    } catch (e) {
      console.error("Failed to process JSON:", e);
    }
  }

  return parsedData;
};
