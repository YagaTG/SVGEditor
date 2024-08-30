export const copyText = async (text: string) => {
  if (text)
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Copy error:", err);
    }
};
